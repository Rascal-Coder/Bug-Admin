import { useCallback } from "react";
import { type SettingsType, useSettingActions, useSettings } from "@/store/settingStore";

/**
 * 用于更新设置
 * @returns updateSettings 函数，用于部分更新设置
 */
export const useUpdateSettings = () => {
	const { setSettings } = useSettingActions();
	const settings = useSettings();

	const updateSettings = useCallback(
		(partialSettings: Partial<SettingsType>) => {
			setSettings({
				...settings,
				...partialSettings,
			});
		},
		[setSettings, settings],
	);

	return { updateSettings, settings };
};
