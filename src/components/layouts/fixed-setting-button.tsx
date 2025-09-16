import clsx from "clsx";
import { isEqual } from "lodash";
import { XIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo } from "react";
import { toast } from "sonner";
import { ThemeColorPresets, ThemeMode } from "#/enum";
import { Icon } from "@/components/icon";
import { SelectItem, type SelectOption } from "@/components/layouts/select-item";
import { SwitchItem } from "@/components/layouts/switch-item";
import { IconSidebarFloating } from "@/components/svg-comps/icon-sidebar-floating";
import { IconSidebarInset } from "@/components/svg-comps/icon-sidebar-inset";
import { IconSidebarSidebar } from "@/components/svg-comps/icon-sidebar-sidebar";
import { GLOBAL_CONFIG } from "@/global-config";
import { useUpdateSettings } from "@/hooks";
import { usePathname } from "@/routes/hooks/use-pathname";
import type { SettingsType } from "@/store/settingStore";
import { initialSettings, useClearSettings, useSetSettings } from "@/store/settingStore";
import { presetsColors } from "@/theme/tokens/color";
import { FontFamilyPreset } from "@/theme/tokens/typography";
import { Button } from "@/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/ui/sheet";
import { Slider } from "@/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { Text } from "@/ui/typography";
import { cn } from "@/utils";

// Constants
const COLLAPSIBLE_TYPE_OPTIONS: SelectOption[] = [
	{ value: "icon", label: "icon" },
	{ value: "offcanvas", label: "offcanvas" },
];

const LAYOUT_ANIMATION_OPTIONS: SelectOption[] = [
	{ value: "fade", label: "fade" },
	{ value: "fade-slide", label: "fade-slide" },
	{ value: "fade-bottom", label: "fade-bottom" },
	{ value: "fade-scale", label: "fade-scale" },
	{ value: "zoom-fade", label: "zoom-fade" },
	{ value: "zoom-out", label: "zoom-out" },
];

