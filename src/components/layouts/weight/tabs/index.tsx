import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Icon } from "@/components/icon";
import { useActiveTab, useTabActions, useTabs } from "@/store/tabStore";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { getDefaultRoute, getMenuInfoByPath } from "@/utils/menu";
import SortableContainer from "./components/sortable-container";
import SortableTab from "./components/sortable-tab";

export default function Tabs() {
	const tabs = useTabs();
	const activeTab = useActiveTab();
	const {
		addTab,
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
	const location = useLocation();

	// 初始化和同步当前路由和活动tab
	useEffect(() => {
		const currentPath = location.pathname;

		// 如果是根路径，重定向到默认路由
		if (currentPath === "/" || currentPath === "") {
			const defaultRoute = getDefaultRoute();
			if (defaultRoute) {
				navigate(defaultRoute.path, { replace: true });
			}
			return;
		}

		const existingTab = tabs.find((tab) => tab.path === currentPath);

		if (existingTab) {
			// 如果tab已存在，只需激活它
			if (activeTab !== existingTab.value) {
				setActiveTab(existingTab.value);
			}
		} else {
			// 如果tab不存在，尝试创建
			const menuInfo = getMenuInfoByPath(currentPath);

			if (menuInfo) {
				// 根据菜单信息创建tab
				addTab({
					label: menuInfo.title,
					value: currentPath,
					path: currentPath,
					icon: typeof menuInfo.icon === "string" ? menuInfo.icon : undefined,
				});
			} else if (tabs.length === 0) {
				// 如果没有找到菜单信息且没有其他tab，创建默认tab
				const defaultRoute = getDefaultRoute();
				if (defaultRoute) {
					addTab({
						label: defaultRoute.title,
						value: defaultRoute.path,
						path: defaultRoute.path,
						icon: typeof defaultRoute.icon === "string" ? defaultRoute.icon : undefined,
					});
					// 导航到默认路由
					navigate(defaultRoute.path, { replace: true });
				}
			}
		}
	}, [location.pathname, tabs, activeTab, setActiveTab, addTab, navigate]);

	// 处理tab操作
	const handleCloseTab = (tabValue: string) => {
		const remainingTabs = tabs.filter((tab) => tab.value !== tabValue);
		const isClosingActiveTab = activeTab === tabValue;

		removeTab(tabValue);

		// 如果关闭后没有tab了，导航到默认页面
		if (remainingTabs.length === 0) {
			const defaultRoute = getDefaultRoute();
			if (defaultRoute) {
				navigate(defaultRoute.path, { replace: true });
			}
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
	};

	const handleCloseAll = () => {
		removeAllTabs();

		// 导航到默认页面
		const defaultRoute = getDefaultRoute();
		if (defaultRoute) {
			navigate(defaultRoute.path, { replace: true });
		}
	};

	const handleTogglePin = (tabValue: string) => {
		togglePin(tabValue);
	};

	const handleRefreshTab = (tabValue: string) => {
		// 找到对应的tab并重新加载页面
		const tab = tabs.find((t) => t.value === tabValue);
		if (tab) {
			window.location.reload();
		}
	};

	const handleSetFullscreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
	};

	const handleOpenInNewWindow = (tabValue: string) => {
		const tab = tabs.find((t) => t.value === tabValue);
		if (tab) {
			window.open(tab.path, "_blank");
		}
	};

	const handleCloseLeftTabs = (tabValue: string) => {
		removeLeftTabs(tabValue);
	};

	const handleCloseRightTabs = (tabValue: string) => {
		removeRightTabs(tabValue);
	};

	// 处理tab点击
	const handleTabClick = (tabValue: string) => {
		const tab = tabs.find((t) => t.value === tabValue);
		if (tab) {
			setActiveTab(tabValue);
			navigate(tab.path);
		}
	};

	// 处理标签重新排序
	const handleSortEnd = (oldIndex: number, newIndex: number) => {
		reorderTabs(oldIndex, newIndex);
	};

	// 为 dnd-kit 准备数据，需要 key 属性
	const tabsWithKeys = tabs.map((tab) => ({
		...tab,
		key: tab.value,
	}));

	// 渲染拖拽覆盖层的组件
	const renderOverlay = (activeId: string | number) => {
		const activeTabData = tabs.find((tab) => tab.value === activeId);
		if (!activeTabData) return null;

		return (
			<div className="cursor-pointer border border-border gap-1 h-full flex items-center px-2 py-1 rounded-md bg-primary/hover text-primary opacity-90 shadow-lg">
				{activeTabData.icon && <Icon icon={activeTabData.icon} size={20} />}
				{activeTabData.label}
				{!activeTabData.pinned ? <Icon icon="mdi:close" size={14} /> : <Icon icon="mdi:pin" size={14} />}
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
								isActive={activeTab === tab.value}
								totalTabs={tabs.length}
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
						))}
					</div>
				</SortableContainer>
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
				<div className="h-full flex items-center justify-center border border-border rounded-md" title="更多设置">
					<Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
						<Icon icon="mdi:dots-vertical" size={20} />
					</Button>
				</div>
			</div>
		</div>
	);
}
