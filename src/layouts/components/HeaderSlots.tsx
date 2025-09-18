import { PanelLeftIcon } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import avatar from "@/assets/images/user/avatar.jpg";
import { Icon } from "@/components/icon";
import LocalePicker from "@/components/locale-picker";
import { NavHorizontal } from "@/components/nav/horizontal";
import type { NavItemDataProps } from "@/components/nav/types";
import { NavVertical } from "@/components/nav/vertical";
import { useMediaQuery, useUpdateSettings } from "@/hooks";
import { useRouter } from "@/routes/hooks";
import { navData } from "@/routes/nav-data";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { Separator } from "@/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/ui/sheet";
import { cn } from "@/utils";
import { BREAKPOINTS, USER_INFO } from "../constants/layoutConfig";
import { useLayoutMode } from "../hooks/useLayoutMode";
import { Logo } from "../sidebar/logo";
import AccountDropdown from "../weight/account-dropdown";
import { Breadcrumb } from "../weight/breadcrumb";
import FullscreenButton from "../weight/fullscreen-button";
import { NavUser } from "../weight/nav-user";
import NoticeButton from "../weight/notice";
import SearchBar from "../weight/search-bar";
import { ThemeSwitch } from "../weight/themeswitch";

const SIDEBAR_WIDTH_MOBILE = "18rem";

function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
	const { updateSettings, settings } = useUpdateSettings();
	const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.MOBILE });
	return (
		<Button
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			variant="ghost"
			size="icon"
			className={cn("size-7", className)}
			onClick={(event) => {
				onClick?.(event);
				updateSettings({
					transition: true,
					collapseSidebar: !isMobile ? !settings.collapseSidebar : settings.collapseSidebar,
				});
			}}
			{...props}
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
				<MobileSidebar openMobile={openMobile} setOpenMobile={setOpenMobile} />
			</>
		),
		[isMobile, openMobile, router],
	);

	return headerLeftSlot;
});
export const MobileSidebar = ({
	openMobile,
	setOpenMobile,
}: {
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
}) => {
	return (
		<MobileSidebaWrapper openMobile={openMobile} setOpenMobile={setOpenMobile}>
			<SidebarHeader>
				<Logo></Logo>
			</SidebarHeader>
			<SidebarContent>
				<NavVertical data={navData} />
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
export const VerticalHeaderLeftSlot = memo(({ onClick }: { onClick: () => void }) => {
	const isMobile = useMediaQuery("(max-width: 768px)");

	return (
		<>
			<SidebarTrigger variant="outline" className="max-md:scale-125" onClick={onClick} />
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
export const MixedHeaderLeftSlot = memo(({ onClick }: { onClick: () => void }) => {
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
			<SidebarTrigger variant="outline" className="max-md:scale-125" onClick={onClick} />
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
export const HeaderLeftSlotRender = memo(({ onClick }: { onClick: () => void }) => {
	const { isHorizontal, isMixed, isVertical, isDouble } = useLayoutMode();
	if (isHorizontal) return <HorizontalHeaderLeftSlot />;
	if (isMixed) return <MixedHeaderLeftSlot onClick={onClick} />;
	if (isVertical || isDouble) return <VerticalHeaderLeftSlot onClick={onClick} />;

	return null;
});

export const HeaderRightSlotRender = memo(() => {
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
});
