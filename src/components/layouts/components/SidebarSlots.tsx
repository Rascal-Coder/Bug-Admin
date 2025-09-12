import { memo, useMemo } from "react";
import { navData } from "@/routes/nav-data";
import { useLayoutMode } from "../hooks/useLayoutMode";
import { useSidebarWidth } from "../hooks/useSidebarWidth";
import { FloatingSubMenu } from "../sidebar/floating-sub-menu";
import { MainMenu } from "../sidebar/main-menu";
import { AppSidebar, AppSidebarContainer } from "../sidebar/sidebar-layout";

/**
 * 混合布局侧边栏插槽
 */
export const MixedHeaderSidebarSlot = memo(() => {
	const verticalMenuData = useMemo(() => {
		return navData.map((section) => ({
			...section,
			items: section.items.map((item) => ({
				...item,
				children: [],
			})),
		}));
	}, []);

	return <AppSidebar data={verticalMenuData} />;
});

/**
 * 双列布局侧边栏插槽
 */
export const DoubleSidebarSlot = memo(() => {
	const {
		selectedGroup,
		isSubMenuVisible,
		handleGroupSelect,
		handleGroupClick,
		handleSubMenuClose,
		transition,
		isMobile,
	} = useSidebarWidth();

	const mainMenuSlot = useMemo(
		() => (
			<div
				style={{
					flex: 1,
				}}
				className="py-2 px-1"
			>
				<MainMenu
					data={navData}
					selectedGroup={selectedGroup}
					onGroupSelect={handleGroupSelect}
					onGroupClick={handleGroupClick}
					className="h-full"
				/>
			</div>
		),
		[selectedGroup, handleGroupSelect, handleGroupClick],
	);

	const floatingSubMenuSlot = useMemo(
		() => (
			<FloatingSubMenu
				data={navData}
				selectedGroup={selectedGroup}
				isVisible={isSubMenuVisible}
				onClose={handleSubMenuClose}
			/>
		),
		[selectedGroup, isSubMenuVisible, handleSubMenuClose],
	);

	const sidebarSlot = useMemo(() => {
		return (
			<>
				{!isMobile ? (
					<AppSidebarContainer transition={transition}>
						<div className="relative flex h-full overflow-y-auto">
							{/* 左侧主菜单 */}
							{mainMenuSlot}
							{/* 悬浮子菜单 */}
							{floatingSubMenuSlot}
						</div>
					</AppSidebarContainer>
				) : (
					<AppSidebar data={navData} />
				)}
			</>
		);
	}, [mainMenuSlot, floatingSubMenuSlot, transition, isMobile]);

	return sidebarSlot;
});

/**
 * 侧边栏插槽渲染器
 */
export const SidebarSlotRender = memo(() => {
	const { isHorizontal, isMixed, isVertical, isDouble } = useLayoutMode();

	if (isHorizontal) return null;
	if (isMixed) return <MixedHeaderSidebarSlot />;
	if (isVertical) return <AppSidebar data={navData} />;
	if (isDouble) return <DoubleSidebarSlot />;

	return null;
});
