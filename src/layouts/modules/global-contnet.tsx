import KeepAlive, { useKeepAliveRef } from "keepalive-for-react";
import { concat } from "ramda";
import { memo, Suspense, useCallback, useEffect, useMemo } from "react";
import { ScrollRestoration, useLocation, useOutlet } from "react-router";
import { useUpdateEffect } from "react-use";
import { AuthGuard } from "@/components/auth/auth-guard";
import { LineLoading } from "@/components/loading";
import Page403 from "@/pages/sys/error/Page403";
import { navData } from "@/routes/nav-data";
import { useSettings } from "@/store/settingStore";
import useTabStore from "@/store/tabStore";
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

const GlobalContent = memo(() => {
	const { layoutAnimation, themeStretch } = useSettings();
	const { pathname, search } = useLocation();
	const outlet = useOutlet();

	const currentNavAuth = useMemo(() => {
		return findAuthByPath(pathname);
	}, [pathname]);

	const currentCacheKey = useMemo(() => {
		return pathname + search;
	}, [pathname, search]);

	const { cacheKeys, removeTabKeys, actions: tabActions } = useTabStore();
	const aliveRef = useKeepAliveRef();

	const handleDestroyTabs = useCallback(() => {
		if (!aliveRef.current || removeTabKeys.length === 0) return;
		removeTabKeys.forEach((key) => {
			aliveRef.current?.destroy(key);
		});
	}, [aliveRef, removeTabKeys]);

	const currentMenuItem = useMemo(() => {
		return getMenuInfoByPath(pathname);
	}, [pathname]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: false
	useEffect(() => {
		if (currentMenuItem?.type === PermissionType.MENU) {
			tabActions.addTab({
				label: currentMenuItem.title,
				value: currentCacheKey,
				path: pathname,
				icon: currentMenuItem.icon,
			});
			// 添加缓存键以确保页面组件被正确缓存
			tabActions.addCacheKey(currentCacheKey);
		}
	}, [pathname]);

	useUpdateEffect(() => {
		handleDestroyTabs();
	}, [handleDestroyTabs]);

	useUpdateEffect(() => {
		requestAnimationFrame(() => {
			aliveRef.current?.refresh();
		});
	}, [layoutAnimation]);

	return (
		<AuthGuard checkAny={currentNavAuth} fallback={<Page403 />}>
			<div
				data-layout="bug-admin-layout-main"
				className={cn("w-full flex-grow bg-bg-neutral", "px-4 py-4 mx-auto", {
					"max-w-full": themeStretch,
					"xl:max-w-screen-xl": !themeStretch,
				})}
				style={{
					willChange: "transform",
					contain: "layout style paint",
					transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
				}}
			>
				<KeepAlive
					activeCacheKey={currentCacheKey}
					aliveRef={aliveRef}
					cacheNodeClassName={layoutAnimation === "none" ? undefined : layoutAnimation}
					include={cacheKeys}
				>
					<Suspense fallback={<LineLoading />}>
						{outlet}
						<ScrollRestoration />
					</Suspense>
				</KeepAlive>
			</div>
		</AuthGuard>
	);
});

export default GlobalContent;
