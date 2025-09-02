import type { SettingsType } from "@/store/settingStore";

// 在这里配置您的自定义默认设置
// 这些设置会覆盖系统默认配置，作为应用的初始配置
// 只需要配置您想要修改的字段，其他字段会使用系统默认值
// !!! 更改配置后请清空缓存，否则可能不生效
export const preferences: Partial<SettingsType> = {
	// 示例：设置默认主题色为青色
	themeColorPresets: "cyan",
};
