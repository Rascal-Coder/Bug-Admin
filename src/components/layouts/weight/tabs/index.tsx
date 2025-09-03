import { useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "@/ui/context-menu";

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
	return (
		<div className="flex-1 px-3 flex items-center justify-between">
			<ScrollArea className="whitespace-nowrap px-2">
				<div className="flex items-center gap-2">
					{tabs.map((tab) => (
						<ContextMenu key={tab.value}>
							<ContextMenuTrigger>
								<div className="cursor-pointer border border-border gap-1 h-full flex items-center px-2 py-1 rounded-md bg-primary/hover text-primary">
									{/* 渲染icon */}
									<Icon icon="mdi:menu" size={20} />
									{tab.label}
									{!tab.pinned ? (
										<Icon
											icon="mdi:close"
											size={14}
											className="hover:bg-white dark:hover:bg-accent rounded-md"
											onClick={(e) => {
												e.stopPropagation();
												handleCloseTab(tab.value);
											}}
										/>
									) : (
										<Icon
											icon="mdi:pin"
											size={14}
											className={`hover:bg-white dark:hover:bg-accent rounded-md`}
											onClick={(e) => {
												e.stopPropagation();
												handleTogglePin(tab.value);
											}}
										/>
									)}
								</div>
							</ContextMenuTrigger>
							<ContextMenuContent className="w-48">
								<ContextMenuItem onClick={() => handleCloseTab(tab.value)}>
									<Icon icon="mdi:close" size={16} />
									关闭
								</ContextMenuItem>
								<ContextMenuItem onClick={() => handleTogglePin(tab.value)}>
									<Icon icon={tab.pinned ? "mdi:pin-off" : "mdi:pin"} size={16} />
									{tab.pinned ? "取消固定" : "固定"}
								</ContextMenuItem>
								<ContextMenuItem onClick={() => handleSetFullscreen()}>
									<Icon icon="mdi:fullscreen" size={16} />
									最大化
								</ContextMenuItem>
								<ContextMenuItem onClick={() => handleRefreshTab(tab.value)}>
									<Icon icon="mdi:refresh" size={16} />
									重新加载
								</ContextMenuItem>
								<ContextMenuItem onClick={() => handleOpenInNewWindow(tab.value)}>
									<Icon icon="mdi:open-in-new" size={16} />
									在新窗口打开
								</ContextMenuItem>
								<ContextMenuSeparator />
								<ContextMenuItem onClick={() => handleCloseLeftTabs(tab.value)}>
									<Icon icon="mdi:arrow-left" size={16} />
									关闭左侧标签页
								</ContextMenuItem>
								<ContextMenuItem onClick={() => handleCloseRightTabs(tab.value)}>
									<Icon icon="mdi:arrow-right" size={16} />
									关闭右侧标签页
								</ContextMenuItem>
								<ContextMenuSeparator />
								<ContextMenuItem onClick={() => handleCloseOthers(tab.value)}>
									<Icon icon="mdi:close-circle-multiple" size={16} />
									关闭其它标签页
								</ContextMenuItem>
								<ContextMenuItem onClick={() => handleCloseAll()}>
									<Icon icon="mdi:close-circle-multiple-outline" size={16} />
									关闭全部标签页
								</ContextMenuItem>
							</ContextMenuContent>
						</ContextMenu>
					))}
				</div>
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
