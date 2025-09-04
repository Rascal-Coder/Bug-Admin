export enum BasicStatus {
	DISABLE = 0,
	ENABLE = 1,
}
export enum PermissionType {
	GROUP = 0,
	CATALOGUE = 1,
	MENU = 2,
	COMPONENT = 3,
}

export enum ThemeMode {
	Light = "light",
	Dark = "dark",
	System = "system",
}

export enum ThemeColorPresets {
	Default = "default",
	Cyan = "cyan",
	Purple = "purple",
	Blue = "blue",
	Orange = "orange",
	Red = "red",
	Custom = "custom",
}

export enum HtmlDataAttribute {
	ColorPalette = "data-color-palette",
	ThemeMode = "data-theme-mode",
	GrayMode = "data-gray-mode",
	ColorWeakMode = "data-color-weak-mode",
}

export enum LocalEnum {
	en_US = "en_US",
	zh_CN = "zh_CN",
}

export enum ResultStatus {
	SUCCESS = 0,
	ERROR = -1,
	TIMEOUT = 401,
}
