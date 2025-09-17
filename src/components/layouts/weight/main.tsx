import KeepAlive, { useKeepAliveRef } from "keepalive-for-react";
import { concat } from "ramda";
import { Suspense, useEffect, useMemo } from "react";
import { ScrollRestoration, useLocation, useOutlet } from "react-router";
import { useMount, useUpdateEffect } from "react-use";
import { AuthGuard } from "@/components/auth/auth-guard";
import { LineLoading } from "@/components/loading";
import type { NavItemDataProps } from "@/components/nav/types";
import Page403 from "@/pages/sys/error/Page403";
import { navData } from "@/routes/nav-data";
import { useSettings } from "@/store/settingStore";
import useTabStore, { useTabActions } from "@/store/tabStore";
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
	const { addTab, addCacheKey, clearCacheKeys } = useTabActions();
	const outlet = useOutlet();

	const menuInfo = getMenuInfoByPath(pathname);
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

	// 递归初始化缓存键
	const initializeCacheKeys = (items: NavItemDataProps[]) => {
		items.forEach((item) => {
			if (item.keepAlive === true && item.path) {
				addCacheKey(item.path);
			}
			if (item.children && Array.isArray(item.children) && item.children.length > 0) {
				initializeCacheKeys(item.children);
			}
		});
	};

	useMount(() => {
		clearCacheKeys();
		navData.forEach((group) => {
			if (group.items && Array.isArray(group.items)) {
				initializeCacheKeys(group.items);
			}
		});
	});

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
