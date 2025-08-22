import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ThemeColorPresets, ThemeMode } from "#/enum";
import { FontFamilyPreset, typographyTokens } from "@/theme/tokens/typography";

export type SettingsType = {
	themeColorPresets: ThemeColorPresets;
	themeMode: ThemeMode;
	fontFamily: string;
	fontSize: number;
	customPrimaryColor?: string;
};
type SettingStore = {
	settings: SettingsType;
	// 使用 actions 命名空间来存放所有的 action
	actions: {
		setSettings: (settings: SettingsType) => void;
		clearSettings: () => void;
	};
};

const useSettingStore = create<SettingStore>()(
	persist(
		(set) => ({
			settings: {
				themeColorPresets: ThemeColorPresets.Default,
				themeMode: ThemeMode.System,
				fontFamily: FontFamilyPreset.openSans,
				fontSize: Number(typographyTokens.fontSize.sm),
			},
			actions: {
				setSettings: (settings) => {
					set({ settings });
				},
				clearSettings() {
					useSettingStore.persist.clearStorage();
				},
			},
		}),
		{
			name: "settings", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			partialize: (state) => ({ settings: state.settings }),
		},
	),
);

export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () => useSettingStore((state) => state.actions);
