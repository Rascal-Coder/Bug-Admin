import { faker } from "@faker-js/faker";
import { PermissionType } from "#/enum";
import type { Permission, Role, User } from "@/types/entity";
import type { BackendMenu } from "@/types/menu";

const { GROUP, MENU, CATALOGUE } = PermissionType;

export const DB_MENU: BackendMenu[] = [
	// group
	{ id: "group_dashboard", name: "仪表盘", code: "dashboard", parentId: "", type: GROUP },
	{ id: "group_pages", name: "页面", code: "pages", parentId: "", type: GROUP },
	{ id: "group_ui", name: "UI", code: "ui", parentId: "", type: GROUP },
	{ id: "group_others", name: "其他", code: "others", parentId: "", type: GROUP },

	// group_dashboard
	{
		id: "workbench",
		parentId: "group_dashboard",
		name: "工作台",
		code: "workbench",
		icon: "local:ic-workbench",
		type: MENU,
		path: "/workbench",
		component: "/pages/dashboard/workbench",
	},
	{
		id: "analysis",
		parentId: "group_dashboard",
		name: "环境依赖",
		code: "analysis",
		icon: "local:ic-analysis",
		type: MENU,
		path: "/analysis",
		component: "/pages/dashboard/environmental-dependence",
	},

	// group_pages
	// menulevel
	{
		id: "menulevel",
		parentId: "group_pages",
		name: "多级菜单",
		code: "menulevel",
		icon: "local:ic-menulevel",
		type: CATALOGUE,
		path: "/menu_level",
	},
	{
		id: "menulevel_1a",
		parentId: "menulevel",
		name: "多级菜单1a",
		code: "menulevel:1a",
		type: MENU,
		path: "/menu_level/1a",
		component: "/pages/menu-level/menu-level-1a",
	},
	{
		id: "menulevel_1b",
		parentId: "menulevel",
		name: "多级菜单1b",
		code: "menulevel:1b",
		type: CATALOGUE,
		path: "/menu_level/1b",
		component: "/pages/menu-level/menu-level-1b",
	},
	{
		id: "menulevel_1b_2a",
		parentId: "menulevel_1b",
		name: "多级菜单2a",
		code: "menulevel:1b:2a",
		type: MENU,
		path: "/menu_level/1b/2a",
		component: "/pages/menu-level/menu-level-1b/menu-level-2a",
	},
	{
		id: "menulevel_1b_2b",
		parentId: "menulevel_1b",
		name: "多级菜单2b",
		code: "menulevel:1b:2b",
		type: CATALOGUE,
		path: "/menu_level/1b/2b",
	},
	{
		id: "menulevel_1b_2b_3a",
		parentId: "menulevel_1b_2b",
		name: "多级菜单3a",
		code: "menulevel:1b:2b:3a",
		type: MENU,
		path: "/menu_level/1b/2b/3a",
		component: "/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3a",
	},
	{
		id: "menulevel_1b_2b_3b",
		parentId: "menulevel_1b_2b",
		name: "多级菜单3b",
		code: "menulevel:1b:2b:3b",
		type: MENU,
		path: "/menu_level/1b/2b/3b",
		component: "/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3b",
	},
	// erros
	{
		id: "error",
		parentId: "group_pages",
		name: "异常页",
		code: "error",
		icon: "bxs:error-alt",
		type: CATALOGUE,
		path: "/error",
	},
	{
		id: "error_403",
		parentId: "error",
		name: "403",
		code: "error:403",
		type: MENU,
		path: "/error/403",
		component: "/pages/sys/error/Page403",
	},
	{
		id: "error_404",
		parentId: "error",
		name: "404",
		code: "error:404",
		type: MENU,
		path: "/error/404",
		component: "/pages/sys/error/Page404",
	},
	{
		id: "error_500",
		parentId: "error",
		name: "500",
		code: "error:500",
		type: MENU,
		path: "/error/500",
		component: "/pages/sys/error/Page500",
	},

	// group_ui
	// components
	{
		id: "components",
		parentId: "group_ui",
		name: "组件",
		code: "components",
		icon: "solar:widget-5-bold-duotone",
		type: CATALOGUE,
		path: "/components",
		caption: "自定义UI组件",
	},
	{
		id: "components_icon",
		parentId: "components",
		name: "图标",
		code: "components:icon",
		type: MENU,
		path: "/components/icon",
		component: "/pages/components/icon",
	},
	{
		id: "components_toast",
		parentId: "components",
		name: "Toast",
		code: "components:toast",
		type: MENU,
		path: "/components/toast",
		component: "/pages/components/toast",
	},
	{
		id: "components_animate",
		parentId: "components",
		name: "Animate",
		code: "components:animate",
		path: "/components/animate",
		component: "/pages/components/animate",
		type: MENU,
	},
	{
		id: "components_scroller",
		parentId: "components",
		name: "Scroller",
		code: "components:scroller",
		path: "/components/scroller",
		component: "/pages/components/scroller",
		type: MENU,
	},

	// group_others
	{
		id: "others_permission",
		parentId: "group_others",
		name: "权限",
		code: "others:permission",
		icon: "mingcute:safe-lock-fill",
		type: MENU,
		path: "/others/permission",
		component: "/pages/others/permission",
	},
	{
		id: "others_permission_page_test",
		parentId: "group_others",
		name: "权限测试",
		code: "others:permission:page-test",
		type: MENU,
		hidden: true,
		path: "/others/permission/page-test",
		component: "/pages/others/permission/page-test",
	},
	{
		id: "others_keep_alive",
		parentId: "group_others",
		name: "keep-alive",
		code: "others:keep-alive",
		icon: "mingcute:bookmark-fill",
		type: CATALOGUE,
		path: "/others/keep-alive",
	},
	{
		id: "others_keep_alive_keep",
		parentId: "others_keep_alive",
		name: "keep",
		code: "others:keep-alive:keep",
		type: MENU,
		path: "/others/keep-alive/keep",
		component: "/pages/others/keep-alive/keep",
		keepAlive: true,
	},
	{
		id: "others_keep_alive_no_keep",
		parentId: "others_keep_alive",
		name: "no-keep",
		code: "others:keep-alive:no-keep",
		type: MENU,
		path: "/others/keep-alive/no-keep",
		component: "/pages/others/keep-alive/no-keep",
		keepAlive: false,
	},
	{
		id: "disabled",
		parentId: "group_others",
		name: "项目禁用",
		code: "disabled",
		icon: "local:ic-disabled",
		type: MENU,
		path: "/disabled",
		disabled: true,
		component: "",
	},
	{
		id: "label",
		parentId: "group_others",
		name: "项目标签",
		code: "label",
		icon: "local:ic-label",
		type: MENU,
		path: "#label",
		badgeVariants: "success",
		badgeType: "dot",
	},
	{
		id: "link",
		parentId: "group_others",
		name: "链接",
		code: "link",
		icon: "local:ic-external",
		type: CATALOGUE,
		path: "/link",
	},
	{
		id: "link_external",
		parentId: "link",
		name: "外链",
		code: "link:external_link",
		type: MENU,
		path: "/link/external_link",
		isExternalLink: true,
		externalLink: new URL("https://ant.design/index-cn"),
	},
	{
		id: "link_iframe",
		parentId: "link",
		name: "内嵌",
		code: "link:iframe",
		type: MENU,
		path: "/link/iframe",
		externalLink: new URL("https://ant.design/index-cn"),
		isIframeLink: true,
	},
];

