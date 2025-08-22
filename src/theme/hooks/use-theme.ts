import type { ThemeMode } from "#/enum";
import { ThemeColorPresets } from "#/enum";
import { useSettingActions, useSettings } from "@/store/settingStore";
import { generateColorVariants } from "@/utils/theme";
import { themeVars } from "../theme.css";
import { baseThemeTokens } from "../tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "../tokens/color";
import { darkShadowTokens, lightShadowTokens } from "../tokens/shadow";
import { typographyTokens } from "../tokens/typography";

export function useTheme() {
	const settings = useSettings();
	const { setSettings } = useSettingActions();

	let colorTokens = settings.themeMode === "light" ? lightColorTokens : darkColorTokens;

	const primaryColor =
		settings.themeColorPresets === ThemeColorPresets.Custom
			? generateColorVariants(settings.customPrimaryColor || "#808080")
			: presetsColors[settings.themeColorPresets];

	colorTokens = {
		...colorTokens,
		palette: {
			...colorTokens.palette,
			primary: primaryColor,
		},
	};

	return {
		mode: settings.themeMode,
		setMode: (mode: ThemeMode) => {
			setSettings({
				...settings,
				themeMode: mode,
			});
		},
		themeVars,
		themeTokens: {
			base: baseThemeTokens,
			color: colorTokens,
			shadow: settings.themeMode === "light" ? lightShadowTokens : darkShadowTokens,
			typography: typographyTokens,
		},
	};
}
