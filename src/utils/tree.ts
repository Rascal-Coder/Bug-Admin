import { chain } from "ramda";
import type { NavProps } from "@/components/nav/types";

/**
 * Flatten an array containing a tree structure
 * @param {T[]} trees - An array containing a tree structure
 * @returns {T[]} - Flattened array
 */
export function flattenTrees<T extends { children?: T[] }>(trees: T[] = []): T[] {
	return chain((node) => {
		const children = node.children || [];
		return [node, ...flattenTrees(children)];
	}, trees);
}

/**
 * Convert an array to a tree structure
 * @param items - An array of items
 * @returns A tree structure
 */
export function convertToTree<T extends { children?: T[] }>(items: T[]): T[] {
	const tree = items.map((item) => ({ ...item, children: convertToTree(item.children || []) }));

	return tree;
}

/**
 * Convert a flat array with parentId to a tree structure
 * @param items - An array of items with parentId
 * @returns A tree structure with children property
 */
export function convertFlatToTree<T extends { id: string; parentId: string }>(items: T[]): (T & { children: T[] })[] {
	const itemMap = new Map<string, T & { children: T[] }>();
	const result: (T & { children: T[] })[] = [];

	// First pass: create a map of all items
	for (const item of items) {
		itemMap.set(item.id, { ...item, children: [] });
	}

	// Second pass: build the tree
	for (const item of items) {
		const node = itemMap.get(item.id);
		if (!node) continue;

		if (item.parentId === "") {
			result.push(node);
		} else {
			const parent = itemMap.get(item.parentId);
			if (parent) {
				parent.children.push(node);
			}
		}
	}

	return result;
}

/**
 * Find the menu group that contains a specific path
 * @param navData - Navigation data array
 * @param currentPath - Current route path to search for
 * @returns The name of the group containing the path, or the first group name as fallback
 */
export function findActiveMenuGroup(navData: NavProps["data"], currentPath: string): string {
	// Helper function to check if a path matches or is a parent of the current path
	const pathMatches = (itemPath: string, targetPath: string): boolean => {
		if (!itemPath || !targetPath) return false;
		// Exact match or targetPath starts with itemPath followed by '/'
		return targetPath === itemPath || targetPath.startsWith(`${itemPath}/`);
	};

	// Helper function to search for path in menu items recursively
	const searchInItems = (items: NavProps["data"][0]["items"]): boolean => {
		return items.some((item) => {
			if (pathMatches(item.path, currentPath)) {
				return true;
			}
			if (item.children && item.children.length > 0) {
				return searchInItems(item.children);
			}
			return false;
		});
	};

	// Search through all groups
	for (const group of navData) {
		if (searchInItems(group.items)) {
			return group.name || "";
		}
	}

	// Fallback to first group if no match found
	return navData[0]?.name || "";
}
