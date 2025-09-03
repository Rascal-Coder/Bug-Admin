import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
}

interface SortableTabProps {
	tab: Tab;
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

	return (
		<div ref={setNodeRef} style={style} {...attributes}>
			<ContextMenu>
				<ContextMenuTrigger>
					<div
						className={cn(
							"cursor-pointer border border-border gap-1 h-full flex items-center px-2 py-1 rounded-md text-primary select-none",
						)}
						{...listeners}
					>
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
									onCloseTab(tab.value);
								}}
							/>
						) : (
							<Icon
								icon="mdi:pin"
								size={14}
								className="hover:bg-white dark:hover:bg-accent rounded-md"
								onClick={(e) => {
									e.stopPropagation();
									onTogglePin(tab.value);
								}}
							/>
						)}
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent className="w-48">
					<ContextMenuItem onClick={() => onCloseTab(tab.value)}>
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
					<ContextMenuItem onClick={() => onRefreshTab(tab.value)}>
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
					<ContextMenuItem onClick={() => onCloseLeftTabs(tab.value)}>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:arrow-left" size={16} />
							关闭左侧标签页
						</div>
					</ContextMenuItem>

					<ContextMenuItem onClick={() => onCloseRightTabs(tab.value)}>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:arrow-right" size={16} />
							关闭右侧标签页
						</div>
					</ContextMenuItem>

					<ContextMenuSeparator />
					<ContextMenuItem onClick={() => onCloseOthers(tab.value)}>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:close-circle-multiple" size={16} />
							关闭其它标签页
						</div>
					</ContextMenuItem>
					<ContextMenuItem onClick={() => onCloseAll()}>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:close-circle-multiple-outline" size={16} />
							关闭全部标签页
						</div>
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</div>
	);
}
