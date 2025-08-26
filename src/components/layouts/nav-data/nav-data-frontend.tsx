import type { NavProps } from "@/components/nav/types";

export const frontendNavData: NavProps["data"] = [
	{
		name: "仪表盘",
		items: [
			{
				title: "工作台",
				path: "/workbench",
				icon: "local:ic-workbench",
			},
			{
				title: "分析",
				path: "/analysis",
				icon: "local:ic-analysis",
			},
		],
	},
	{
		name: "页面",
		items: [
			// menulevel
			{
				title: "多级菜单",
				path: "/menu_level",
				icon: "local:ic-menulevel",
				children: [
					{
						title: "多级菜单1a",
						path: "/menu_level/1a",
					},
					{
						title: "多级菜单1b",
						path: "/menu_level/1b",
						children: [
							{
								title: "多级菜单2a",
								path: "/menu_level/1b/2a",
							},
							{
								title: "多级菜单2b",
								path: "/menu_level/1b/2b",
								children: [
									{
										title: "多级菜单3a",
										path: "/menu_level/1b/2b/3a",
									},
									{
										title: "多级菜单3b",
										path: "/menu_level/1b/2b/3b",
									},
								],
							},
						],
					},
				],
			},
			// errors
			{
				title: "异常页",
				path: "/error",
				icon: "bxs:error-alt",
				children: [
					{
						title: "403",
						path: "/error/403",
					},
					{
						title: "404",
						path: "/error/404",
					},
					{
						title: "500",
						path: "/error/500",
					},
				],
			},
		],
	},
	{
		name: "UI",
		items: [
			{
				title: "组件",
				path: "/components",
				icon: "solar:widget-5-bold-duotone",
				caption: "自定义UI组件",
				children: [
					{
						title: "图标",
						path: "/components/icon",
					},
					{
						title: "Toast",
						path: "/components/toast",
					},
				],
			},
		],
	},
	{
		name: "其他",
		items: [
			{
				title: "项目禁用",
				path: "/disabled",
				icon: "local:ic-disabled",
				disabled: true,
			},
			{
				title: "项目标签",
				path: "#label",
				icon: "local:ic-label",
				// badge: "New",
				badgeType: "dot",
				badgeVariants: "success",
			},
			{
				title: "链接",
				path: "/link",
				icon: "local:ic-external",
				children: [
					{
						title: "内嵌",
						path: "/link/iframe",
					},
					{
						title: "外链",
						path: "/link/external-link",
					},
				],
			},
		],
	},
];
