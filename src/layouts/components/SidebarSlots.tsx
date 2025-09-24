// import { navData } from "@/routes/nav-data";
// import { FloatingSubMenu } from "../sidebar/floating-sub-menu";
// import { MainMenu } from "../sidebar/main-menu";

// interface DoubleSidebarSlotProps {
// 	selectedGroup: string;
// 	isSubMenuVisible: boolean;
// 	handleGroupSelect: (groupName: string) => void;
// 	handleGroupClick: (groupName: string) => void;
// 	handleSubMenuClose: () => void;
// }

// /**
//  * 双列布局侧边栏插槽
//  */
// export const DoubleSidebarSlot = ({
// 	selectedGroup,
// 	isSubMenuVisible,
// 	handleGroupSelect,
// 	handleGroupClick,
// 	handleSubMenuClose,
// }: DoubleSidebarSlotProps) => {
// 	return (
// 		<div className="relative flex h-full overflow-y-auto">
// 			{/* 左侧主菜单 */}
// 			<div
// 				style={{
// 					flex: 1,
// 				}}
// 				className="py-2 px-1"
// 			>
// 				<MainMenu
// 					data={navData}
// 					selectedGroup={selectedGroup}
// 					onGroupSelect={handleGroupSelect}
// 					onGroupClick={handleGroupClick}
// 					className="h-full"
// 				/>
// 			</div>
// 			{/* 悬浮子菜单 */}
// 			<FloatingSubMenu
// 				data={navData}
// 				selectedGroup={selectedGroup}
// 				isVisible={isSubMenuVisible}
// 				onClose={handleSubMenuClose}
// 			/>
// 		</div>
// 	);
// };

export const GlobalSidebar = () => <div>sidebar</div>;
