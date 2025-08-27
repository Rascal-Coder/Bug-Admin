import clsx from "clsx";
import type { CSSProperties } from "react";
import { ThemeColorPresets, ThemeMode } from "#/enum";
import { Icon } from "@/components/icon";
import { IconSidebarFloating } from "@/components/svg-comps/icon-sidebar-floating";
import { IconSidebarInset } from "@/components/svg-comps/icon-sidebar-inset";
import { IconSidebarSidebar } from "@/components/svg-comps/icon-sidebar-sidebar";
import { SwitchItem } from "@/components/switch-item";
import { type SettingsType, useSettingActions, useSettings } from "@/store/settingStore";
import { presetsColors } from "@/theme/tokens/color";
import { FontFamilyPreset } from "@/theme/tokens/typography";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { Slider } from "@/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { Text } from "@/ui/typography";
import { cn } from "@/utils";

export function FixedSettingButton() {
	const sheetContentBgStyle: CSSProperties = {
		backdropFilter: "blur(20px)",
	};
	const settings = useSettings();
	const {
		themeColorPresets,
		fontSize,
		fontFamily,
		themeMode,
		customPrimaryColor,
		grayMode,
		colorWeakMode,
		sidebarMode,
		layoutMode,
		themeStretch,
	} = settings;
	const { setSettings } = useSettingActions();
	const updateSettings = (partialSettings: Partial<SettingsType>) => {
		setSettings({
			...settings,
			...partialSettings,
		});
	};

	return (
		<div className="fixed bottom-30 right-[-3px] z-50">
			<Sheet>
				<SheetTrigger asChild>
					<button
						type="button"
						className="w-14 h-14 bg-primary text-white rounded-bl-lg rounded-tl-lg shadow-lg hover:bg-primary/90  flex items-center justify-center"
					>
						<Icon icon="ic:outline-settings" className="transition-all duration-200 animate-slow-spin" size={28} />
					</button>
				</SheetTrigger>
				<SheetContent style={sheetContentBgStyle} className="gap-0" onOpenAutoFocus={(e) => e.preventDefault()}>
					<SheetHeader className="flex flex-row items-center justify-between px-6 py-4 shrink-0">
						<SheetTitle>设置</SheetTitle>
						<SheetDescription />
					</SheetHeader>
					<div className="flex flex-col gap-6 px-6 py-2 overflow-y-auto">
						{/* theme mode */}
						<div className="flex flex-col gap-2">
							<Text variant="subTitle1">主题模式</Text>
							<div className="flex flex-row gap-4">
								<button
									type="button"
									onClick={() => updateSettings({ themeMode: ThemeMode.Light })}
									className={clsx(
										"card-box flex flex-1 h-20 cursor-pointer items-center justify-center outline-box flex-col gap-1 py-1",
										themeMode === ThemeMode.Light && "outline-box-active",
									)}
								>
									<Icon icon="line-md:sun-rising-filled-loop" size="24" />
									<span className="text-sm">浅色</span>
								</button>
								<button
									type="button"
									onClick={() => updateSettings({ themeMode: ThemeMode.Dark })}
									className={clsx(
										"card-box flex flex-1 h-20 cursor-pointer items-center justify-center outline-box flex-col gap-1 py-1",
										themeMode === ThemeMode.Dark && "outline-box-active",
									)}
								>
									<Icon icon="line-md:sunny-filled-loop-to-moon-filled-alt-loop-transition" size="24" />
									<span className="text-sm">深色</span>
								</button>
								<button
									type="button"
									onClick={() => updateSettings({ themeMode: ThemeMode.System })}
									className={clsx(
										"card-box flex flex-1 h-20 cursor-pointer items-center justify-center outline-box flex-col gap-1 py-1",
										themeMode === ThemeMode.System && "outline-box-active",
									)}
								>
									<Icon icon="material-symbols-light:hdr-auto" size="24" />
									<span className="text-sm">跟随系统</span>
								</button>
							</div>
							<SwitchItem
								checked={grayMode}
								onCheckedChange={(checked) => updateSettings({ grayMode: checked })}
								tip="开启后界面将变为灰色调，减少色彩干扰"
							>
								灰色模式
							</SwitchItem>
							<SwitchItem
								checked={colorWeakMode}
								onCheckedChange={(checked) => updateSettings({ colorWeakMode: checked })}
								tip="开启后调整色彩对比度，适合色弱用户使用"
							>
								色弱模式
							</SwitchItem>
						</div>

						{/* theme presets */}
						<div className="flex flex-col gap-2">
							<Text variant="subTitle1">主题颜色</Text>
							<div className="flex flex-wrap gap-1">
								{Object.entries(presetsColors).map(([preset, color]) => (
									<button
										type="button"
										key={preset}
										className={cn(
											"relative flex h-16 w-5 cursor-pointer items-center justify-center rounded transition-all duration-300 ease-in-out p-1 border-0",
											themeColorPresets === preset && "w-13",
										)}
										style={{ backgroundColor: color.default }}
										onClick={() => updateSettings({ themeColorPresets: preset as ThemeColorPresets })}
									>
										<div
											className={cn(
												"w-full h-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 ease-in-out rounded",
												themeColorPresets === preset && "bg-white/30",
											)}
										>
											{themeColorPresets === preset && <Icon icon="bi:check-all" size={24} color="white" />}
										</div>
									</button>
								))}
								<label
									className={clsx(
										"card-box ml-2 flex w-16 h-16 cursor-pointer items-center justify-center outline-box flex-col gap-1 py-1 relative",
										themeColorPresets === ThemeColorPresets.Custom && "outline-box-active",
									)}
								>
									<input
										type="color"
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
										value={customPrimaryColor || "#808080"}
										onChange={(e) => {
											const customColor = e.target.value;
											updateSettings({
												themeColorPresets: ThemeColorPresets.Custom,
												customPrimaryColor: customColor,
											});
										}}
									/>
									<Icon icon="material-symbols:palette" size="24" />
									<span className="text-sm">自定义</span>
								</label>
							</div>
						</div>

						{/* font */}
						<div className="flex flex-col gap-2">
							<Text variant="subTitle1">字体</Text>

							<Text variant="subTitle2">字体系列</Text>
							<div className="flex flex-row gap-3">
								{Object.entries(FontFamilyPreset).map(([font, family]) => (
									<button
										type="button"
										key={font}
										className={clsx(
											"card-box flex h-20 w-full cursor-pointer items-center justify-center text-text-disabled outline-box",
											fontFamily === family && "text-primary font-medium",
											family === FontFamilyPreset.inter && "font-inter",
											fontFamily === family && "outline-box-active",
											family === FontFamilyPreset.openSans && "font-openSans",
										)}
										onClick={() => updateSettings({ fontFamily: family })}
									>
										<div className="text-center text-lg">
											<span>A</span>
											<span className="opacity-50 ml-0.5">a</span>
										</div>
										<span className="text-sm text-text-primary">{family.replace("Variable", "")}</span>
									</button>
								))}
							</div>

							<Text variant="subTitle2">字体大小</Text>
							<Slider
								min={12}
								max={20}
								step={1}
								defaultValue={[fontSize]}
								onValueChange={(value) => updateSettings({ fontSize: value[0] })}
							/>
						</div>
						{/* layout */}
						<div className="flex flex-col gap-2">
							<Text variant="subTitle1">布局</Text>
							<SwitchItem
								checked={themeStretch}
								onCheckedChange={(checked) => updateSettings({ themeStretch: checked })}
								tip="仅在屏幕宽度大于1280px时可用(需刷新页面)"
							>
								拉伸
							</SwitchItem>
							<div className="grid grid-cols-2 gap-3">
								{/* 垂直菜单栏 */}
								<Tooltip>
									<TooltipTrigger asChild>
										<div
											onClick={() => updateSettings({ layoutMode: "vertical" })}
											className={clsx(
												"card-box flex h-20 cursor-pointer outline-box p-1.5",
												layoutMode === "vertical" && "outline-box-active",
											)}
										>
											<div className="flex w-full h-full gap-1.5">
												<div className="w-1/5 h-full bg-primary/70 rounded-md"></div>
												<div className="flex-1 flex flex-col gap-1.5">
													<div className="h-1/3 bg-primary rounded-md"></div>
													<div className="h-2/3 bg-accent rounded-md"></div>
												</div>
											</div>
										</div>
									</TooltipTrigger>
									<TooltipContent side="top">
										<p>垂直菜单栏</p>
									</TooltipContent>
								</Tooltip>

								<Tooltip>
									<TooltipTrigger asChild>
										{/* 双列菜单栏 */}
										<div
											onClick={() => updateSettings({ layoutMode: "double" })}
											className={clsx(
												"card-box flex h-20 cursor-pointer outline-box p-1.5",
												layoutMode === "double" && "outline-box-active",
											)}
										>
											<div className="flex w-full h-full gap-1.5">
												<div className="w-1/8 h-full bg-primary/70 rounded-md"></div>
												<div className="w-1/5 h-full bg-primary/70 rounded-md"></div>
												<div className="flex-1 flex flex-col gap-1.5">
													<div className="h-1/3 bg-primary rounded-md"></div>
													<div className="h-2/3 bg-accent rounded-md"></div>
												</div>
											</div>
										</div>
									</TooltipTrigger>
									<TooltipContent side="top">
										<p>双列菜单栏</p>
									</TooltipContent>
								</Tooltip>

								<Tooltip>
									<TooltipTrigger asChild>
										{/* 顶部菜单栏 */}
										<div
											onClick={() => updateSettings({ layoutMode: "horizontal" })}
											className={clsx(
												"card-box flex h-20 cursor-pointer outline-box p-1.5",
												layoutMode === "horizontal" && "outline-box-active",
											)}
										>
											<div className="flex w-full h-full flex-col gap-1.5">
												<div className="h-1/3 bg-primary rounded-md"></div>
												<div className="h-2/3 bg-accent rounded-md"></div>
											</div>
										</div>
									</TooltipTrigger>
									<TooltipContent side="top">
										<p>顶部菜单栏</p>
									</TooltipContent>
								</Tooltip>

								<Tooltip>
									<TooltipTrigger asChild>
										{/* 混合菜单栏 */}
										<div
											onClick={() => updateSettings({ layoutMode: "mixed" })}
											className={clsx(
												"card-box flex h-20 cursor-pointer outline-box p-1.5",
												layoutMode === "mixed" && "outline-box-active",
											)}
										>
											<div className="flex w-full h-full flex-col gap-1.5">
												<div className="h-1/3 bg-primary rounded-md"></div>
												<div className="h-2/3 flex gap-1.5">
													<div className="w-1/5 bg-primary/70 rounded-md"></div>
													<div className="flex-1 bg-accent rounded-md"></div>
												</div>
											</div>
										</div>
									</TooltipTrigger>
									<TooltipContent side="top">
										<p>混合菜单栏</p>
									</TooltipContent>
								</Tooltip>
							</div>
						</div>
						{layoutMode !== "horizontal" && (
							<div className="flex flex-row gap-3 mt-2">
								<button
									type="button"
									onClick={() => updateSettings({ sidebarMode: "inset" })}
									className={clsx(
										"card-box flex flex-1 h-20 cursor-pointer items-center justify-center outline-box flex-col gap-1 py-1",
										sidebarMode === "inset" && "outline-box-active",
									)}
								>
									<IconSidebarInset width={80} height={80} />
									<span className="text-sm">内嵌</span>
								</button>
								<button
									type="button"
									onClick={() => updateSettings({ sidebarMode: "floating" })}
									className={clsx(
										"card-box flex flex-1 h-20 cursor-pointer items-center justify-center outline-box flex-col gap-1 py-1",
										sidebarMode === "floating" && "outline-box-active",
									)}
								>
									<IconSidebarFloating width={80} height={80} />
									<span className="text-sm">浮动</span>
								</button>
								<button
									type="button"
									onClick={() => updateSettings({ sidebarMode: "sidebar" })}
									className={clsx(
										"card-box flex flex-1 h-20 cursor-pointer items-center justify-center outline-box flex-col gap-1 py-1",
										sidebarMode === "sidebar" && "outline-box-active",
									)}
								>
									<IconSidebarSidebar width={80} height={80} />
									<span className="text-sm">侧边栏</span>
								</button>
							</div>
						)}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
