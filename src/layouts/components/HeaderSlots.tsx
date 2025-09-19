import { PanelLeftIcon } from "lucide-react";
import { useMemo } from "react";
import { useLocation } from "react-router";
import avatar from "@/assets/images/user/avatar.jpg";
import LocalePicker from "@/components/locale-picker";
import { NavHorizontal } from "@/components/nav/horizontal";
import type { NavItemDataProps } from "@/components/nav/types";
import { NavVertical } from "@/components/nav/vertical";
import { useMediaQuery, useUpdateSettings } from "@/hooks";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { Separator } from "@/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/ui/sheet";
import { cn } from "@/utils";
import { useAdminLayout } from "..";
import { BREAKPOINTS, USER_INFO } from "../constants/layoutConfig";
import { Logo } from "../sidebar/logo";
import AccountDropdown from "../weight/account-dropdown";
import { Breadcrumb } from "../weight/breadcrumb";
import FullscreenButton from "../weight/fullscreen-button";
import { NavUser } from "../weight/nav-user";
import NoticeButton from "../weight/notice";
import SearchBar from "../weight/search-bar";
import { ThemeSwitch } from "../weight/themeswitch";

const SIDEBAR_WIDTH_MOBILE = "18rem";

function SidebarTrigger() {
	const { updateSettings, settings } = useUpdateSettings();
	const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.MOBILE });
	return (
		<Button
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			variant="outline"
			size="icon"
			className={cn("size-7")}
			onClick={() => {
				updateSettings({
					transition: true,
					collapseSidebar: !isMobile ? !settings.collapseSidebar : settings.collapseSidebar,
				});
			}}
		>
			<PanelLeftIcon />
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={cn("flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	);
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={cn("flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	);
}
function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={cn(
				"flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
				className,
			)}
			{...props}
		/>
	);
}
export function MobileSidebaWrapper({
	side = "left",
	children,
	openMobile,
	setOpenMobile,
	...props
}: React.ComponentProps<"div"> & {
	side?: "left" | "right";
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
}) {
	return (
		<Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
			<SheetContent
				data-slot="mobile-sidebar"
				data-mobile="true"
				className="bg-background text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
				style={
					{
						"--sidebar-width": SIDEBAR_WIDTH_MOBILE,
					} as React.CSSProperties
				}
				side={side}
			>
				<SheetHeader className="sr-only">
					<SheetTitle>Sidebar</SheetTitle>
					<SheetDescription>Displays the mobile sidebar.</SheetDescription>
				</SheetHeader>
				<div className="flex h-full w-full flex-col">{children}</div>
			</SheetContent>
		</Sheet>
	);
}

/**
 * 水平布局头部左侧插槽
 */
export const HorizontalOrMixedHeaderLeft = () => {
	const { isMobile, layoutMode, data } = useAdminLayout();
	const { pathname } = useLocation();
	const horizontalMenuData = useMemo(() => {
		const currentPath = pathname;
		const matchedChildren: NavItemDataProps[] = [];

		// 遍历所有导航数据找到匹配的子菜单
		data.forEach((section) => {
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
	}, [pathname, data]);

	const navData = useMemo(() => {
		if (layoutMode === "horizontal") {
			return data;
		}
		return horizontalMenuData;
	}, [layoutMode, horizontalMenuData, data]);
	return (
		<>
			<SidebarTrigger />
			{!isMobile && data.length > 0 && (
				<>
					{layoutMode === "horizontal" && <Logo></Logo>}
					<ScrollArea className="whitespace-nowrap px-2">
						<NavHorizontal data={navData} />
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</>
			)}
		</>
	);
};
export const MobileSidebar = () => {
	const { data, openMobile, setOpenMobile } = useAdminLayout();
	return (
		<MobileSidebaWrapper openMobile={openMobile} setOpenMobile={setOpenMobile}>
			<SidebarHeader>
				<Logo></Logo>
			</SidebarHeader>
			<SidebarContent>
				<NavVertical data={data} />
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
		</MobileSidebaWrapper>
	);
};

/**
 * 垂直布局头部左侧插槽
 */
export const VerticalHeaderLeftSlot = () => {
	const { isMobile } = useAdminLayout();
	return (
		<>
			<SidebarTrigger />
			{!isMobile && (
				<>
					<Separator orientation="vertical" className="h-6 mx-2" />
					<Breadcrumb />
				</>
			)}
		</>
	);
};

/**
 * 头部左侧插槽渲染器
 */
export const HeaderLeftSlotRender = () => {
	const { layoutMode } = useAdminLayout();
	if (layoutMode === "horizontal" || layoutMode === "mixed") return <HorizontalOrMixedHeaderLeft />;
	if (layoutMode === "vertical" || layoutMode === "double") return <VerticalHeaderLeftSlot />;
};

export const HeaderRightSlotRender = () => {
	return (
		<>
			<SearchBar />
			<ThemeSwitch />
			<LocalePicker />
			<FullscreenButton />
			<NoticeButton />
			<AccountDropdown />
		</>
	);
};
