import { AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { MotionContainer } from "@/components/animate";
import { Icon } from "@/components/icon";
import * as Sortable from "@/components/sortable";
import { useSetShowMaximize, useShowMaximize } from "@/store/settingStore";
import { useActiveTab, useTabActions, useTabs } from "@/store/tabStore";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import SortableTab from "./components/sortable-tab";

export default function Tabs() {
	const tabs = useTabs();
	const activeTab = useActiveTab();
	const {
		removeTab,
		togglePin,
		removeOtherTabs,
		removeAllTabs,
		removeLeftTabs,
		removeRightTabs,
		reorderTabs,
		setActiveTab,
	} = useTabActions();
	const navigate = useNavigate();
	const showMaximize = useShowMaximize();
	const setShowMaximize = useSetShowMaximize();
	// 处理tab操作
	const handleCloseTab = (tabValue: string) => {
		const remainingTabs = tabs.filter((tab) => tab.value !== tabValue);
		const isClosingActiveTab = activeTab === tabValue;

		removeTab(tabValue);

		// 如果关闭后没有tab了，导航到默认页面
		if (remainingTabs.length === 0) {
			navigate("/workbench", { replace: true });
		} else if (isClosingActiveTab && remainingTabs.length > 0) {
			// 如果关闭的是当前激活的tab，导航到新的激活tab
			const closedIndex = tabs.findIndex((tab) => tab.value === tabValue);
			const nextIndex = Math.min(closedIndex, remainingTabs.length - 1);
			const nextTab = remainingTabs[nextIndex];
			if (nextTab) {
				navigate(nextTab.path);
			}
		}
	};

	const handleCloseOthers = (currentTabValue: string) => {
		removeOtherTabs(currentTabValue);

		// 如果当前激活的tab不是保留的tab，需要导航到保留的tab
		if (activeTab !== currentTabValue) {
			const tab = tabs.find((t) => t.value === currentTabValue);
			if (tab) {
				navigate(tab.path);
			}
		}
	};

	const handleCloseAll = () => {
		// 获取关闭前的状态
		const pinnedTabs = tabs.filter((tab) => tab.pinned);
		const currentTab = tabs.find((tab) => tab.value === activeTab);
		const isCurrentTabPinned = currentTab?.pinned || false;

		removeAllTabs();

		if (pinnedTabs.length > 0) {
			if (isCurrentTabPinned) {
				return;
			} else {
				const firstPinnedTab = pinnedTabs[0];
				if (firstPinnedTab) {
					navigate(firstPinnedTab.path);
				}
			}
		} else {
			navigate("/workbench", { replace: true });
		}
	};

	const handleTogglePin = (tabValue: string) => {
		togglePin(tabValue);
	};

	const handleRefreshTab = (tabValue: string) => {
		const tab = tabs.find((t) => t.value === tabValue);
		if (tab) {
			// window.location.reload();
		}
	};

	const handleSetFullscreen = () => {
		setShowMaximize(!showMaximize);
	};

	const handleOpenInNewWindow = (tabValue: string) => {
		const tab = tabs.find((t) => t.value === tabValue);
		if (tab) {
			window.open(tab.path, "_blank");
		}
	};

	const handleCloseLeftTabs = (tabValue: string) => {
		// 获取当前活动tab是否会被关闭
		const currentTabIndex = tabs.findIndex((tab) => tab.value === activeTab);
		const targetTabIndex = tabs.findIndex((tab) => tab.value === tabValue);
		const activeTabWillBeRemoved = currentTabIndex < targetTabIndex && !tabs[currentTabIndex]?.pinned;

		removeLeftTabs(tabValue);

		// 如果当前活动的tab被关闭了，需要导航到目标tab
		if (activeTabWillBeRemoved) {
			const tab = tabs.find((t) => t.value === tabValue);
			if (tab) {
				navigate(tab.path);
			}
		}
	};

	const handleCloseRightTabs = (tabValue: string) => {
		// 获取当前活动tab是否会被关闭
		const currentTabIndex = tabs.findIndex((tab) => tab.value === activeTab);
		const targetTabIndex = tabs.findIndex((tab) => tab.value === tabValue);
		const activeTabWillBeRemoved = currentTabIndex > targetTabIndex && !tabs[currentTabIndex]?.pinned;

		removeRightTabs(tabValue);

		// 如果当前活动的tab被关闭了，需要导航到目标tab
		if (activeTabWillBeRemoved) {
			const tab = tabs.find((t) => t.value === tabValue);
			if (tab) {
				navigate(tab.path);
			}
		}
	};

	// 处理tab点击
	const handleTabClick = (tabValue: string) => {
		const tab = tabs.find((t) => t.value === tabValue);
		if (tab) {
			setActiveTab(tabValue);
			navigate(tab.path);
		}
	};

	return (
		<div className="flex-1 px-3 flex items-center justify-between">
			<ScrollArea className="whitespace-nowrap px-2">
				<Sortable.Root
					getItemValue={(item) => item.value}
					value={tabs}
					onMove={(event) => {
						reorderTabs(event.activeIndex, event.overIndex);
					}}
					orientation="mixed"
				>
					<Sortable.Content>
						<MotionContainer className="flex items-center gap-2">
							<AnimatePresence initial={false} mode="sync">
								{tabs.map((tab) => (
									<Sortable.Item key={tab.value} value={tab.value} asHandle>
										<SortableTab
											key={tab.value}
											tab={tab}
											isActive={activeTab === tab.value}
											totalTabs={tabs.length}
											allTabs={tabs}
											onTabClick={handleTabClick}
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
									</Sortable.Item>
								))}
							</AnimatePresence>
						</MotionContainer>
					</Sortable.Content>
				</Sortable.Root>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<div className="flex items-center gap-1 ml-1">
				<div className="h-full flex items-center justify-center border border-border rounded-md" title="刷新当前标签">
					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-8 p-0 hover:bg-accent"
						onClick={() => activeTab && handleRefreshTab(activeTab)}
					>
						<Icon icon="mdi:refresh" size={20} />
					</Button>
				</div>
				<div className="h-full flex items-center justify-center border border-border rounded-md" title="全屏">
					<Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent" onClick={handleSetFullscreen}>
						<Icon icon="mdi:fullscreen" size={20} />
					</Button>
				</div>
			</div>
		</div>
	);
}
