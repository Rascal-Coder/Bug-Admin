import { useEffect } from "react";
import { HtmlDataAttribute, ThemeColorPresets, ThemeMode } from "#/enum";
import { useSystemTheme } from "@/hooks/use-media-query";
import { useSettings } from "@/store/settingStore";
import { addColorChannels, generateColorVariants } from "@/utils/theme";
import type { UILibraryAdapter } from "./type";

interface ThemeProviderProps {
	children: React.ReactNode;
	adapters?: UILibraryAdapter[];
}

export function ThemeProvider({ children, adapters = [] }: ThemeProviderProps) {
	const { themeMode, themeColorPresets, fontFamily, fontSize, customPrimaryColor, grayMode, colorWeakMode } =
		useSettings();
	const systemTheme = useSystemTheme();

	const actualThemeMode = (themeMode === ThemeMode.System ? systemTheme : themeMode) as ThemeMode;

	// Update HTML class to support Tailwind dark mode
	useEffect(() => {
		const root = window.document.documentElement;
		root.setAttribute(HtmlDataAttribute.ThemeMode, actualThemeMode);
	}, [actualThemeMode]);

	// Update gray mode and color weak mode
	useEffect(() => {
		const root = window.document.documentElement;

		// Gray mode
		if (grayMode) {
			root.classList.add("grayscale-mode");
		} else {
			root.classList.remove("grayscale-mode");
		}

		// Color weak mode (using invert-mode as a placeholder, can be customized)
		if (colorWeakMode) {
			root.classList.add("color-weak-mode");
		} else {
			root.classList.remove("color-weak-mode");
		}
	}, [grayMode, colorWeakMode]);

	// Dynamically update theme color related CSS variables
	useEffect(() => {
		const root = window.document.documentElement;
		root.setAttribute(HtmlDataAttribute.ColorPalette, themeColorPresets);

		// Handle custom color
		if (themeColorPresets === ThemeColorPresets.Custom && customPrimaryColor) {
			const customColors = generateColorVariants(customPrimaryColor);

			const colorChannels = addColorChannels(customColors);

			// Set CSS variables for custom primary color
			Object.entries(colorChannels).forEach(([key, value]) => {
				if (key.endsWith("Channel")) {
					root.style.setProperty(`--colors-palette-primary-${key}`, value);
				} else {
					root.style.setProperty(`--colors-palette-primary-${key}`, value);
				}
			});
		} else {
			// Clear custom CSS variables when switching back to preset colors
			const colorKeys = ["lighter", "light", "default", "dark", "darker"];
			colorKeys.forEach((key) => {
				root.style.removeProperty(`--colors-palette-primary-${key}`);
				root.style.removeProperty(`--colors-palette-primary-${key}Channel`);
			});
		}
	}, [themeColorPresets, customPrimaryColor]);

	// Update font size and font family
	useEffect(() => {
		const root = window.document.documentElement;
		root.style.fontSize = `${fontSize}px`;

		const body = window.document.body;
		body.style.fontFamily = fontFamily;
	}, [fontFamily, fontSize]);

	// Wrap children with adapters
	const wrappedWithAdapters = adapters.reduce(
		(children, Adapter) => (
			<Adapter key={Adapter.name} mode={actualThemeMode}>
				{children}
			</Adapter>
		),
		children,
	);

	return wrappedWithAdapters;
}
