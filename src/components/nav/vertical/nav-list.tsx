import { useState } from "react";
import { useLocation } from "react-router";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import type { NavItemDataProps, NavListProps } from "../types";
import { NavItem } from "./nav-item";

// 递归检查子项是否包含当前路径
function hasActiveChild(items: NavItemDataProps[], pathname: string): boolean {
	return items.some((item) => {
		if (item.path && pathname.includes(item.path)) {
			return true;
		}
		if (item.children && item.children.length > 0) {
			return hasActiveChild(item.children, pathname);
		}
		return false;
	});
}

export function NavList({
	data,
	depth = 1,
	accordion = false,
	isOpen,
	onToggle,
	generateMenuPath,
	setMenuItemState,
	getMenuItemState,
	menuPath = [],
}: NavListProps & {
	accordion?: boolean;
	isOpen?: boolean;
	onToggle?: (isOpen: boolean) => void;
	generateMenuPath?: (titles: string[]) => string;
	setMenuItemState?: (path: string, isOpen: boolean) => void;
	getMenuItemState?: (path: string) => boolean | undefined;
	menuPath?: string[];
}) {
	const location = useLocation();

	// 判断是否为活跃状态
	const isActive = (() => {
		// 如果有路径且路径匹配，则为活跃状态
		if (data.path && location.pathname.includes(data.path)) {
			return true;
		}
		// 如果没有路径但有子项（group 情况），检查子项是否有匹配的路径
		if (!data.path && data.children && data.children.length > 0) {
			return hasActiveChild(data.children, location.pathname);
		}
		return false;
	})();

	const [localOpen, setLocalOpen] = useState(isActive);
	const hasChild = data.children && data.children.length > 0;

	const currentMenuPath = [...menuPath, data.title];
	const menuPathString = generateMenuPath ? generateMenuPath(currentMenuPath) : "";

	const globalOpen = getMenuItemState ? getMenuItemState(menuPathString) : undefined;

	const useExternalState = accordion && isOpen !== undefined && onToggle !== undefined;
	const useGlobalState = !useExternalState && generateMenuPath && setMenuItemState && getMenuItemState;

	const open = useExternalState ? isOpen : useGlobalState && globalOpen !== undefined ? globalOpen : localOpen;

	const handleClick = () => {
		if (hasChild) {
			if (useExternalState && onToggle) {
				onToggle(!open);
			} else if (useGlobalState && setMenuItemState) {
				setMenuItemState(menuPathString, !open);
			} else {
				setLocalOpen(!localOpen);
			}
		}
	};

	const handleOpenChange = (newOpen: boolean) => {
		if (useExternalState && onToggle) {
			onToggle(newOpen);
		} else if (useGlobalState && setMenuItemState) {
			setMenuItemState(menuPathString, newOpen);
		} else {
			setLocalOpen(newOpen);
		}
	};

	if (data.hidden) {
		return null;
	}

	return (
		<Collapsible open={open} onOpenChange={handleOpenChange} data-nav-type="list">
			<CollapsibleTrigger className="w-full">
				<NavItem
					// data
					title={data.title}
					path={data.path}
					icon={data.icon}
					badge={data.badge}
					badgeType={data.badgeType}
					badgeVariants={data.badgeVariants}
					caption={data.caption}
					auth={data.auth}
					// state
					open={open}
					active={isActive}
					disabled={data.disabled}
					// options
					hasChild={hasChild}
					depth={depth}
					// event
					onClick={handleClick}
				/>
			</CollapsibleTrigger>
			{hasChild && (
				<CollapsibleContent>
					<div className="ml-4 mt-1 flex flex-col gap-1 border-s border-border">
						{data.children?.map((child, index) => (
							<NavList
								key={`${child.title}-${child.path || index}`}
								data={child}
								depth={depth + 1}
								generateMenuPath={generateMenuPath}
								setMenuItemState={setMenuItemState}
								getMenuItemState={getMenuItemState}
								menuPath={currentMenuPath}
							/>
						))}
					</div>
				</CollapsibleContent>
			)}
		</Collapsible>
	);
}
