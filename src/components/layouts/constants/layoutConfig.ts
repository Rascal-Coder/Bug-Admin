// 用户信息常量
export const USER_INFO = {
	name: "Rascal-Coder",
	email: "menoqiqio@gmail.com",
	avatar: "/src/assets/images/user/avatar.jpg",
} as const;

// 侧边栏宽度常量
export const SIDEBAR_WIDTH = {
	MAIN_MENU: "var(--spacing-24)",
	MAIN_MENU_INSET: "calc(var(--spacing-24) - var(--spacing-4))",
	SUB_MENU: "var(--spacing-64)",
	DEFAULT: "var(--layout-nav-width)",
} as const;

// 媒体查询断点
export const BREAKPOINTS = {
	MOBILE: 768,
} as const;

// 布局模式类型
export const LAYOUT_MODES = {
	HORIZONTAL: "horizontal",
	VERTICAL: "vertical",
	MIXED: "mixed",
	DOUBLE: "double",
} as const;

// 侧边栏模式
export const SIDEBAR_MODES = {
	SIDEBAR: "sidebar",
	FLOATING: "floating",
} as const;
