import type { FC } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavMini } from "@/components/nav/mini";
import type { NavProps } from "@/components/nav/types";
import { NavVertical } from "@/components/nav/vertical";
import { useIsMobile } from "@/store/appStore";
import { useSettings } from "@/store/settingStore";

interface Props {
	data: NavProps["data"];
	navMiniClassName?: string;
	navClassName?: string;
}

const findActiveGroup = (groups: NavProps["data"], pathname: string): string | null => {
	for (const group of groups) {
		for (const item of group.items) {
			if (hasActiveItem(item, pathname)) {
				return group.name || "";
			}
		}
	}
	return null;
};

const hasActiveItem = (item: any, pathname: string): boolean => {
	if (item.path && pathname.includes(item.path)) {
		return true;
	}
	if (item.children && item.children.length > 0) {
		return item.children.some((child: any) => hasActiveItem(child, pathname));
	}
	return false;
};

const VerticalMenu: FC<Props> = ({ data, navClassName }) => {
	const { collapseSidebar, menuGroup, accordionMode } = useSettings();
	const isMoblie = useIsMobile();
	const location = useLocation();

	const [openGroupId, setOpenGroupId] = useState<string | null>(null);

	const [menuItemStates, setMenuItemStates] = useState<Map<string, boolean>>(new Map());

	useEffect(() => {
		if (accordionMode && !menuGroup && data) {
			const activeGroupId = findActiveGroup(data, location.pathname);
			if (activeGroupId && openGroupId === null) {
				setOpenGroupId(activeGroupId);
			}
		}
	}, [accordionMode, menuGroup, data, location.pathname, openGroupId]);

	const handleGroupToggle = (groupId: string, isOpen: boolean) => {
		if (accordionMode && !menuGroup) {
			setOpenGroupId(isOpen ? groupId : null);
		}
	};

	const handleMenuStateChange = (path: string, isOpen: boolean) => {
		setMenuItemStates((prev) => {
			const newMap = new Map(prev);
			newMap.set(path, isOpen);
			return newMap;
		});
	};

	return (
		<>
			{collapseSidebar && !isMoblie ? (
				<NavMini data={data} className={navClassName}></NavMini>
			) : (
				<NavVertical
					data={data}
					className={navClassName}
					menuGroup={menuGroup}
					accordion={accordionMode}
					openGroupId={accordionMode && !menuGroup ? openGroupId : undefined}
					onGroupToggle={accordionMode && !menuGroup ? handleGroupToggle : undefined}
					menuStates={menuItemStates}
					onMenuStateChange={handleMenuStateChange}
				/>
			)}
		</>
	);
};

export default VerticalMenu;
