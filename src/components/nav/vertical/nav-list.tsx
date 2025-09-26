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

interface NavListExtendedProps {
	accordion?: boolean;
	isOpen?: boolean;
	onToggle?: (isOpen: boolean) => void;

	menuStates?: Map<string, boolean>;
	onMenuStateChange?: (path: string, isOpen: boolean) => void;
	menuPath?: string[];
}

export function NavList({
	data,
	depth = 1,
	accordion,
	isOpen,
	onToggle,
	menuStates,
	onMenuStateChange,
	menuPath = [],
}: NavListProps & NavListExtendedProps) {
	const location = useLocation();

	// 判断是否为活跃状态
	const isActive = (() => {
		if (data.path && location.pathname.includes(data.path)) {
			return true;
		}
		if (!data.path && data.children && data.children.length > 0) {
			return hasActiveChild(data.children, location.pathname);
		}
		return false;
	})();

	const [localOpen, setLocalOpen] = useState(isActive);
	const hasChild = data.children && data.children.length > 0;

	// 计算当前菜单路径
	const currentMenuPath = [...menuPath, data.title];
	const menuPathString = currentMenuPath.join(".");

	const useAccordion = accordion && isOpen !== undefined && onToggle !== undefined;
	const useGlobalState = !useAccordion && menuStates && onMenuStateChange && depth > 1; // 只有子项使用全局状态

	const open = useAccordion
		? isOpen
		: useGlobalState && menuStates?.has(menuPathString)
			? menuStates.get(menuPathString)!
			: localOpen;

	const handleToggle = (newOpen: boolean) => {
		if (useAccordion) {
			onToggle!(newOpen);
		} else if (useGlobalState) {
			onMenuStateChange!(menuPathString, newOpen);
		} else {
			setLocalOpen(newOpen);
		}
	};

	const handleClick = () => {
		if (hasChild) {
			handleToggle(!open);
		}
	};

	const handleOpenChange = (newOpen: boolean) => {
		handleToggle(newOpen);
	};

	if (data.hidden) {
		return null;
	}

	return (
		<Collapsible open={open} onOpenChange={handleOpenChange} data-nav-type="list">
			<CollapsibleTrigger className="w-full">
				<NavItem
					title={data.title}
					path={data.path}
					icon={data.icon}
					badge={data.badge}
					badgeType={data.badgeType}
					badgeVariants={data.badgeVariants}
					caption={data.caption}
					auth={data.auth}
					open={open}
					active={isActive}
					disabled={data.disabled}
					hasChild={hasChild}
					depth={depth}
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
								menuStates={menuStates}
								onMenuStateChange={onMenuStateChange}
								menuPath={currentMenuPath}
							/>
						))}
					</div>
				</CollapsibleContent>
			)}
		</Collapsible>
	);
}
