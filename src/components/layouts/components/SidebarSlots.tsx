import { useMemo } from "react";
import { navData } from "@/routes/nav-data";
import { useSidebarWidth } from "../hooks/useSidebarWidth";
import { FloatingSubMenu } from "../sidebar/floating-sub-menu";
import { MainMenu } from "../sidebar/main-menu";

/**
 * 双列布局侧边栏插槽
 */
export const DoubleSidebarSlot = () => {
	const { selectedGroup, isSubMenuVisible, handleGroupSelect, handleGroupClick, handleSubMenuClose } =
		useSidebarWidth();

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

	return (
		<div className="relative flex h-full overflow-y-auto">
			{/* 左侧主菜单 */}
			{mainMenuSlot}
			{/* 悬浮子菜单 */}
			{floatingSubMenuSlot}
		</div>
	);
};
