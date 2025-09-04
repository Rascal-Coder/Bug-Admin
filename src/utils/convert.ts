import { NavItemDataProps, NavProps } from "@/components/nav/types";
import { MenuTree } from "@/types/entity";

const convertChildren = (children?: MenuTree[]): NavItemDataProps[] => {
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

export const convert = (menuTree: MenuTree[]): NavProps["data"] => {
	return menuTree.map((item) => ({
		name: item.name,
		items: convertChildren(item.children),
	}));
};
