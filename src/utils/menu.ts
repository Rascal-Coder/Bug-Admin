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
