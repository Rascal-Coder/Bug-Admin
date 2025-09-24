import KeepAlive, { useKeepAliveRef } from "keepalive-for-react";
import { concat } from "ramda";
import { Suspense, useMemo } from "react";
import { ScrollRestoration, useLocation, useOutlet } from "react-router";
import { useUpdateEffect } from "react-use";
import { AuthGuard } from "@/components/auth/auth-guard";
import { LineLoading } from "@/components/loading";
import Page403 from "@/pages/sys/error/Page403";
import { navData } from "@/routes/nav-data";
import { useSettings } from "@/store/settingStore";
import useTabStore from "@/store/tabStore";
import { cn } from "@/utils";
import { flattenTrees } from "@/utils/tree";

const allItems = navData.reduce((acc: any[], group) => {
	const flattenedItems = flattenTrees(group.items);
	return concat(acc, flattenedItems);
}, []);
/**
 * find auth by path
 * @param path
 * @returns
 */
function findAuthByPath(path: string): string[] {
	const foundItem = allItems.find((item) => item.path === path);
	return foundItem?.auth || [];
}

export function Main() {
	const { themeStretch, layoutAnimation } = useSettings();
	const { pathname, search } = useLocation();
	const currentNavAuth = findAuthByPath(pathname);
	const outlet = useOutlet();

	const currentCacheKey = useMemo(() => {
		return pathname + search;
	}, [pathname, search]);

	const { cacheKeys } = useTabStore();
	const { removeTabKeys } = useTabStore();
	const aliveRef = useKeepAliveRef();
	useUpdateEffect(() => {
		if (!aliveRef.current || removeTabKeys.length === 0) return;

		removeTabKeys.forEach((key) => {
			aliveRef.current?.destroy(key);
		});
	}, [removeTabKeys]);

	useUpdateEffect(() => {
		aliveRef.current?.refresh();
	}, [layoutAnimation]);
	return (
		<AuthGuard checkAny={currentNavAuth} fallback={<Page403 />}>
			<main
				data-layout="bug-admin-layout-main"
				className={cn(
					"h-full w-full flex-grow bg-layout",
					"transition-[max-width] duration-300 ease-in-out",
					"px-4 py-4 mx-auto",
					{
						"max-w-full": themeStretch,
						"xl:max-w-screen-xl": !themeStretch,
					},
				)}
				style={{
					willChange: "max-width",
				}}
			>
				<KeepAlive
					activeCacheKey={currentCacheKey}
					aliveRef={aliveRef}
					cacheNodeClassName={layoutAnimation}
					include={cacheKeys}
				>
					<Suspense fallback={<LineLoading />}>
						{outlet}
						<ScrollRestoration />
					</Suspense>
				</KeepAlive>
			</main>
		</AuthGuard>
	);
}
