import { useMemo } from "react";
import type { NavGroupProps } from "../types";
import { NavList } from "./nav-list";

interface NavGroupExtendedProps {
	// 手风琴模式
	accordion?: boolean;
	isOpen?: boolean;
	onToggle?: (isOpen: boolean) => void;
	menuStates?: Map<string, boolean>;
	onMenuStateChange?: (path: string, isOpen: boolean) => void;
	menuPath?: string[];
}

export function NavGroup({
	name,
	items,
	groupIcon,
	menuGroup,
	accordion,
	isOpen,
	onToggle,
	menuStates,
	onMenuStateChange,
	menuPath = [],
}: NavGroupProps &
	NavGroupExtendedProps & {
		groupIcon: string | undefined;
		menuGroup: boolean;
	}) {
	const groupData = useMemo(
		() => ({
			title: name || "",
			path: "", // group 本身不需要路径
			icon: groupIcon,
			children: items,
		}),
		[name, groupIcon, items],
	);

	// 当 menuGroup 为 false 时，将 group 作为一个折叠项
	if (!menuGroup && name) {
		return (
			<NavList
				data={groupData}
				depth={1}
				accordion={accordion}
				isOpen={isOpen}
				onToggle={onToggle}
				menuStates={menuStates}
				onMenuStateChange={onMenuStateChange}
				menuPath={menuPath}
			/>
		);
	}

	return (
		<>
			{menuGroup && <Group name={name} />}
			<ul className="flex w-full flex-col gap-1">
				{items.map((item, index) => (
					<NavList
						key={item.title || index}
						data={item}
						depth={1}
						menuStates={menuStates}
						onMenuStateChange={onMenuStateChange}
						menuPath={name ? [...menuPath, name] : menuPath}
					/>
				))}
			</ul>
		</>
	);
}

function Group({ name }: { name?: string }) {
	return (
		name && (
			<div className="pt-4 pr-2 pb-2 pl-3">
				<div className="relative flex items-center">
					<div className="absolute left-0 right-0 top-1/2 h-px bg-border -translate-y-1/2"></div>
					<div className="h-4 leading-4 mx-6 rounded-sm text-xs font-medium text-text-disabled bg-bg-paper px-2 relative z-10">
						{name}
					</div>
				</div>
			</div>
		)
	);
}
