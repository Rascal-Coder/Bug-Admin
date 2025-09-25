import type { ReactNode } from "react";
import { memo } from "react";
import { Icon } from "@/components/icon";
import { Select, SelectContent, SelectItem as SelectItemPrimitive, SelectTrigger, SelectValue } from "@/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";

const SIDE_OPTIONS = ["top", "right", "bottom", "left"] as const;

export interface SelectOption {
	value: string;
	label: string;
}

interface SelectItemProps {
	disabled?: boolean;
	items: SelectOption[]; // Required prop, no default empty array
	placeholder?: string;
	value?: string;
	onValueChange?: (value: string) => void;
	children?: ReactNode;
	tipContent?: ReactNode;
	className?: string;
	side?: (typeof SIDE_OPTIONS)[number];
}

export const SelectItem = memo(function SelectItem({
	disabled = false,
	items,
	placeholder = "",
	value: controlledValue,
	onValueChange,
	children,
	tipContent,
	className,
	side = "bottom",
}: SelectItemProps) {
	return (
		<div
			className={cn(
				"my-1 flex w-full items-center justify-between rounded-md px-2 py-1 hover:bg-accent",
				{
					"pointer-events-none opacity-50": disabled,
				},
				className,
			)}
		>
			<span className="flex items-center text-sm">
				{children}

				{tipContent && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Icon icon="lucide:circle-help" className="ml-1 size-3 cursor-help" />
							</TooltipTrigger>
							<TooltipContent side={side}>{tipContent}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</span>

			<Select value={controlledValue} onValueChange={onValueChange} disabled={disabled}>
				<SelectTrigger className="h-8 w-[165px]">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{items.map((item) => (
						<SelectItemPrimitive key={item.value} value={item.value}>
							{item.label}
						</SelectItemPrimitive>
					))}
				</SelectContent>
			</Select>
		</div>
	);
});
