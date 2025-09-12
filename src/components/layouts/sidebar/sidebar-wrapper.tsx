import Cookies from "js-cookie";
import { memo, useCallback, useMemo } from "react";
import { useShowMaximize } from "@/store/settingStore";
import { SidebarInset, SidebarProvider } from "@/ui/sidebar";
import { cn } from "@/utils";
import { useLayoutMode } from "../hooks/useLayoutMode";
import { Header } from "../weight/header";
import { Main } from "../weight/main";
import type { LayoutRendererProps, SidebarWrapperProps } from "./types";

const LayoutRenderer = memo(function LayoutRenderer({
	isHorizontal,
	contentTextClass,
	renderContent,
	showMaximize,
	sidebarSlot,
	insetClassNames,
}: LayoutRendererProps) {
	return isHorizontal ? (
		<main className={`w-full ${contentTextClass} min-h-screen`}>{renderContent()}</main>
	) : (
		<>
			{showMaximize ? null : sidebarSlot}
			<SidebarInset className={insetClassNames}>{renderContent()}</SidebarInset>
		</>
	);
});

/**
 * @param sidebarSlot - 侧边栏插槽内容
 * @param headerLeftSlot - 头部左侧插槽
 * @param headerRightSlot - 头部右侧插槽
 * @param insetClassName - 内容区域自定义样式
 * @param style - 自定义样式对象
 * @param sidebarWidth - 侧边栏宽度
 * @param className - 自定义样式类名
 */
const SidebarWrapper = memo(function SidebarWrapper({
	sidebarSlot,
	headerLeftSlot,
	headerRightSlot,
	insetClassName,
	style,
	sidebarWidth,
	className,
}: SidebarWrapperProps) {
	const { isHorizontal } = useLayoutMode();
	const showMaximize = useShowMaximize();

	// 公共样式常量
	const contentTextClass = "text-black dark:text-white";

	const defaultOpen = useMemo(() => {
		const cookieValue = Cookies.get("sidebar_state");
		return cookieValue !== "false";
	}, []);

	const providerStyle = useMemo(
		() =>
			({
				"--sidebar-width": sidebarWidth || "var(--layout-nav-width)",
				...style,
			}) as React.CSSProperties,
		[sidebarWidth, style],
	);

	const insetClassNames = useMemo(
		() =>
			cn(
				// If layout is fixed and sidebar is inset,
				"peer-data-[variant=inset]:has-[[data-layout=fixed]]:h-[calc(100svh-(var(--spacing)*5))]",
				// Set content container, so we can use container queries
				"@container/content",
				// border
				"peer-data-[variant=floating]:border-none",
				// font color
				"text-black dark:text-white",
				insetClassName,
			),
		[insetClassName],
	);

	const renderHeader = useCallback(
		() => (
			<Header fixed>
				{headerLeftSlot}
				<div data-slot="right" className="flex flex-1 justify-end items-center gap-2 sm:gap-3">
					{headerRightSlot}
				</div>
			</Header>
		),
		[headerLeftSlot, headerRightSlot],
	);

	const renderContent = useCallback(
		() => (
			<>
				{renderHeader()}
				<Main />
			</>
		),
		[renderHeader],
	);
	return (
		<SidebarProvider defaultOpen={defaultOpen} className={className} style={providerStyle}>
			<LayoutRenderer
				isHorizontal={isHorizontal}
				contentTextClass={contentTextClass}
				renderContent={renderContent}
				showMaximize={showMaximize}
				sidebarSlot={sidebarSlot}
				insetClassNames={insetClassNames}
			/>
		</SidebarProvider>
	);
});

export default SidebarWrapper;
