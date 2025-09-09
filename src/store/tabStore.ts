import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { StorageEnum } from "#/enum";

export type TabItem = {
	label: string;
	value: string;
	path: string;
	pinned: boolean;
	icon?: string;
	component?: string;
};

type TabStore = {
	tabs: TabItem[];
	activeTab: string;

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
	};
};

const useTabStore = create<TabStore>()(
	persist(
		(set, get) => ({
			tabs: [],
			activeTab: "",

			actions: {
				addTab: (newTab) => {
					const { tabs } = get();
					const existingTab = tabs.find((tab) => tab.value === newTab.value);

					if (existingTab) {
						set({ activeTab: newTab.value });
					} else {
						const tabWithPinned = { ...newTab, pinned: false };
						const pinnedTabs = tabs.filter((tab) => tab.pinned);
						const unpinnedTabs = tabs.filter((tab) => !tab.pinned);

						set({
							tabs: [...pinnedTabs, ...unpinnedTabs, tabWithPinned],
							activeTab: newTab.value,
						});
					}
				},

				removeTab: (tabValue) => {
					const { tabs, activeTab } = get();
					const filteredTabs = tabs.filter((tab) => tab.value !== tabValue);

					let newActiveTab = activeTab;
					if (activeTab === tabValue && filteredTabs.length > 0) {
						const removedIndex = tabs.findIndex((tab) => tab.value === tabValue);
						const nextIndex = Math.min(removedIndex, filteredTabs.length - 1);
						newActiveTab = filteredTabs[nextIndex]?.value || "";
					} else if (filteredTabs.length === 0) {
						newActiveTab = "";
					}

					set({
						tabs: filteredTabs,
						activeTab: newActiveTab,
					});
				},

				setActiveTab: (tabValue) => {
					set({ activeTab: tabValue });
				},

				togglePin: (tabValue) => {
					const { tabs } = get();
					const updatedTabs = tabs.map((tab) => (tab.value === tabValue ? { ...tab, pinned: !tab.pinned } : tab));

					const sortedTabs = [...updatedTabs].sort((a, b) => {
						// pin的标签页排在前面
						if (a.pinned && !b.pinned) return -1;
						if (!a.pinned && b.pinned) return 1;

						const aIndex = tabs.findIndex((tab) => tab.value === a.value);
						const bIndex = tabs.findIndex((tab) => tab.value === b.value);
						return aIndex - bIndex;
					});

					set({ tabs: sortedTabs });
				},

				removeOtherTabs: (currentTabValue) => {
					const { tabs } = get();
					const remainingTabs = tabs.filter((tab) => tab.value === currentTabValue || tab.pinned);

					set({
						tabs: remainingTabs,
						activeTab: currentTabValue,
					});
				},

				removeAllTabs: () => {
					const { tabs } = get();
					const pinnedTabs = tabs.filter((tab) => tab.pinned);
					const newActiveTab = pinnedTabs.length > 0 ? pinnedTabs[0].value : "";

					set({
						tabs: pinnedTabs,
						activeTab: newActiveTab,
					});
				},

				removeLeftTabs: (tabValue) => {
					const { tabs } = get();
					const targetIndex = tabs.findIndex((tab) => tab.value === tabValue);
					if (targetIndex === -1) return;

					const leftTabs = tabs.slice(0, targetIndex);
					const rightTabs = tabs.slice(targetIndex);
					const pinnedLeftTabs = leftTabs.filter((tab) => tab.pinned);

					set({ tabs: [...pinnedLeftTabs, ...rightTabs] });
				},

				removeRightTabs: (tabValue) => {
					const { tabs } = get();
					const targetIndex = tabs.findIndex((tab) => tab.value === tabValue);
					if (targetIndex === -1) return;

					const leftTabs = tabs.slice(0, targetIndex + 1);
					const rightTabs = tabs.slice(targetIndex + 1);
					const pinnedRightTabs = rightTabs.filter((tab) => tab.pinned);

					set({ tabs: [...leftTabs, ...pinnedRightTabs] });
				},

				reorderTabs: (oldIndex, newIndex) => {
					const { tabs } = get();
					const newTabs = [...tabs];
					const movedTab = newTabs[oldIndex];

					// 计算pin标签页的数量
					const pinnedCount = tabs.filter((tab) => tab.pinned).length;

					// 限制拖拽范围，确保pin标签页只能在pin区域内拖拽，普通标签页只能在普通区域内拖拽
					if (movedTab.pinned) {
						// pin标签页只能在0到pinnedCount-1的范围内拖拽
						newIndex = Math.max(0, Math.min(newIndex, pinnedCount - 1));
					} else {
						// 普通标签页只能在pinnedCount到tabs.length-1的范围内拖拽
						newIndex = Math.max(pinnedCount, Math.min(newIndex, tabs.length - 1));
					}

					// 执行拖拽
					const [draggedTab] = newTabs.splice(oldIndex, 1);
					newTabs.splice(newIndex, 0, draggedTab);
					set({ tabs: newTabs });
				},
			},
		}),
		{
			name: StorageEnum.Tabs || "tabStore",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				tabs: state.tabs,
				activeTab: state.activeTab,
			}),
		},
	),
);

export const useTabs = () => useTabStore((state) => state.tabs);
export const useActiveTab = () => useTabStore((state) => state.activeTab);
export const useTabActions = () => useTabStore((state) => state.actions);

export default useTabStore;
