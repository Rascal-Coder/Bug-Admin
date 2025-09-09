import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { m } from "motion/react";
import { Icon } from "@/components/icon";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "@/ui/context-menu";
import { cn } from "@/utils";

interface Tab {
	label: string;
	value: string;
	pinned: boolean;
	path: string;
	icon?: string;
	component?: string;
}

interface SortableTabProps {
	tab: Tab;
	isActive?: boolean;
	totalTabs?: number;
	allTabs?: Tab[];
	onTabClick?: (tabValue: string) => void;
	onCloseTab: (tabValue: string) => void;
	onTogglePin: (tabValue: string) => void;
	onCloseOthers: (currentTabValue: string) => void;
	onCloseAll: () => void;
	onRefreshTab: (tabValue: string) => void;
	onSetFullscreen: () => void;
	onOpenInNewWindow: (tabValue: string) => void;
	onCloseLeftTabs: (tabValue: string) => void;
	onCloseRightTabs: (tabValue: string) => void;
}

export default function SortableTab({
	tab,
	isActive = false,
	totalTabs = 1,
	allTabs = [],
	onTabClick,
	onCloseTab,
	onTogglePin,
	onCloseOthers,
	onCloseAll,
	onRefreshTab,
	onSetFullscreen,
	onOpenInNewWindow,
	onCloseLeftTabs,
	onCloseRightTabs,
}: SortableTabProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tab.value });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		zIndex: isDragging ? 1000 : 1,
	};

	// 计算菜单项的可用性
	const currentTabIndex = allTabs.findIndex((t) => t.value === tab.value);

	// 计算左侧是否有可关闭的标签页
	const hasCloseableLeftTabs = () => {
		if (!isActive || currentTabIndex <= 0) return false;
		const leftTabs = allTabs.slice(0, currentTabIndex);
		return leftTabs.some((t) => !t.pinned);
	};

	// 计算右侧是否有可关闭的标签页
	const hasCloseableRightTabs = () => {
		if (!isActive || currentTabIndex >= allTabs.length - 1) return false;
		const rightTabs = allTabs.slice(currentTabIndex + 1);
		return rightTabs.some((t) => !t.pinned);
	};

	// 计算是否有其他可关闭的标签页
	const hasOtherCloseableTabs = () => {
		if (!isActive) return false;
		const otherTabs = allTabs.filter((t) => t.value !== tab.value);
		return otherTabs.some((t) => !t.pinned);
	};

	// 计算是否有可关闭的标签页（用于关闭全部标签页按钮）
	const hasCloseableTabsForCloseAll = () => {
		return allTabs.some((t) => !t.pinned);
	};

	return (
		<m.div
			initial={{ x: -120, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -10, opacity: 0 }}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 30,
			}}
			ref={setNodeRef}
			style={style}
			{...attributes}
		>
			<ContextMenu>
				<ContextMenuTrigger>
					<m.div
						className={cn(
							"cursor-pointer border border-border gap-1 h-full flex items-center px-2 py-1 rounded-md text-primary select-none transition-colors",
							isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent",
						)}
						{...listeners}
						onClick={() => onTabClick?.(tab.value)}
						whileTap={{ scale: 0.92 }}
					>
						{/* 渲染icon */}
						{tab.icon ? <Icon icon={tab.icon} size={20} /> : <Icon icon="mdi:menu" size={20} />}
						{tab.label}
						{!tab.pinned && totalTabs > 1 ? (
							<Icon
								icon="mdi:close"
								size={18}
								className={cn(
									"p-0.5 rounded transition-colors",
									isActive
										? "text-primary-foreground/70! hover:text-primary-foreground! hover:bg-primary-foreground/10!"
										: "hover:text-foreground! hover:bg-foreground/10!",
								)}
								onClick={(e) => {
									e.stopPropagation();
									onCloseTab(tab.value);
								}}
							/>
						) : tab.pinned ? (
							<Icon
								icon="mdi:pin"
								size={18}
								className={cn(
									"p-0.5 rounded transition-colors",
									isActive
										? "text-primary-foreground/70! hover:text-primary-foreground! hover:bg-primary-foreground/10!"
										: "hover:text-foreground! hover:bg-foreground/10!",
								)}
								onClick={(e) => {
									e.stopPropagation();
									onTogglePin(tab.value);
								}}
							/>
						) : null}
					</m.div>
				</ContextMenuTrigger>
				<ContextMenuContent className="w-48">
					<ContextMenuItem onClick={() => onCloseTab(tab.value)} disabled={tab.pinned || totalTabs <= 1}>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:close" size={16} />
							关闭
						</div>
					</ContextMenuItem>
					<ContextMenuItem onClick={() => onTogglePin(tab.value)}>
						<div className="flex items-center gap-1">
							<Icon icon={tab.pinned ? "mdi:pin-off" : "mdi:pin"} size={16} />
							{tab.pinned ? "取消固定" : "固定"}
						</div>
					</ContextMenuItem>
					<ContextMenuItem onClick={() => onSetFullscreen()}>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:fullscreen" size={16} />
							最大化
						</div>
					</ContextMenuItem>
					<ContextMenuItem onClick={() => onRefreshTab(tab.value)} disabled={!isActive}>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:refresh" size={16} />
							重新加载
						</div>
					</ContextMenuItem>
					<ContextMenuItem onClick={() => onOpenInNewWindow(tab.value)}>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:open-in-new" size={16} />
							在新窗口打开
						</div>
					</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem onClick={() => onCloseLeftTabs(tab.value)} disabled={!hasCloseableLeftTabs()}>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:arrow-left" size={16} />
							关闭左侧标签页
						</div>
					</ContextMenuItem>

					<ContextMenuItem onClick={() => onCloseRightTabs(tab.value)} disabled={!hasCloseableRightTabs()}>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:arrow-right" size={16} />
							关闭右侧标签页
						</div>
					</ContextMenuItem>

					<ContextMenuSeparator />
					<ContextMenuItem onClick={() => onCloseOthers(tab.value)} disabled={!hasOtherCloseableTabs()}>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:close-circle-multiple" size={16} />
							关闭其它标签页
						</div>
					</ContextMenuItem>
					<ContextMenuItem onClick={() => onCloseAll()} disabled={!hasCloseableTabsForCloseAll()}>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:close-circle-multiple-outline" size={16} />
							关闭全部标签页
						</div>
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</m.div>
	);
}
