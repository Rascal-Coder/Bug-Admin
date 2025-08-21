import type { CSSProperties } from "react";
import { type ThemeColorPresets, ThemeMode } from "#/enum";
import { Icon } from "@/components/icon";
import { type SettingsType, useSettingActions, useSettings } from "@/store/settingStore";
import { presetsColors } from "@/theme/tokens/color";
import { FontFamilyPreset } from "@/theme/tokens/typography";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { ScrollArea } from "@/ui/scroll-area";
import { Separator } from "@/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { Slider } from "@/ui/slider";
import { Text } from "@/ui/typography";
import { cn } from "@/utils";
export function SettingButton() {
	const sheetContentBgStyle: CSSProperties = {
		backdropFilter: "blur(20px)",
	};
	const settings = useSettings();
	const { themeColorPresets, fontSize, fontFamily } = settings;
	const { setSettings } = useSettingActions();
	const updateSettings = (partialSettings: Partial<SettingsType>) => {
		setSettings({
			...settings,
			...partialSettings,
		});
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full animate-slow-spin">
					<Icon icon="local:ic-setting" size={24} />
				</Button>
			</SheetTrigger>
			<SheetContent style={sheetContentBgStyle} className="gap-0" onOpenAutoFocus={(e) => e.preventDefault()}>
				<SheetHeader className="flex flex-row items-center justify-between px-6 py-4 shrink-0">
					<SheetTitle>设置</SheetTitle>
					<SheetDescription />
				</SheetHeader>
				<ScrollArea>
					<div className="flex flex-col gap-6 px-6 py-2">
						{/* theme mode */}
						<div className="flex flex-col gap-2">
							<Text variant="subTitle1">模式</Text>
							<div className="flex flex-row gap-4">
								<Card
									onClick={() => updateSettings({ themeMode: ThemeMode.Light })}
									className="flex flex-1 h-20 cursor-pointer items-center justify-center outline-box"
								>
									<Icon icon="line-md:sun-rising-filled-loop" size="24" />
								</Card>
								<Card
									onClick={() => updateSettings({ themeMode: ThemeMode.Dark })}
									className="flex flex-1 h-20 cursor-pointer items-center justify-center outline-box"
								>
									<Icon icon="line-md:sunny-filled-loop-to-moon-filled-alt-loop-transition" size="24" />
								</Card>
								<Card
									onClick={() => updateSettings({ themeMode: ThemeMode.System })}
									className="flex flex-1 h-20 cursor-pointer items-center justify-center outline-box"
								>
									<div className="flex-center gap-2">
										<Icon icon="line-md:sun-rising-filled-loop" size="18" />
										<Separator orientation="vertical" />
										<Icon icon="line-md:sunny-filled-loop-to-moon-filled-alt-loop-transition" size="18" />
									</div>
								</Card>
							</div>
						</div>

						{/* theme presets */}
						<div className="flex flex-col gap-2">
							<Text variant="subTitle1">预设</Text>
							<div className="flex flex-wrap gap-1">
								{Object.entries(presetsColors).map(([preset, color]) => (
									<button
										type="button"
										key={preset}
										className={cn(
											"relative flex h-13 w-5 cursor-pointer items-center justify-center rounded transition-all duration-300 ease-in-out p-1 border-0",
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
							</div>
						</div>

						{/* font */}
						<div className="flex flex-col gap-2">
							<Text variant="subTitle1">字体</Text>

							<Text variant="subTitle2">字体系列</Text>
							<div className="flex flex-row gap-3">
								{Object.entries(FontFamilyPreset).map(([font, family]) => (
									<Card
										key={font}
										className={cn(
											"flex h-20 w-full cursor-pointer items-center justify-center text-text-disabled outline-box",
											fontFamily === family && "text-primary font-medium",
											family === FontFamilyPreset.inter && "font-inter",
											family === FontFamilyPreset.openSans && "font-openSans",
										)}
										onClick={() => updateSettings({ fontFamily: family })}
									>
										<div className="text-center text-lg">
											<span>A</span>
											<span className="opacity-50 ml-0.5">a</span>
										</div>
										<span className="text-sm text-text-primary">{family.replace("Variable", "")}</span>
									</Card>
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
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
