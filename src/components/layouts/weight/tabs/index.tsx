import { useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";

export default function Tabs() {
	const [tabs] = useState([
		{
			label: "tab-item-1",
			value: "tab-item-1",
		},

		{
			label: "tab-item-2",
			value: "tab-item-2",
		},
		{
			label: "tab-item-3",
			value: "tab-item-3",
		},
		{
			label: "tab-item-4",
			value: "tab-item-4",
		},
		{
			label: "tab-item-5",
			value: "tab-item-5",
		},
		{
			label: "tab-item-6",
			value: "tab-item-6",
		},
		{
			label: "tab-item-7",
			value: "tab-item-7",
		},
	]);
	return (
		<div className="flex-1 px-3 flex items-center justify-between">
			<ScrollArea className="whitespace-nowrap px-2">
				<div className="flex items-center gap-2">
					{tabs.map((tab) => (
						<div
							key={tab.value}
							className="cursor-pointer border border-border gap-1 h-full flex items-center px-2 py-1 rounded-md bg-primary/hover text-primary"
						>
							{/* 渲染icon */}
							<Icon icon="mdi:menu" size={20} />
							{tab.label}
							<Icon icon="mdi:close" size={14} className="hover:bg-white dark:hover:bg-accent rounded-md" />
							<Icon icon="mdi:pin" size={14} className="hover:bg-white dark:hover:bg-accent rounded-md" />
						</div>
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
