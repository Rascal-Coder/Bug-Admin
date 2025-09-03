import { useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import SortableContainer from "./components/sortable-container";
import SortableTab from "./components/sortable-tab";

export default function Tabs() {
	const [tabs, setTabs] = useState([
		{
			label: "tab-item-1",
			value: "tab-item-1",
			pinned: false,
		},

		{
			label: "tab-item-2",
			value: "tab-item-2",
			pinned: false,
		},
		{
			label: "tab-item-3",
			value: "tab-item-3",
			pinned: false,
		},
		{
			label: "tab-item-4",
			value: "tab-item-4",
			pinned: false,
		},
		{
			label: "tab-item-5",
			value: "tab-item-5",
			pinned: false,
		},
		{
			label: "tab-item-6",
			value: "tab-item-6",
			pinned: false,
		},
		{
			label: "tab-item-7",
			value: "tab-item-7",
			pinned: false,
		},
	]);

	// 处理tab操作
	const handleCloseTab = (tabValue: string) => {
		console.log("close tab", tabValue);
	};

	const handleCloseOthers = (currentTabValue: string) => {
		console.log("close others", currentTabValue);
	};

	const handleCloseAll = () => {
		console.log("close all");
	};

	const handleTogglePin = (tabValue: string) => {
		setTabs(tabs.map((tab) => (tab.value === tabValue ? { ...tab, pinned: !tab.pinned } : tab)));
	};

	const handleRefreshTab = (tabValue: string) => {
		console.log("refresh tab", tabValue);
	};

	const handleSetFullscreen = () => {
		console.log("set fullscreen");
	};

	const handleOpenInNewWindow = (tabValue: string) => {
		console.log("open in new window", tabValue);
	};

	const handleCloseLeftTabs = (tabValue: string) => {
		console.log("close left tabs", tabValue);
	};

	const handleCloseRightTabs = (tabValue: string) => {
		console.log("close right tabs", tabValue);
	};

	// 处理标签重新排序
	const handleSortEnd = (oldIndex: number, newIndex: number) => {
		const newTabs = [...tabs];
		const [movedTab] = newTabs.splice(oldIndex, 1);
		newTabs.splice(newIndex, 0, movedTab);
		setTabs(newTabs);
	};

	// 为 dnd-kit 准备数据，需要 key 属性
	const tabsWithKeys = tabs.map((tab) => ({
		...tab,
		key: tab.value,
	}));

	// 渲染拖拽覆盖层的组件
	const renderOverlay = (activeId: string | number) => {
		const activeTab = tabs.find((tab) => tab.value === activeId);
		if (!activeTab) return null;

		return (
			<div className="cursor-pointer border border-border gap-1 h-full flex items-center px-2 py-1 rounded-md bg-primary/hover text-primary opacity-90 shadow-lg">
				<Icon icon="mdi:menu" size={20} />
				{activeTab.label}
				{!activeTab.pinned ? (
					<Icon icon="mdi:close" size={14} className="hover:bg-white dark:hover:bg-accent rounded-md" />
				) : (
					<Icon icon="mdi:pin" size={14} className="hover:bg-white dark:hover:bg-accent rounded-md" />
				)}
			</div>
		);
	};
	return (
		<div className="flex-1 px-3 flex items-center justify-between">
			<ScrollArea className="whitespace-nowrap px-2">
				<SortableContainer items={tabsWithKeys} onSortEnd={handleSortEnd} renderOverlay={renderOverlay}>
					<div className="flex items-center gap-2">
						{tabs.map((tab) => (
							<SortableTab
								key={tab.value}
								tab={tab}
								onCloseTab={handleCloseTab}
								onTogglePin={handleTogglePin}
								onCloseOthers={handleCloseOthers}
								onCloseAll={handleCloseAll}
								onRefreshTab={handleRefreshTab}
								onSetFullscreen={handleSetFullscreen}
								onOpenInNewWindow={handleOpenInNewWindow}
								onCloseLeftTabs={handleCloseLeftTabs}
								onCloseRightTabs={handleCloseRightTabs}
							/>
						))}
					</div>
				</SortableContainer>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<div className="flex items-center gap-1 ml-1">
				<div className="h-full flex items-center justify-center border border-border rounded-md" title="刷新当前标签">
					<Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
						<Icon icon="mdi:refresh" size={20} />
					</Button>
				</div>
				<div className="h-full flex items-center justify-center border border-border rounded-md" title="全屏">
					<Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
						<Icon icon="mdi:fullscreen" size={20} />
					</Button>
				</div>
				<div className="h-full flex items-center justify-center border border-border rounded-md" title="更多设置">
					<Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
						<Icon icon="mdi:dots-vertical" size={20} />
					</Button>
				</div>
			</div>
		</div>
	);
}
