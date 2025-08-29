import { useMemo } from "react";
import { useLocation } from "react-router";
import { ThemeSwitch } from "@/components/layouts/weight/themeswitch";
import LocalePicker from "@/components/locale-picker";
import { NavHorizontal } from "@/components/nav/horizontal";
import type { NavItemDataProps } from "@/components/nav/types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { Separator } from "@/ui/separator";
import { SidebarTrigger } from "@/ui/sidebar";
import { frontendNavData } from "../nav-data/nav-data-frontend";
import { AppSidebar } from "../sidebar/app-sidebar";
import SidebarWrapper from "../sidebar/sidebar-wrapper";
import AccountDropdown from "../weight/account-dropdown";
import FullscreenButton from "../weight/fullscreen-button";
import NoticeButton from "../weight/notice";
import SearchBar from "../weight/search-bar";

const MOBILE_BREAKPOINT = "(max-width: 768px)" as const;
const NAVIGATION_SECTION_NAME = "导航" as const;
/**
 * 混合布局组件
 */
export default function MixedLayout() {
	const location = useLocation();
	const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

	const verticalMenuData = useMemo(() => {
		return frontendNavData.map((section) => ({
			...section,
			items: section.items.map((item) => ({
				...item,
				children: [],
			})),
		}));
	}, []);

	const horizontalMenuData = useMemo(() => {
		const currentPath = location.pathname;
		const matchedChildren: NavItemDataProps[] = [];

		// 遍历所有导航数据找到匹配的子菜单
		frontendNavData.forEach((section) => {
			section.items.forEach((item) => {
				if (!item.children?.length) return;

				// 检查当前路径是否匹配父菜单或子菜单
				const isParentMatch = currentPath.startsWith(item.path);
				const hasChildMatch = item.children.some((child) => currentPath.startsWith(child.path));

				if (isParentMatch || hasChildMatch) {
					matchedChildren.push(...item.children);
				}
			});
		});

		return matchedChildren.length > 0 ? [{ name: NAVIGATION_SECTION_NAME, items: matchedChildren }] : [];
	}, [location.pathname]);

	/**
	 * 头部左侧区域组件
	 */
	const headerLeftSlot = useMemo(
		() => (
			<>
				{/* <SidebarTrigger variant="outline" className="min-w-[28px] min-h-[28px]" /> */}
				<SidebarTrigger variant="outline" className="max-md:scale-125" />
				{!isMobile && horizontalMenuData.length > 0 && (
					<>
						<Separator orientation="vertical" className="h-6! ml-2!" />
						<ScrollArea className="whitespace-nowrap px-2 bg-background">
							<NavHorizontal data={horizontalMenuData} />
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</>
				)}
			</>
		),
		[isMobile, horizontalMenuData],
	);

	/**
	 * 头部右侧区域组件
	 */
	const headerRightSlot = useMemo(
		() => (
			<>
				<SearchBar />
				<ThemeSwitch />
				<LocalePicker />
				<FullscreenButton />
				<NoticeButton />
				<AccountDropdown />
			</>
		),
		[],
	);

	const sidebarData = isMobile ? frontendNavData : verticalMenuData;

	return (
		<SidebarWrapper
			sidebarSlot={<AppSidebar data={sidebarData} />}
			headerLeftSlot={headerLeftSlot}
			headerRightSlot={headerRightSlot}
		/>
	);
}
