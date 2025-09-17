import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { StorageEnum } from "#/enum";

export interface TabItem {
	label: string;
	value: string;
	path: string;
	pinned: boolean;
	icon?: string;
	component?: string;
}

interface TabStore {
	tabs: TabItem[];
	activeTab: string;
	removeTabKeys: string[];
	cacheKeys: string[];
	actions: {
		addTab: (tab: Omit<TabItem, "pinned">) => void;
		removeTab: (tabValue: string) => void;
		setActiveTab: (tabValue: string) => void;
		togglePin: (tabValue: string) => void;
		removeOtherTabs: (currentTabValue: string) => void;
		removeAllTabs: () => void;
		removeLeftTabs: (tabValue: string) => void;
		removeRightTabs: (tabValue: string) => void;
		reorderTabs: (oldIndex: number, newIndex: number) => void;
		addCacheKey: (cacheKey: string) => void;
		clearCacheKeys: () => void;
	};
}

// 查找 tab 索引
const findTabIndex = (tabs: readonly TabItem[], value: string): number => {
	return tabs.findIndex((tab) => tab.value === value);
};

// 获取 pinned 标签页数量
const getPinnedCount = (tabs: readonly TabItem[]): number => {
	return tabs.filter((tab) => tab.pinned).length;
};

// 分离 pinned 和 unpinned 标签页
const separatePinnedTabs = (tabs: readonly TabItem[]) => {
	const pinned: TabItem[] = [];
	const unpinned: TabItem[] = [];

	for (const tab of tabs) {
		if (tab.pinned) {
			pinned.push(tab);
		} else {
			unpinned.push(tab);
		}
	}

	return { pinned, unpinned };
};

// 更新 removeTabKeys
const updateRemoveTabKeys = (currentRemoveTabKeys: readonly string[], removedKeys: string[]): string[] => {
	return [...currentRemoveTabKeys, ...removedKeys];
};

