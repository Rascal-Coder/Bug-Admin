import { PanelLeftIcon } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import avatar from "@/assets/images/user/avatar.jpg";
import { Icon } from "@/components/icon";
import { NavHorizontal } from "@/components/nav/horizontal";
import type { NavItemDataProps } from "@/components/nav/types";
import { useMediaQuery } from "@/hooks";
import { useRouter } from "@/routes/hooks";
import { navData } from "@/routes/nav-data";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { Separator } from "@/ui/separator";
import { MobileSidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarTrigger } from "@/ui/sidebar";
import { cn } from "@/utils";
import { BREAKPOINTS, USER_INFO } from "../constants/layoutConfig";
import { useLayoutMode } from "../hooks/useLayoutMode";
import { Breadcrumb } from "../weight/breadcrumb";
import { NavUser } from "../weight/nav-user";

/**
 * 水平布局头部左侧插槽
 */
export const HorizontalHeaderLeftSlot = memo(() => {
	const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.MOBILE });
	const [openMobile, setOpenMobile] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!isMobile) {
			setOpenMobile(false);
		}
	}, [isMobile]);

	const headerLeftSlot = useMemo(
		() => (
			<>
				{isMobile ? (
					<Button
						data-sidebar="trigger"
						data-slot="sidebar-trigger"
						variant="ghost"
						size="icon"
						className="size-7 max-md:scale-125"
						onClick={() => setOpenMobile(!openMobile)}
					>
						<PanelLeftIcon />
						<span className="sr-only">Toggle Sidebar</span>
					</Button>
				) : (
					<>
						<div
							className="min-w-[170px] flex items-center gap-2 text-sm p-3 cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground"
							onClick={() => router.push("/")}
						>
							<Icon icon="local-logo" size={40} />
							<span className="font-semibold text-xl leading-tight">Bug Admin</span>
						</div>
						<ScrollArea className="whitespace-nowrap px-2">
							<NavHorizontal data={navData} />
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</>
				)}
				<MobileSidebar openMobile={openMobile} setOpenMobile={setOpenMobile}>
					<SidebarHeader>
						<div
							className={cn(
								"flex items-center gap-2 text-sm p-3 cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground",
							)}
							onClick={() => router.push("/")}
						>
							<div>
								<Icon icon="local-logo" size={40} />
							</div>
							<span
								className={cn(
									"font-semibold text-xl leading-tight transition-all duration-300 ease-in-out whitespace-nowrap",
								)}
							>
								Bug Admin
							</span>
						</div>
					</SidebarHeader>
					<SidebarContent>
						<NavHorizontal data={navData} />
					</SidebarContent>
					<SidebarFooter>
						<NavUser
							user={{
								name: USER_INFO.name,
								email: USER_INFO.email,
								avatar: avatar,
							}}
						/>
					</SidebarFooter>
				</MobileSidebar>
			</>
		),
		[isMobile, openMobile, router],
	);

	return headerLeftSlot;
});

/**
 * 垂直布局头部左侧插槽
 */
export const VerticalHeaderLeftSlot = memo(() => {
	const isMobile = useMediaQuery("(max-width: 768px)");

	return (
		<>
			<SidebarTrigger variant="outline" className="max-md:scale-125" />
			{!isMobile && (
				<>
					<Separator orientation="vertical" className="h-6 mx-2" />
					<Breadcrumb />
				</>
			)}
		</>
	);
});

/**
 * 混合布局头部左侧插槽
 */
export const MixedHeaderLeftSlot = memo(() => {
	const location = useLocation();
	const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.MOBILE });

	const horizontalMenuData = useMemo(() => {
		const currentPath = location.pathname;
		const matchedChildren: NavItemDataProps[] = [];

		// 遍历所有导航数据找到匹配的子菜单
		navData.forEach((section) => {
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

		return matchedChildren.length > 0 ? [{ name: "水平导航", items: matchedChildren }] : [];
	}, [location.pathname]);

	return (
		<>
			<SidebarTrigger variant="outline" className="max-md:scale-125" />
			{!isMobile && horizontalMenuData.length > 0 && (
				<>
					<Separator orientation="vertical" className="h-6! ml-2!" />
					<ScrollArea className="whitespace-nowrap px-2">
						<NavHorizontal data={horizontalMenuData} />
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</>
			)}
		</>
	);
});

/**
 * 头部左侧插槽渲染器
 */
export const HeaderLeftSlotRender = memo(() => {
	const { isHorizontal, isMixed, isVertical, isDouble } = useLayoutMode();

	if (isHorizontal) return <HorizontalHeaderLeftSlot />;
	if (isMixed) return <MixedHeaderLeftSlot />;
	if (isVertical || isDouble) return <VerticalHeaderLeftSlot />;

	return null;
});
