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
						// 如果tab已存在，只需激活它
						set({ activeTab: newTab.value });
					} else {
						// 添加新tab
						const tabWithPinned = { ...newTab, pinned: false };
						set({
							tabs: [...tabs, tabWithPinned],
							activeTab: newTab.value,
						});
					}
				},

				removeTab: (tabValue) => {
					const { tabs, activeTab } = get();
					const filteredTabs = tabs.filter((tab) => tab.value !== tabValue);

					let newActiveTab = activeTab;
					if (activeTab === tabValue && filteredTabs.length > 0) {
						// 如果关闭的是当前激活的tab，激活相邻的tab
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
					set({ tabs: updatedTabs });
				},

				removeOtherTabs: (currentTabValue) => {
					const { tabs } = get();
					const currentTab = tabs.find((tab) => tab.value === currentTabValue);
					const pinnedTabs = tabs.filter((tab) => tab.pinned && tab.value !== currentTabValue);

					if (currentTab) {
						set({
							tabs: [currentTab, ...pinnedTabs],
							activeTab: currentTabValue,
						});
					}
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
					const [movedTab] = newTabs.splice(oldIndex, 1);
					newTabs.splice(newIndex, 0, movedTab);
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
