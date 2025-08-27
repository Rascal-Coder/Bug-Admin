import { useCallback, useMemo, useRef, useState } from "react";
import LocalePicker from "@/components/locale-picker";
import { Separator } from "@/ui/separator";
import { SidebarTrigger } from "@/ui/sidebar";
import { frontendNavData } from "../nav-data/nav-data-frontend";
import { AppSidebarContainer } from "../sidebar/app-sidebar";
import SidebarWrapper from "../sidebar/sidebar-wrapper";
import AccountDropdown from "../weight/account-dropdown";
import { Breadcrumb } from "../weight/breadcrumb";
import FullscreenButton from "../weight/fullscreen-button";
import NoticeButton from "../weight/notice";
import SearchBar from "../weight/search-bar";
import { ThemeSwitch } from "../weight/themeswitch";
import { FloatingSubMenu } from "./floating-sub-menu";
import { MainMenu } from "./main-menu";

/**
 * 双列布局组件
 */
export default function DoubleLayout() {
	const [selectedGroup, setSelectedGroup] = useState(frontendNavData[0]?.name || "");
	const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleGroupClick = useCallback((groupName: string) => {
		setSelectedGroup(groupName);
		setIsSubMenuVisible(true);
	}, []);
	/**
	 * 头部左侧区域组件
	 */
	const headerLeftSlot = useMemo(
		() => (
			<>
				<SidebarTrigger variant="outline" className="max-md:scale-125" />
				<Separator orientation="vertical" className="h-6" />
				<Breadcrumb />
			</>
		),
		[],
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

	const sidebarSlot = useMemo(
		() => (
			<AppSidebarContainer>
				<div className="relative flex h-full  overflow-y-auto">
					{/* 左侧主菜单 */}
					<div ref={sidebarRef} className="w-full py-2 px-1">
						<MainMenu
							data={frontendNavData}
							selectedGroup={selectedGroup}
							onGroupSelect={setSelectedGroup}
							onGroupClick={handleGroupClick}
							className="h-full"
						/>
					</div>
					{/* 悬浮子菜单 */}
					<FloatingSubMenu
						data={frontendNavData}
						selectedGroup={selectedGroup}
						isVisible={isSubMenuVisible}
						onVisibilityChange={setIsSubMenuVisible}
						triggerRef={sidebarRef}
					/>
				</div>
			</AppSidebarContainer>
		),
		[selectedGroup, isSubMenuVisible, handleGroupClick],
	);

	return (
		<SidebarWrapper
			sidebarSlot={sidebarSlot}
			headerLeftSlot={headerLeftSlot}
			headerRightSlot={headerRightSlot}
			style={
				{
					"--sidebar-width": "80px",
				} as React.CSSProperties
			}
		/>
	);
}
