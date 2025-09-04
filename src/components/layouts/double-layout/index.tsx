import { useCallback, useMemo, useState } from "react";
import LocalePicker from "@/components/locale-picker";
import { useMediaQuery } from "@/hooks/use-media-query";
import { navData } from "@/routes/nav-data";
import { type SettingsType, useSettingActions, useSettings } from "@/store/settingStore";
import { Separator } from "@/ui/separator";
import { SidebarTrigger } from "@/ui/sidebar";
import { AppSidebar, AppSidebarContainer } from "../sidebar/app-sidebar";
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
	const [selectedGroup, setSelectedGroup] = useState(navData[0]?.name || "");
	const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
	const isMobile = useMediaQuery("(max-width: 768px)");
	const { sidebarMode } = useSettings();
	const mainMenuWidth = useMemo(() => {
		return sidebarMode !== "sidebar" ? "var(--spacing-24)" : "calc(var(--spacing-24) - var(--spacing-4))";
	}, [sidebarMode]);
	const subMenuWidth = "var(--spacing-64)";
	const sidebarWidth = useMemo(() => {
		return isSubMenuVisible ? `calc(${mainMenuWidth} + ${subMenuWidth})` : mainMenuWidth;
	}, [isSubMenuVisible, mainMenuWidth]);

	const { setSettings } = useSettingActions();
	const settings = useSettings();
	const { transition } = settings;
	const updateSettings = useCallback(
		(partialSettings: Partial<SettingsType>) => {
			setSettings({
				...settings,
				...partialSettings,
			});
		},
		[setSettings, settings],
	);
	const handleGroupSelect = useCallback((groupName: string) => {
		setSelectedGroup(groupName);
	}, []);

	const handleGroupClick = useCallback(
		(groupName: string) => {
			setSelectedGroup(groupName);
			setIsSubMenuVisible(true);
			updateSettings({
				transition: false,
			});
		},
		[updateSettings],
	);

	const handleSubMenuClose = useCallback(() => {
		setIsSubMenuVisible(false);
		updateSettings({
			transition: false,
		});
	}, [updateSettings]);
	/**
	 * 头部左侧区域组件
	 */
	const headerLeftSlot = useMemo(
		() => (
			<>
				<SidebarTrigger variant="outline" className="max-md:scale-125" />

				{!isMobile && (
					<>
						<Separator orientation="vertical" className="h-6 mx-2" />
						<Breadcrumb />
					</>
				)}
			</>
		),
		[isMobile],
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

	return (
		<SidebarWrapper
			sidebarSlot={sidebarSlot}
			headerLeftSlot={headerLeftSlot}
			headerRightSlot={headerRightSlot}
			style={
				{
					"--sidebar-width": sidebarWidth,
				} as React.CSSProperties
			}
		/>
	);
}
