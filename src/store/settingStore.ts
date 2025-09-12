import { merge } from "lodash";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { StorageEnum, ThemeColorPresets, ThemeMode } from "#/enum";
import { preferences } from "@/preferences";
import { FontFamilyPreset, typographyTokens } from "@/theme/tokens/typography";

export type SettingsType = {
	themeColorPresets: string;
	themeMode: "light" | "dark" | "system";
	fontFamily: string;
	fontSize: number;
	customPrimaryColor?: string;
	grayMode: boolean;
	colorWeakMode: boolean;
	sidebarMode: "inset" | "floating" | "sidebar";
	layoutMode: "vertical" | "horizontal" | "mixed" | "double";
	themeStretch: boolean;
	collapsibleType: "icon" | "offcanvas";
	transition: boolean;
};

export type SignInLayout = "center" | "right" | "left";
type SettingStore = {
	settings: SettingsType;
	signInLayout: SignInLayout;
	showMaximize: boolean;
	// 使用 actions 命名空间来存放所有的 action
	actions: {
		setSettings: (settings: SettingsType) => void;
		clearSettings: () => void;
		setSignInLayout: (signInLayout: SignInLayout) => void;
		setShowMaximize: (showMaximize: boolean) => void;
	};
};

// 默认配置
export const defaultSettings: SettingsType = {
	themeColorPresets: ThemeColorPresets.Default,
	themeMode: ThemeMode.System,
	fontFamily: FontFamilyPreset.openSans,
	fontSize: Number(typographyTokens.fontSize.sm),
	grayMode: false,
	colorWeakMode: false,
	sidebarMode: "inset",
	layoutMode: "vertical",
	themeStretch: false,
	collapsibleType: "icon",
	transition: true,
};

// 合并默认配置和用户偏好配置
export const initialSettings: SettingsType = merge({}, defaultSettings, preferences);

const useSettingStore = create<SettingStore>()(
	persist(
		(set) => ({
			settings: initialSettings,
			signInLayout: "center",
			showMaximize: false,
			actions: {
				setSignInLayout: (signInLayout) => {
					set({ signInLayout });
				},
				setSettings: (settings) => {
					set({ settings });
				},
				clearSettings() {
					useSettingStore.persist.clearStorage();
				},
				setShowMaximize: (showMaximize) => {
					set({ showMaximize });
				},
			},
		}),
		{
			name: StorageEnum.Settings, // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			partialize: (state) => ({
				settings: state.settings,
				signInLayout: state.signInLayout,
				showMaximize: state.showMaximize,
			}),
		},
	),
);

export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () => useSettingStore((state) => state.actions);
export const useSetSettings = () => useSettingStore((state) => state.actions.setSettings);
export const useClearSettings = () => useSettingStore((state) => state.actions.clearSettings);
export const useSignInLayout = () => useSettingStore((state) => state.signInLayout);
export const useSetSignInLayout = () => useSettingStore((state) => state.actions.setSignInLayout);
export const useShowMaximize = () => useSettingStore((state) => state.showMaximize);
export const useSetShowMaximize = () => useSettingStore((state) => state.actions.setShowMaximize);
export const useDarkMode = () => {
	const settings = useSettingStore((state) => state.settings);
	return settings?.themeMode === ThemeMode.Dark;
};
