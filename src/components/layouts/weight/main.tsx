// import KeepAlive from "react-activation";
import KeepAlive, { useKeepAliveRef } from "keepalive-for-react";
import { concat } from "ramda";
import { Suspense, useEffect, useMemo } from "react";
import { ScrollRestoration, useLocation, useOutlet } from "react-router";
import { AuthGuard } from "@/components/auth/auth-guard";
import { LineLoading } from "@/components/loading";
import Page403 from "@/pages/sys/error/Page403";
import { navData } from "@/routes/nav-data";
import { useSettings } from "@/store/settingStore";
import { useTabActions } from "@/store/tabStore";
import { PermissionType } from "@/types/enum";
import { cn } from "@/utils";
import { getMenuInfoByPath } from "@/utils/menu";
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
	const { themeStretch, layoutMode, layoutAnimation } = useSettings();
	const { pathname, search } = useLocation();
	const currentNavAuth = findAuthByPath(pathname);
	const menuInfo = getMenuInfoByPath(pathname);
	const { addTab } = useTabActions();
	const aliveRef = useKeepAliveRef();
	useEffect(() => {
		if (menuInfo && menuInfo.type === PermissionType.MENU) {
			addTab({
				label: menuInfo.title,
				value: menuInfo.path,
				path: menuInfo.path,
				icon: typeof menuInfo.icon === "string" ? menuInfo.icon : undefined,
			});
		}
	}, [menuInfo, addTab]);
	const outlet = useOutlet();

	const currentCacheKey = useMemo(() => {
		return pathname + search;
	}, [pathname, search]);

	return (
		<AuthGuard checkAny={currentNavAuth} fallback={<Page403 />}>
			<main
				data-layout="bug-admin-layout"
				className={cn(
					"flex-auto w-full flex flex-col",
					"transition-[max-width] duration-300 ease-in-out",
					"px-4 sm:px-6 py-4 sm:py-6 md:px-8 mx-auto",
					{
						"max-w-full": themeStretch,
						"xl:max-w-screen-xl": !themeStretch,
						"h-[calc(100svh-(var(--spacing)*30)))]": layoutMode === "horizontal",
					},
				)}
				style={{
					willChange: "max-width",
				}}
			>
				<KeepAlive activeCacheKey={currentCacheKey} aliveRef={aliveRef} cacheNodeClassName={layoutAnimation}>
					<Suspense fallback={<LineLoading />}>
						{outlet}
						<ScrollRestoration />
					</Suspense>
				</KeepAlive>
			</main>
		</AuthGuard>
	);
}
