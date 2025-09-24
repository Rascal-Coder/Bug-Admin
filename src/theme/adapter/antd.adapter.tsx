import { StyleProvider } from "@ant-design/cssinjs";
import type { ThemeConfig } from "antd";
import { App, ConfigProvider, theme } from "antd";
import { ThemeColorPresets, ThemeMode } from "#/enum";
import { useSettings } from "@/store/settingStore";
import { generateColorVariants, removePx } from "@/utils/theme";
import { baseThemeTokens } from "../tokens/base";
import { darkColorTokens, lightColorTokens, presetsColors } from "../tokens/color";
import type { UILibraryAdapter } from "../type";

export const AntdAdapter: UILibraryAdapter = ({ mode, children }) => {
	const { themeColorPresets, fontFamily, fontSize, customPrimaryColor } = useSettings();
	const algorithm = mode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm;

	const colorTokens = mode === ThemeMode.Light ? lightColorTokens : darkColorTokens;

	const primaryColorToken =
		themeColorPresets === ThemeColorPresets.Custom
			? generateColorVariants(customPrimaryColor || "#808080")
			: presetsColors[themeColorPresets as keyof typeof presetsColors];

	const token: ThemeConfig["token"] = {
		colorPrimary: primaryColorToken.default,
		colorSuccess: colorTokens.palette.success.default,
		colorWarning: colorTokens.palette.warning.default,
		colorError: colorTokens.palette.error.default,
		colorInfo: colorTokens.palette.info.default,

		colorBgLayout: colorTokens.background.default,
		colorBgContainer: colorTokens.background.paper,
		colorBgElevated: colorTokens.background.default,

		wireframe: false,
		fontFamily: fontFamily,
		fontSize: fontSize,

		borderRadiusSM: removePx(baseThemeTokens.borderRadius.sm),
		borderRadius: removePx(baseThemeTokens.borderRadius.default),
		borderRadiusLG: removePx(baseThemeTokens.borderRadius.lg),
	};

	const components: ThemeConfig["components"] = {
		Breadcrumb: {
			separatorMargin: removePx(baseThemeTokens.spacing[1]),
		},
		Menu: {
			colorFillAlter: "transparent",
			itemColor: colorTokens.text.secondary,
			motionDurationMid: "0.125s",
			motionDurationSlow: "0.125s",
			darkItemBg: darkColorTokens.background.default,
		},
		Layout: {
			siderBg: darkColorTokens.background.default,
		},
	};

	return (
		<ConfigProvider
			theme={{ algorithm, token, components }}
			tag={{
				style: {
					borderRadius: removePx(baseThemeTokens.borderRadius.md),
					fontWeight: 700,
					padding: `0 ${baseThemeTokens.spacing[1]}`,
					margin: `0 ${baseThemeTokens.spacing[1]}`,
					borderWidth: 0,
				},
			}}
		>
			<StyleProvider hashPriority="high">
				<App className="h-full">{children}</App>
			</StyleProvider>
		</ConfigProvider>
	);
};
