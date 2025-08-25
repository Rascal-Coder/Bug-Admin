// import type { Side } from "@radix-ui/react-tooltip";

import { type ReactNode, useState } from "react";
import { Icon } from "@/components/icon";
import { Switch } from "@/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";

const SIDE_OPTIONS = ["top", "right", "bottom", "left"] as const;
interface SwitchItemProps {
	disabled?: boolean;
	tip?: string;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	children?: ReactNode;
	shortcut?: ReactNode;
	tipContent?: ReactNode;
	className?: string;
	side?: (typeof SIDE_OPTIONS)[number];
}

export function SwitchItem({
	disabled = false,
	tip = "",
	checked: controlledChecked,
	onCheckedChange,
	children,
	shortcut,
	tipContent,
	className,
	side = "bottom",
}: SwitchItemProps) {
	const [internalChecked, setInternalChecked] = useState(false);

	const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;

	const handleClick = () => {
		if (disabled) return;

		const newChecked = !checked;

		if (controlledChecked !== undefined && onCheckedChange) {
			onCheckedChange(newChecked);
		} else {
			setInternalChecked(newChecked);
		}
	};

	const handleSwitchClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<div
			className={cn(
				"hover:bg-accent my-1 flex w-full items-center justify-between rounded-md px-2 py-2.5 cursor-pointer",
				{
					"pointer-events-none opacity-50": disabled,
				},
				className,
			)}
			onClick={handleClick}
		>
			<span className="flex items-center text-sm">
				{children}

				{(tipContent || tip) && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Icon icon="lucide:circle-help" className="ml-1 size-3 cursor-help" />
							</TooltipTrigger>
							<TooltipContent side={side}>
								{tipContent ||
									tip.split("\n").map((line, index) => <p key={`tip-line-${index}-${line.slice(0, 10)}`}>{line}</p>)}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</span>

			{shortcut && <span className="ml-auto mr-2 text-xs opacity-60">{shortcut}</span>}

			<Switch
				checked={checked}
				onCheckedChange={controlledChecked !== undefined ? onCheckedChange : setInternalChecked}
				onClick={handleSwitchClick}
			/>
		</div>
	);
}
