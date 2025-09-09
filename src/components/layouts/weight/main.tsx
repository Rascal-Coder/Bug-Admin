import { concat } from "ramda";
import { Suspense, useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { AuthGuard } from "@/components/auth/auth-guard";
import GlobalLoading from "@/components/loading/global-loading";
import Page403 from "@/pages/sys/error/Page403";
import { navData } from "@/routes/nav-data";
import { useSettings } from "@/store/settingStore";
import { useTabActions } from "@/store/tabStore";
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
	const { themeStretch, layoutMode } = useSettings();
	const { pathname } = useLocation();
	const currentNavAuth = findAuthByPath(pathname);
	const menuInfo = getMenuInfoByPath(pathname);
	const { addTab } = useTabActions();
	useEffect(() => {
		if (menuInfo) {
			addTab({
				label: menuInfo.title,
				value: menuInfo.path,
				path: menuInfo.path,
				icon: typeof menuInfo.icon === "string" ? menuInfo.icon : undefined,
			});
		}
	}, [menuInfo, addTab]);

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
				<Suspense fallback={<GlobalLoading loading center width={80} />}>
					<Outlet />
					<ScrollRestoration />
				</Suspense>
			</main>
		</AuthGuard>
	);
}
