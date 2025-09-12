import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useMediaQuery, useUpdateSettings } from "@/hooks";
import { navData } from "@/routes/nav-data";
import { findActiveMenuGroup } from "@/utils/tree";
import { BREAKPOINTS, SIDEBAR_MODES, SIDEBAR_WIDTH } from "../constants/layoutConfig";

/**
 * 侧边栏宽度计算hook
 * 优化double布局模式下的侧边栏宽度计算逻辑
 */
export const useSidebarWidth = () => {
	const location = useLocation();
	const prevPathname = useRef(location.pathname);
	const currentActiveGroup = useMemo(() => findActiveMenuGroup(navData, location.pathname), [location.pathname]);
	const [selectedGroup, setSelectedGroup] = useState(currentActiveGroup);
	const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
	const [isManualSelection, setIsManualSelection] = useState(false);
	const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE}px)`);
	const { updateSettings, settings } = useUpdateSettings();
	const { transition, sidebarMode } = settings;

	// 计算主菜单宽度
	const mainMenuWidth = useMemo(() => {
		return sidebarMode !== SIDEBAR_MODES.SIDEBAR ? SIDEBAR_WIDTH.MAIN_MENU : SIDEBAR_WIDTH.MAIN_MENU_INSET;
	}, [sidebarMode]);

	// 子菜单宽度常量
	const subMenuWidth = SIDEBAR_WIDTH.SUB_MENU;

	// 计算侧边栏总宽度
	const sidebarWidth = useMemo(() => {
		return isSubMenuVisible ? `calc(${mainMenuWidth} + ${subMenuWidth})` : mainMenuWidth;
	}, [isSubMenuVisible, mainMenuWidth, subMenuWidth]);

	// 监听路由变化，重置手动选择标记
	useEffect(() => {
		const pathChanged = prevPathname.current !== location.pathname;
		if (pathChanged) {
			setIsManualSelection(false);
			prevPathname.current = location.pathname;
		}
	}, [location.pathname]);

	// 监听菜单组变化，更新选中状态
	useEffect(() => {
		if (!isManualSelection) {
			setSelectedGroup(currentActiveGroup);
			const selectedGroupData = navData.find((group) => group.name === currentActiveGroup);
			const hasMenuItems = selectedGroupData?.items?.length ? selectedGroupData.items.length > 0 : false;
			setIsSubMenuVisible(hasMenuItems);
		}
	}, [currentActiveGroup, isManualSelection]);

	// 事件处理函数
	const handleGroupSelect = useCallback((groupName: string) => {
		setIsManualSelection(true);
		setSelectedGroup(groupName);
	}, []);

	const handleGroupClick = useCallback(
		(groupName: string) => {
			setIsManualSelection(true);
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

	return {
		// 状态
		selectedGroup,
		isSubMenuVisible,
		isManualSelection,
		isMobile,
		transition,
		sidebarWidth,
		// 计算值
		mainMenuWidth,
		subMenuWidth,
		// 事件处理
		handleGroupSelect,
		handleGroupClick,
		handleSubMenuClose,
		// 状态更新
		setSelectedGroup,
		setIsSubMenuVisible,
		setIsManualSelection,
	};
};
