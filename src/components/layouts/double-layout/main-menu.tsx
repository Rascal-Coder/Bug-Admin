import { Command } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/icon";
import type { NavProps } from "@/components/nav/types";
import { Button } from "@/ui/button";
import { cn } from "@/utils";

interface MainMenuProps {
	data: NavProps["data"];
	selectedGroup?: string;
	onGroupSelect?: (groupName: string) => void;
	onGroupClick?: (groupName: string) => void;
	className?: string;
}

export function MainMenu({ data, selectedGroup, onGroupSelect, onGroupClick, className }: MainMenuProps) {
	const [activeGroup, setActiveGroup] = useState(selectedGroup || data[0]?.name || "");

	const handleGroupSelect = (groupName: string) => {
		setActiveGroup(groupName);
		onGroupSelect?.(groupName);
	};

	const handleGroupClick = (groupName: string) => {
		handleGroupSelect(groupName);
		onGroupClick?.(groupName);
	};

	return (
		<nav className={cn("flex flex-col gap-1 ", className)}>
			<div className="flex items-center gap-2 text-sm justify-center">
				<div className="bg-primary text-primary-foreground flex hover:bg-primary/80  aspect-square size-10 items-center justify-center rounded-lg">
					<Command className="size-4" />
				</div>
			</div>
			{data.map((group, index) => (
				<Button
					key={group.name || index}
					variant={activeGroup === group.name ? "default" : "ghost"}
					size="sm"
					className={cn(
						"justify-center text-center cursor-pointer whitespace-nowrap text-xs px-2 py-3 h-auto min-h-12 flex-col gap-1",
						activeGroup === group.name && "bg-primary text-primary-foreground",
					)}
					onClick={() => handleGroupClick(group.name || "")}
				>
					<Icon icon="local-folder" className="size-6!"></Icon>
					<span className="text-xs font-medium leading-tight">{group.name}</span>
				</Button>
			))}
		</nav>
	);
}
