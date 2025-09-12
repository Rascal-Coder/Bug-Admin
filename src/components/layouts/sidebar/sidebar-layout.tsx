import { memo, useMemo } from "react";
import avatar from "@/assets/images/user/avatar.jpg";
import { useMediaQuery } from "@/hooks";
import { useSettings } from "@/store/settingStore";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from "@/ui/sidebar";
import { BREAKPOINTS, USER_INFO } from "../constants/layoutConfig";
import { NavUser } from "../weight/nav-user";
import { Logo } from "./logo";
import NavSwitcher from "./nav-switcher";
import type { AppSidebarProps, SidebarContainerProps, UserInfo } from "./types";

/**
 * 应用侧边栏主组件
 * 包含Logo、导航内容和用户信息
 *
 * @param data - 导航数据
 * @param user - 用户信息（可选）
 * @param className - 自定义样式类名
 */
export const AppSidebar = memo(function AppSidebar({ data, user, className }: AppSidebarProps) {
	const { open } = useSidebar();
	const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.MOBILE });

	const userInfo: UserInfo = useMemo(() => {
		return (
			user || {
				name: USER_INFO.name,
				email: USER_INFO.email,
				avatar: avatar,
			}
		);
	}, [user]);

	return (
		<AppSidebarContainer className={className}>
			<SidebarHeader>
				<Logo isMobile={isMobile} open={open} />
			</SidebarHeader>
			<SidebarContent>
				<NavSwitcher open={open} data={data} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={userInfo} />
			</SidebarFooter>
			<SidebarRail />
		</AppSidebarContainer>
	);
});
/**
 * 侧边栏容器组件
 * 负责侧边栏的布局和配置
 *
 * @param children - 子组件
 * @param transition - 是否启用过渡动画
 * @param className - 自定义样式类名
 */
export const AppSidebarContainer = memo(function AppSidebarContainer({
	children,
	transition = true,
	className,
}: SidebarContainerProps) {
	const { sidebarMode, collapsibleType, layoutMode } = useSettings();

	const collapsible = useMemo(() => {
		if (layoutMode === "double") {
			return "offcanvas";
		}
		return collapsibleType;
	}, [collapsibleType, layoutMode]);

	const sidebarProps = useMemo(
		() => ({
			collapsible,
			variant: sidebarMode,
			transition,
			className,
		}),
		[collapsible, sidebarMode, transition, className],
	);

	return <Sidebar {...sidebarProps}>{children}</Sidebar>;
});
