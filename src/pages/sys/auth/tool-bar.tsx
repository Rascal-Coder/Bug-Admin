import { InspectionPanel, PanelLeft, PanelRight } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/icon";
import LocalePicker from "@/components/locale-picker";
import { useUpdateSettings } from "@/hooks";
import { ThemeSwitch } from "@/layouts/weight/themeswitch";
import { useSetSignInLayout, useSignInLayout } from "@/store/settingStore";
import { presetsColors } from "@/theme/tokens/color";
import type { ThemeColorPresets } from "@/types/enum";
import { Button } from "@/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { cn } from "@/utils";

function ColorToggle() {
	const COLOR_PRESETS = presetsColors;

	const { updateSettings, settings } = useUpdateSettings();
	const { themeColorPresets } = settings;
	return (
		<div className="group relative flex items-center overflow-hidden">
			<div className="flex w-0 overflow-hidden transition-all duration-500 ease-out group-hover:w-55 gap-3 ">
				{Object.entries(COLOR_PRESETS).map(([preset, color]) => (
					<div key={preset} className="flex-center flex-shrink-0 ">
						<div
							onClick={() => updateSettings({ themeColorPresets: preset as ThemeColorPresets })}
							className="hover:opacity-80 flex-center relative size-5 cursor-pointer rounded-full "
							style={{ backgroundColor: color.default }}
						>
							{themeColorPresets === preset && <Icon icon="bi:check-all" size={16} color="white" />}
						</div>
					</div>
				))}
			</div>
			<Button variant="ghost" size="icon">
				<Icon icon="material-symbols:palette" className="text-primary! size-5!" />
			</Button>
		</div>
	);
}

function LayoutToggle() {
	const setSignInLayout = useSetSignInLayout();
	const signInLayout = useSignInLayout();
	// const [layoutMode, setLayoutMode] = useState<"left" | "center" | "right">("left");

	// 定义布局选项数据结构
	const LAYOUT_OPTIONS = [
		{
			key: "left" as const,
			label: "左布局",
			icon: PanelLeft,
			description: "登录表单居左",
		},
		{
			key: "center" as const,
			label: "居中布局",
			icon: InspectionPanel,
			description: "登录表单居中",
		},
		{
			key: "right" as const,
			label: "右布局",
			icon: PanelRight,
			description: "登录表单居右",
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					{signInLayout === "left" && <PanelLeft />}
					{signInLayout === "center" && <InspectionPanel />}
					{signInLayout === "right" && <PanelRight />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				{LAYOUT_OPTIONS.map((option) => {
					const IconComponent = option.icon;
					const isSelected = signInLayout === option.key;

					return (
						<DropdownMenuItem
							key={option.key}
							onClick={() => setSignInLayout(option.key as "left" | "center" | "right")}
							className="flex items-center gap-3 p-3"
						>
							<IconComponent className="h-4 w-4" />
							<div className="flex flex-col flex-1">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">{option.label}</span>
									{isSelected && <Icon icon="bi:check" className="h-3 w-3 text-primary" />}
								</div>
								<span className="text-xs text-muted-foreground">{option.description}</span>
							</div>
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
export function ToolBar() {
	const [toolbarList] = useState<string[]>(["color", "language", "layout", "theme"]);
	return (
		<div
			className={cn(
				toolbarList.length > 1 && "bg-accent rounded-3xl px-3 py-1",
				"flex-center absolute right-2 top-4 z-10",
			)}
		>
			<div className="hidden md:flex">
				<ColorToggle />
				<LayoutToggle />
			</div>
			<LocalePicker />
			<ThemeSwitch />
		</div>
	);
}