export function FixedSettingButton() {
	const pathname = usePathname();
	const sheetContentBgStyle: CSSProperties = {
		backdropFilter: "blur(20px)",
	};
	const { updateSettings, settings } = useUpdateSettings();
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
		collapsibleType,
		layoutAnimation,
	} = settings;

	const setSettings = useSetSettings();
	const clearSettings = useClearSettings();
	// 重置所有设置
	const handleResetSettings = () => {
		clearSettings();
		setSettings(initialSettings);
	};

	// Computed values
	const shouldShowCollapsibleTypeSelect = useMemo(
		() => layoutMode !== "horizontal" && layoutMode !== "double",
		[layoutMode],
	);

	// 计算发生改变的配置
	const changedSettings = useMemo(() => {
		const changes: Partial<SettingsType> = {};

		// 遍历当前设置，找出与默认设置不同的值
		Object.keys(settings).forEach((key) => {
			const settingKey = key as keyof SettingsType;
			if (!isEqual(settings[settingKey], initialSettings[settingKey])) {
				(changes as unknown as Record<keyof SettingsType, unknown>)[settingKey] = settings[settingKey];
			}
		});

		return changes;
	}, [settings]);

	// 判断是否有配置改变
	const hasChanges = useMemo(() => {
		return Object.keys(changedSettings).length > 0;
	}, [changedSettings]);

	// 复制配置到剪贴板
	const handleCopyConfig = async () => {
		const configString = ` ${JSON.stringify(changedSettings, null, 2)}`;

		await navigator.clipboard.writeText(configString);
		toast.success("复制成功", {
			description: "复制成功，请在 \`src/preferences.ts\` 内进行覆盖",
			position: "top-center",
		});
	};

	return (
		<>
			{pathname !== GLOBAL_CONFIG.loginRoute && (
				<div className="fixed bottom-30 right-[-3px] z-50">
					<Sheet>
						<SheetTrigger asChild>
							<button
								type="button"
								className="w-14 h-14 cursor-pointer bg-primary text-white rounded-bl-lg rounded-tl-lg shadow-lg hover:bg-primary/90  flex items-center justify-center"
							>
								<Icon icon="ic:outline-settings" className="transition-all duration-200 animate-slow-spin" size={28} />
							</button>
						</SheetTrigger>
						<SheetContent
							style={sheetContentBgStyle}
							className="gap-0 w-[350px]"
							onOpenAutoFocus={(e) => e.preventDefault()}
							showClose={false}
						>
							<SheetHeader className="flex flex-row items-center justify-between px-3 py-4 shrink-0">
								<SheetTitle>设置</SheetTitle>
								<div className="flex items-center">
									<Tooltip>
										<TooltipTrigger asChild>
											<div className="relative">
												<Button
													variant="ghost"
													size="sm"
													onClick={handleResetSettings}
													disabled={!hasChanges}
													className="h-8 w-8 p-0 hover:bg-accent"
												>
													<Icon icon="material-symbols:restart-alt" size={18} />
												</Button>
												{hasChanges && <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>}
											</div>
										</TooltipTrigger>
										<TooltipContent side="bottom">
											<p>数据有变化，点击可进行重置</p>
										</TooltipContent>
									</Tooltip>
									<SheetClose asChild>
										<Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
											<XIcon className="size-4" />
										</Button>
									</SheetClose>
									<SheetDescription />
								</div>
							</SheetHeader>
							<div className="flex flex-col gap-6 px-6 py-2 overflow-y-auto">
								{/* theme mode */}
								<div className="flex flex-col gap-2">
									<Text variant="subTitle1">颜色主题风格</Text>
									<div className="flex gap-4">
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
											<span className="text-sm">系统</span>
										</button>
									</div>
									{/* theme presets */}
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

								{/* font */}
								<div className="flex flex-col gap-2">
									<Text variant="subTitle1">字体</Text>

									<Text variant="subTitle2">字体系列</Text>
									<div className="flex  gap-3">
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
									{shouldShowCollapsibleTypeSelect && (
										<SelectItem
											items={COLLAPSIBLE_TYPE_OPTIONS}
											value={collapsibleType}
											onValueChange={(value) =>
												updateSettings({ collapsibleType: value as SettingsType["collapsibleType"] })
											}
											tipContent="选择侧边栏折叠时的显示方式"
										>
											折叠动画
										</SelectItem>
									)}
									<SelectItem
										items={LAYOUT_ANIMATION_OPTIONS}
										value={layoutAnimation}
										onValueChange={(value) =>
											updateSettings({ layoutAnimation: value as SettingsType["layoutAnimation"] })
										}
									>
										页面切换动画
									</SelectItem>
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
															<div className="h-2/3 flex flex-1 border border-primary rounded-md border-dashed justify-center">
																<div
																	className={`${themeStretch ? "w-full" : "w-3/5"} transition-all duration-300 ease-in-out h-full bg-accent rounded-md`}
																></div>
															</div>
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
															<div className="h-2/3 flex flex-1 border border-primary rounded-md border-dashed justify-center">
																<div
																	className={`${themeStretch ? "w-full" : "w-3/5"} transition-all duration-300 ease-in-out h-full bg-accent rounded-md`}
																></div>
															</div>
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
														<div className="h-2/3 flex flex-1 border border-primary rounded-md border-dashed justify-center">
															<div
																className={`${themeStretch ? "w-full" : "w-3/5"} transition-all duration-300 ease-in-out h-full bg-accent rounded-md`}
															></div>
														</div>
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
															<div className="w-4/5 flex justify-center flex-1 border border-primary rounded-md border-dashed">
																<div
																	className={`${themeStretch ? "w-full" : "w-3/5"}  transition-all duration-300 ease-in-out h-full bg-accent rounded-md`}
																></div>
															</div>
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
								<div className="flex flex-col gap-2">
									{layoutMode !== "horizontal" && (
										<div className="flex gap-1">
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
							</div>
							<SheetFooter>
								<Button onClick={handleCopyConfig} disabled={!hasChanges}>
									<Icon icon="material-symbols:content-copy" />
									复制配置
								</Button>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			)}
		</>
	);
}
