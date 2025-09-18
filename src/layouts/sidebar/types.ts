import type { CSSProperties, ReactNode } from "react";
import type { NavProps } from "@/components/nav/types";

export interface UserInfo {
	name: string;
	email: string;
	avatar: string;
}

export interface LogoProps {
	isMobile?: boolean;
	open?: boolean;
	className?: string;
	onClick?: () => void;
}

export interface SidebarContainerProps {
	children: ReactNode;
	transition?: boolean;
	className?: string;
}

export interface SidebarProps {
	open: boolean;
	data: NavProps["data"];
	className?: string;
}

export interface AppSidebarProps {
	data: NavProps["data"];
	user?: UserInfo;
	className?: string;
}

export interface SidebarWrapperProps {
	sidebarSlot?: ReactNode;
	headerLeftSlot: ReactNode;
	headerRightSlot: ReactNode;
	insetClassName?: string;
	style?: CSSProperties;
	sidebarWidth?: string;
	className?: string;
}

export interface MainMenuProps {
	data: NavProps["data"];
	selectedGroup?: string;
	onGroupSelect?: (groupName: string) => void;
	onGroupClick?: (groupName: string) => void;
	className?: string;
}

export interface FloatingSubMenuProps {
	data: NavProps["data"];
	selectedGroup: string;
	isVisible: boolean;
	onClose: () => void;
	className?: string;
}

export interface SidebarState {
	open: boolean;
	isMobile: boolean;
	selectedGroup?: string;
}

export interface SidebarConfig {
	width: string;
	collapsible: "offcanvas" | "icon" | "none";
	variant: "sidebar" | "floating";
	transition: boolean;
}

export interface SidebarEventHandlers {
	onToggle?: (open: boolean) => void;
	onGroupSelect?: (groupName: string) => void;
	onGroupClick?: (groupName: string) => void;
	onClose?: () => void;
}

export interface SidebarStyles {
	container?: string;
	header?: string;
	content?: string;
	footer?: string;
	logo?: string;
	menu?: string;
	submenu?: string;
}

export interface BreakpointConfig {
	mobile: number;
	tablet?: number;
	desktop?: number;
}

export interface SidebarTheme {
	colors: {
		background: string;
		foreground: string;
		accent: string;
		border: string;
	};
	spacing: {
		padding: string;
		margin: string;
		gap: string;
	};
	typography: {
		fontSize: string;
		fontWeight: string;
		lineHeight: string;
	};
}

export interface LayoutRendererProps {
	isHorizontal: boolean;
	contentTextClass: string;
	renderContent: () => ReactNode;
	showMaximize: boolean;
	sidebarSlot: ReactNode;
	insetClassNames: string;
}
export type { NavProps, ReactNode, CSSProperties };
