import { useState } from "react";
import { cn } from "@/utils";
import type { NavProps } from "../types";
import { NavGroup } from "./nav-group";

export function NavVertical({
	data,
	className,
	menuGroup,
	accordion = false,
	openGroupId,
	onGroupToggle,
	generateMenuPath,
	setMenuItemState,
	getMenuItemState,
	...props
}: NavProps & {
	menuGroup: boolean;
	accordion?: boolean;
	openGroupId?: string | null;
	onGroupToggle?: (groupId: string, isOpen: boolean) => void;
	generateMenuPath?: (titles: string[]) => string;
	setMenuItemState?: (path: string, isOpen: boolean) => void;
	getMenuItemState?: (path: string) => boolean | undefined;
}) {
	const [localOpenGroupId, setLocalOpenGroupId] = useState<string | null>(null);

	const currentOpenGroupId = openGroupId !== undefined ? openGroupId : localOpenGroupId;

	const handleGroupToggle = (groupId: string, isOpen: boolean) => {
		if (accordion && !menuGroup) {
			if (onGroupToggle) {
				onGroupToggle(groupId, isOpen);
			} else {
				setLocalOpenGroupId(isOpen ? groupId : null);
			}
		}
	};

	return (
		<nav className={cn("flex w-full flex-col gap-1 relative min-w-0 p-2 first:pt-0", className)} {...props}>
			{data.map((group, index) => (
				<NavGroup
					key={group.name || index}
					groupIcon={group.icon}
					name={group.name}
					items={group.items}
					menuGroup={menuGroup}
					// 手风琴模式
					accordion={accordion}
					isOpen={accordion && !menuGroup ? currentOpenGroupId === (group.name || index.toString()) : undefined}
					onToggle={
						accordion && !menuGroup ? (isOpen) => handleGroupToggle(group.name || index.toString(), isOpen) : undefined
					}
					generateMenuPath={generateMenuPath}
					setMenuItemState={setMenuItemState}
					getMenuItemState={getMenuItemState}
					menuPath={[]}
				/>
			))}
		</nav>
	);
}
