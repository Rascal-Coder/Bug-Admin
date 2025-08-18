import { Icon } from "@/components/icon";
import type { NavProps } from "@/components/nav/types";
// import { Badge } from "@/ui/badge";

export const frontendNavData: NavProps["data"] = [
	{
		name: "仪表盘",
		items: [
			{
				title: "工作台",
				path: "/workbench",
				icon: <Icon icon="local:ic-workbench" size="24" />,
			},
			{
				title: "分析",
				path: "/analysis",
				icon: <Icon icon="local:ic-analysis" size="24" />,
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
				icon: <Icon icon="local:ic-menulevel" size="24" />,
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
				icon: <Icon icon="bxs:error-alt" size="24" />,
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
];