const useTabStore = create<TabStore>()(
	persist(
		(set, get) => ({
			tabs: [],
			activeTab: "",
			removeTabKeys: [],
			cacheKeys: [],
			actions: {
				addTab: (newTab) => {
					const { tabs, removeTabKeys } = get();
					const existingTabIndex = findTabIndex(tabs, newTab.value);

					if (existingTabIndex !== -1) {
						set({ activeTab: newTab.value });
						return;
					}

					const tabWithPinned: TabItem = { ...newTab, pinned: false };

					const { pinned, unpinned } = separatePinnedTabs(tabs);

					const newTabs: TabItem[] = [...pinned, ...unpinned, tabWithPinned];

					const newTabsKeys = new Set(newTabs.map((tab) => tab.value));
					const newRemoveTabKeys = removeTabKeys.filter((key) => !newTabsKeys.has(key));

					set({
						tabs: newTabs,
						activeTab: newTab.value,
						removeTabKeys: newRemoveTabKeys,
					});
				},

				removeTab: (tabValue) => {
					const { tabs, activeTab, removeTabKeys } = get();
					const tabIndex = findTabIndex(tabs, tabValue);

					// 如果标签页不存在，直接返回
					if (tabIndex === -1) return;

					const filteredTabs = tabs.filter((tab) => tab.value !== tabValue);

					let newActiveTab = activeTab;

					// 如果删除的是当前激活的标签页，需要选择新的激活标签页
					if (activeTab === tabValue) {
						if (filteredTabs.length > 0) {
							// 优先选择同一位置的标签页，如果超出范围则选择最后一个
							const nextIndex = Math.min(tabIndex, filteredTabs.length - 1);
							newActiveTab = filteredTabs[nextIndex].value;
						} else {
							newActiveTab = "";
						}
					}

					set({
						tabs: filteredTabs,
						activeTab: newActiveTab,
						removeTabKeys: updateRemoveTabKeys(removeTabKeys, [tabValue]),
					});
				},

				setActiveTab: (tabValue) => {
					const { tabs } = get();

					if (findTabIndex(tabs, tabValue) !== -1) {
						set({ activeTab: tabValue });
					}
				},

				togglePin: (tabValue) => {
					const { tabs, removeTabKeys } = get();
					const tabIndex = findTabIndex(tabs, tabValue);

					// 如果标签页不存在，直接返回
					if (tabIndex === -1) return;

					const targetTab = tabs[tabIndex];
					const updatedTab: TabItem = { ...targetTab, pinned: !targetTab.pinned };

					const newTabs = [...tabs];
					newTabs[tabIndex] = updatedTab;

					// 重新排序：pinned 标签页在前，保持相对顺序
					const sortedTabs = newTabs.sort((a, b) => {
						// pinned 标签页排在前面
						if (a.pinned && !b.pinned) return -1;
						if (!a.pinned && b.pinned) return 1;

						// 保持原有的相对顺序
						const aIndex = tabs.findIndex((tab) => tab.value === a.value);
						const bIndex = tabs.findIndex((tab) => tab.value === b.value);
						return aIndex - bIndex;
					});

					set({ tabs: sortedTabs, removeTabKeys: [...removeTabKeys] });
				},

				removeOtherTabs: (currentTabValue) => {
					const { tabs, removeTabKeys } = get();

					if (findTabIndex(tabs, currentTabValue) === -1) return;

					const remainingTabs = tabs.filter((tab) => tab.value === currentTabValue || tab.pinned);

					const otherTabsKeys = tabs
						.filter((tab) => !(tab.value === currentTabValue || tab.pinned))
						.map((tab) => tab.value);

					set({
						tabs: remainingTabs,
						activeTab: currentTabValue,
						removeTabKeys: updateRemoveTabKeys(removeTabKeys, otherTabsKeys),
					});
				},

				removeAllTabs: () => {
					const { tabs, removeTabKeys } = get();
					const { pinned } = separatePinnedTabs(tabs);

					const newActiveTab = pinned.length > 0 ? pinned[0].value : "";

					const noPinnedTabsKeys = tabs.filter((tab) => !tab.pinned).map((tab) => tab.value);

					set({
						tabs: pinned,
						activeTab: newActiveTab,
						removeTabKeys: updateRemoveTabKeys(removeTabKeys, noPinnedTabsKeys),
					});
				},

				removeLeftTabs: (tabValue) => {
					const { tabs, removeTabKeys } = get();
					const targetIndex = findTabIndex(tabs, tabValue);

					if (targetIndex === -1) return;

					const leftTabs = tabs.slice(0, targetIndex);
					const rightTabs = tabs.slice(targetIndex);

					const pinnedLeftTabs = leftTabs.filter((tab) => tab.pinned);
					const noPinnedLeftTabsKeys = leftTabs.filter((tab) => !tab.pinned).map((tab) => tab.value);

					set({
						tabs: [...pinnedLeftTabs, ...rightTabs],
						removeTabKeys: updateRemoveTabKeys(removeTabKeys, noPinnedLeftTabsKeys),
					});
				},

				removeRightTabs: (tabValue) => {
					const { tabs, removeTabKeys } = get();
					const targetIndex = findTabIndex(tabs, tabValue);

					if (targetIndex === -1) return;

					const leftTabs = tabs.slice(0, targetIndex + 1);
					const rightTabs = tabs.slice(targetIndex + 1);
					const pinnedRightTabs = rightTabs.filter((tab) => tab.pinned);

					const noPinnedRightTabsKeys = rightTabs.filter((tab) => !tab.pinned).map((tab) => tab.value);
					set({
						tabs: [...leftTabs, ...pinnedRightTabs],
						removeTabKeys: updateRemoveTabKeys(removeTabKeys, noPinnedRightTabsKeys),
					});
				},

				reorderTabs: (oldIndex, newIndex) => {
					const { tabs, removeTabKeys } = get();

					const movedTab = tabs[oldIndex];
					const pinnedCount = getPinnedCount(tabs);

					// 限制拖拽范围，确保 pinned 标签页只能在 pinned 区域内拖拽
					if (movedTab.pinned) {
						// pinned 标签页只能在 0 到 pinnedCount-1 的范围内拖拽
						newIndex = Math.max(0, Math.min(newIndex, pinnedCount - 1));
					} else {
						// 普通标签页只能在 pinnedCount 到 tabs.length-1 的范围内拖拽
						newIndex = Math.max(pinnedCount, Math.min(newIndex, tabs.length - 1));
					}

					if (oldIndex === newIndex) return;

					// 执行拖拽操作
					const newTabs = [...tabs];
					const [draggedTab] = newTabs.splice(oldIndex, 1);
					newTabs.splice(newIndex, 0, draggedTab);

					set({ tabs: newTabs, removeTabKeys: [...removeTabKeys] });
				},
				addCacheKey: (cacheKey: string) => {
					const { cacheKeys } = get();
					set({ cacheKeys: [...cacheKeys, cacheKey] });
				},
				clearCacheKeys: () => {
					set({ cacheKeys: [] });
				},
			},
		}),
		{
			name: StorageEnum.Tabs,
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				tabs: state.tabs,
				activeTab: state.activeTab,
				removeTabKeys: state.removeTabKeys,
				cacheKeys: state.cacheKeys,
			}),
		},
	),
);

export const useTabs = () => useTabStore((state) => state.tabs);
export const useActiveTab = () => useTabStore((state) => state.activeTab);
export const useTabActions = () => useTabStore((state) => state.actions);

export default useTabStore;
