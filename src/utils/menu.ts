import type { NavItemDataProps } from "@/components/nav/types";
import { navData } from "@/routes/nav-data";

/**
 * 根据路径递归查找菜单项
 * @param path 路径
 * @param items 菜单项数组
 * @returns 找到的菜单项或null
 */
function findMenuItemByPath(path: string, items: NavItemDataProps[]): NavItemDataProps | null {
	for (const item of items) {
		// 精确匹配
		if (item.path === path) {
			return item;
		}

		// 递归搜索子菜单
		if (item.children && item.children.length > 0) {
			const found = findMenuItemByPath(path, item.children);
			if (found) {
				return found;
			}
		}
	}
	return null;
}

/**
 * 根据当前路径获取菜单信息
 * @param currentPath 当前路径
 * @returns 菜单信息或null
 */
export function getMenuInfoByPath(currentPath: string): NavItemDataProps | null {
	// 遍历所有导航分组
	for (const section of navData) {
		const found = findMenuItemByPath(currentPath, section.items);
		if (found) {
			return found;
		}
	}

	return null;
}

/**
 * 获取默认路由（第一个可访问的菜单项）
 * @returns 默认路由信息或null
 */
export function getDefaultRoute(): NavItemDataProps | null {
	function findFirstMenuItem(items: NavItemDataProps[]): NavItemDataProps | null {
		for (const item of items) {
			// 如果是菜单项且未禁用，返回它
			if (!item.disabled && !item.children) {
				return item;
			}

			// 如果有子菜单，递归查找
			if (item.children && item.children.length > 0) {
				const found = findFirstMenuItem(item.children);
				if (found) {
					return found;
				}
			}
		}
		return null;
	}

	// 遍历所有导航分组，找到第一个可用的菜单项
	for (const section of navData) {
		const found = findFirstMenuItem(section.items);
		if (found) {
			return found;
		}
	}

	return null;
}
