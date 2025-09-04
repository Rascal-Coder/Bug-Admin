import { PermissionType } from "@/types/enum";
import type { FrontendMenuTree } from "@/types/menu";
import { convert } from "@/utils/convert";

export const frontendNavConfig: FrontendMenuTree[] = [
	{
		name: "仪表盘",
		type: PermissionType.GROUP,
		children: [
			{
				name: "工作台",
				icon: "local:ic-workbench",
				path: "/workbench",
				component: "/pages/dashboard/workbench",
				type: PermissionType.MENU,
			},
			{
				name: "分析",
				icon: "local:ic-analysis",
				path: "/analysis",
				component: "/pages/dashboard/analysis",
				type: PermissionType.MENU,
			},
		],
	},
	{
		name: "页面",
		type: PermissionType.GROUP,
		children: [
			{
				name: "多级菜单",
				icon: "local:ic-menulevel",
				path: "/menu_level",
				type: PermissionType.CATALOGUE,
				children: [
					{
						name: "多级菜单1a",
						path: "/menu_level/1a",
						component: "/pages/menu-level/menu-level-1a",
						type: PermissionType.MENU,
					},
					{
						name: "多级菜单1b",
						path: "/menu_level/1b",
						component: "/pages/menu-level/menu-level-1b",
						type: PermissionType.CATALOGUE,
						children: [
							{
								name: "多级菜单2a",
								path: "/menu_level/1b/2a",
								component: "/pages/menu-level/menu-level-1b/menu-level-2a",
								type: PermissionType.MENU,
							},
							{
								name: "多级菜单2b",
								path: "/menu_level/1b/2b",
								type: PermissionType.CATALOGUE,
								children: [
									{
										name: "多级菜单3a",
										path: "/menu_level/1b/2b/3a",
										component: "/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3a",
										type: PermissionType.MENU,
									},
									{
										name: "多级菜单3b",
										path: "/menu_level/1b/2b/3b",
										component: "/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3b",
										type: PermissionType.MENU,
									},
								],
							},
						],
					},
				],
			},
			{
				name: "异常页",
				icon: "bxs:error-alt",
				path: "/error",
				type: PermissionType.CATALOGUE,
				children: [
					{
						name: "403",
						path: "/error/403",
						component: "/pages/sys/error/Page403",
						type: PermissionType.MENU,
					},
					{
						name: "404",
						path: "/error/404",
						component: "/pages/sys/error/Page404",
						type: PermissionType.MENU,
					},
					{
						name: "500",
						path: "/error/500",
						component: "/pages/sys/error/Page500",
						type: PermissionType.MENU,
					},
				],
			},
		],
	},
	{
		name: "UI",
		type: PermissionType.GROUP,
		children: [
			{
				name: "组件",
				icon: "solar:widget-5-bold-duotone",
				path: "/components",
				caption: "自定义UI组件",
				type: PermissionType.CATALOGUE,
				children: [
					{
						name: "图标",
						path: "/components/icon",
						component: "/pages/components/icon",
						type: PermissionType.MENU,
					},
					{
						name: "Toast",
						path: "/components/toast",
						component: "/pages/components/toast",
						type: PermissionType.MENU,
					},
				],
			},
		],
	},
	{
		name: "其他",
		type: PermissionType.GROUP,
		children: [
			{
				name: "项目禁用",
				icon: "local:ic-disabled",
				path: "/disabled",
				disabled: true,
				type: PermissionType.MENU,
			},
			{
				name: "项目标签",
				icon: "local:ic-label",
				path: "#label",
				badgeVariants: "success",
				badgeType: "dot",
				type: PermissionType.MENU,
			},
			{
				name: "链接",
				icon: "local:ic-external",
				path: "/link",
				type: PermissionType.CATALOGUE,
				children: [
					{
						name: "外链",
						path: "/link/external_link",
						component: "/pages/sys/others/link/external-link",
						externalLink: new URL("https://ant.design/index-cn"),
						type: PermissionType.MENU,
					},
					{
						name: "内嵌",
						path: "/link/iframe",
						externalLink: new URL("https://ant.design/index-cn"),
						component: "/pages/sys/others/link/iframe",
						type: PermissionType.MENU,
					},
				],
			},
		],
	},
];

export const frontendNavData = convert(frontendNavConfig);
