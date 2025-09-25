import KeepAlive, { useKeepAliveRef } from "keepalive-for-react";
import { concat } from "ramda";
import { Suspense, useCallback, useMemo } from "react";
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
	const { layoutAnimation, themeStretch } = useSettings();
	const { pathname, search } = useLocation();
	const outlet = useOutlet();

	// Memoize auth lookup to avoid recalculation on every render
	const currentNavAuth = useMemo(() => {
		return findAuthByPath(pathname);
	}, [pathname]);

	const currentCacheKey = useMemo(() => {
		return pathname + search;
	}, [pathname, search]);

	// Optimize store subscriptions - only get what we need
	const { cacheKeys, removeTabKeys } = useTabStore();
	const aliveRef = useKeepAliveRef();

	// Memoize the destroy function to avoid recreating on every render
	const handleDestroyTabs = useCallback(() => {
		if (!aliveRef.current || removeTabKeys.length === 0) return;
		removeTabKeys.forEach((key) => {
			aliveRef.current?.destroy(key);
		});
	}, [aliveRef, removeTabKeys]);

	useUpdateEffect(() => {
		handleDestroyTabs();
	}, [handleDestroyTabs]);

	useUpdateEffect(() => {
		// Defer refresh to next frame to avoid blocking the main thread
		requestAnimationFrame(() => {
			aliveRef.current?.refresh();
		});
	}, [layoutAnimation]);
	return (
		<AuthGuard checkAny={currentNavAuth} fallback={<Page403 />}>
			<main
				data-layout="bug-admin-layout-main"
				className={cn("w-full flex-grow", "px-4 py-4 ", "transition-[max-width] duration-300 ease-in-out mx-auto", {
					"max-w-full": themeStretch,
					"xl:max-w-screen-xl": !themeStretch,
				})}
				style={{
					willChange: "max-width",
					contain: "layout style",
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
