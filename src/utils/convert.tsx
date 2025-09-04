import { Navigate, type RouteObject } from "react-router";
import type { NavItemDataProps, NavProps } from "@/components/nav/types";
import { Component } from "@/routes/sections/dashboard/utils";
import { PermissionType } from "@/types/enum";
import type { BackendMenuTree, FrontendMenuTree, MenuMetaInfo } from "@/types/menu";

export type NavItem = Partial<
	Pick<
		NavItemDataProps,
		"path" | "icon" | "caption" | "badge" | "badgeType" | "badgeVariants" | "disabled" | "auth" | "hidden"
	>
> & {
	externalLink?: URL;
	component?: string;
	name: string;
	children?: NavItem[];
};

const convertChildren = (children?: BackendMenuTree[] | FrontendMenuTree[]): NavItemDataProps[] => {
	if (!children?.length) return [];

	return children.map((child) => ({
		title: child.name,
		path: child.path || "",
		icon: child.icon,
		caption: child.caption,
		badge: child.badge,
		badgeType: child.badgeType,
		badgeVariants: child.badgeVariants,
		disabled: child.disabled,
		externalLink: child.externalLink,
		auth: child.auth,
		hidden: child.hidden,
		children: convertChildren(child.children),
	}));
};

export const convert = (menuTree: BackendMenuTree[] | FrontendMenuTree[]): NavProps["data"] => {
	return menuTree.map((item) => ({
		name: item.name,
		items: convertChildren(item.children),
	}));
};

/**
 * get route path from menu path and parent path
 * @param menuPath '/a/b/c'
 * @param parentPath '/a/b'
 * @returns '/c'
 *
 * @example
 * getRoutePath('/a/b/c', '/a/b') // '/c'
 */
const getRoutePath = (menuPath?: string, parentPath?: string) => {
	const menuPathArr = menuPath?.split("/").filter(Boolean) || [];
	const parentPathArr = parentPath?.split("/").filter(Boolean) || [];

	// remove parentPath items from menuPath
	const result = menuPathArr.slice(parentPathArr.length).join("/");
	return result;
};

/**
 * generate props for menu component
 * @param metaInfo
 * @returns
 */
const generateProps = (metaInfo: MenuMetaInfo) => {
	const props: any = {};
	if (metaInfo.externalLink) {
		props.src = metaInfo.externalLink?.toString() || "";
	}
	return props;
};

/**
 * convert menu to route
 * @param items
 * @param parent
 * @returns
 */
export const convertToRoute = (
	items: BackendMenuTree[] | FrontendMenuTree[],
	parent?: BackendMenuTree | FrontendMenuTree,
): RouteObject[] => {
	const routes: RouteObject[] = [];

	const processItem = (item: BackendMenuTree | FrontendMenuTree) => {
		// if group, process children
		if (item.type === PermissionType.GROUP) {
			for (const child of item.children || []) {
				processItem(child);
			}
		}

		// if catalogue, process children
		if (item.type === PermissionType.CATALOGUE) {
			const children = item.children || [];
			if (children.length > 0) {
				const firstChild = children[0];
				if (firstChild.path) {
					routes.push({
						path: getRoutePath(item.path, parent?.path),
						children: [
							{
								index: true,
								element: <Navigate to={getRoutePath(firstChild.path, item.path)} replace />,
							},
							...convertToRoute(children, item),
						],
					});
				}
			}
		}

		// if menu, create route
		if (item.type === PermissionType.MENU) {
			const props = generateProps(item);
			if (item.disabled) return;
			routes.push({
				path: getRoutePath(item.path, parent?.path),
				element: Component(item.component, props),
			});
		}
	};

	for (const item of items) {
		processItem(item);
	}
	return routes;
};