export const DB_PERMISSION: Permission[] = [
	{ id: "permission_create", name: "permission-create", code: "permission:create" },
	{ id: "permission_read", name: "permission-read", code: "permission:read" },
	{ id: "permission_update", name: "permission-update", code: "permission:update" },
	{ id: "permission_delete", name: "permission-delete", code: "permission:delete" },
];

export const DB_ROLE: Role[] = [
	{ id: "role_admin_id", name: "admin", code: "SUPER_ADMIN" },
	{ id: "role_test_id", name: "test", code: "TEST" },
];

export const DB_ROLE_PERMISSION = [
	{ id: faker.string.uuid(), roleId: "role_admin_id", permissionId: "permission_create" },
	{ id: faker.string.uuid(), roleId: "role_admin_id", permissionId: "permission_read" },
	{ id: faker.string.uuid(), roleId: "role_admin_id", permissionId: "permission_update" },
	{ id: faker.string.uuid(), roleId: "role_admin_id", permissionId: "permission_delete" },

	{ id: faker.string.uuid(), roleId: "role_test_id", permissionId: "permission_read" },
	{ id: faker.string.uuid(), roleId: "role_test_id", permissionId: "permission_update" },
];

export const DB_USER: User[] = [
	{
		id: "user_admin_id",
		username: "admin",
		password: "demo1234",
		avatar: faker.image.avatarGitHub(),
		email: "admin@slash.com",
	},
	{
		id: "user_test_id",
		username: "test",
		password: "demo1234",
		avatar: faker.image.avatarGitHub(),
		email: "test@slash.com",
	},
	{
		id: "user_guest_id",
		username: "guest",
		password: "demo1234",
		avatar: faker.image.avatarGitHub(),
		email: "guest@slash.com",
	},
];

export const DB_USER_ROLE = [
	{ id: "user_admin_role_admin", userId: "user_admin_id", roleId: "role_admin_id" },
	{ id: "user_test_role_test", userId: "user_test_id", roleId: "role_test_id" },
];
