import { useEffect, useMemo } from "react";
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

	const actualThemeMode = (themeMode === ThemeMode.System ? systemTheme : themeMode) as "light" | "dark";

	// Memoize adapters to avoid recreating on every render
	const wrappedWithAdapters = useMemo(() => {
		return adapters.reduce(
			(children, Adapter) => (
				<Adapter key={Adapter.name} mode={actualThemeMode}>
					{children}
				</Adapter>
			),
			children,
		);
	}, [adapters, actualThemeMode, children]);

	// Combine all DOM updates into a single effect to reduce reflows
	useEffect(() => {
		const root = window.document.documentElement;
		const body = window.document.body;

		// Batch DOM updates to minimize reflows
		requestAnimationFrame(() => {
			// Update theme mode
			root.setAttribute(HtmlDataAttribute.ThemeMode, actualThemeMode);

			// Update gray mode and color weak mode
			root.classList.toggle("grayscale-mode", grayMode);
			root.classList.toggle("color-weak-mode", colorWeakMode);

			// Update color palette
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

			// Update font size and font family
			root.style.fontSize = `${fontSize}px`;
			body.style.fontFamily = fontFamily;
		});
	}, [actualThemeMode, grayMode, colorWeakMode, themeColorPresets, customPrimaryColor, fontFamily, fontSize]);

	return wrappedWithAdapters;
}
