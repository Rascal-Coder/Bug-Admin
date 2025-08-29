import { X } from "lucide-react";
import { memo } from "react";
import type { NavProps } from "@/components/nav/types";
import { NavList } from "@/components/nav/vertical/nav-list";
import { Button } from "@/ui/button";
import { cn } from "@/utils";

interface FloatingSubMenuProps {
	data: NavProps["data"];
	selectedGroup: string;
	isVisible: boolean;
	onClose: () => void;
	className?: string;
}

export const FloatingSubMenu = memo(function FloatingSubMenu({
	data,
	selectedGroup,
	isVisible,
	onClose,
	className,
}: FloatingSubMenuProps) {
	// 找到选中的主菜单组
	const selectedGroupData = data.find((group) => group.name === selectedGroup);

	// 处理关闭
	const handleClose = () => {
		onClose();
	};

	if (!selectedGroupData || !isVisible) {
		return null;
	}

	return (
		<div
			className={cn(
				"w-64 h-full",
				"border-l border-border",
				"flex flex-col",
				"transition-all duration-300 ease-in-out",
				className,
			)}
		>
			{/* 头部 */}
			<div className="flex items-center justify-between p-3">
				<span className="font-semibold text-foreground text-lg">Bug Admin</span>
				<div className="flex items-center gap-1">
					<Button
						variant="ghost"
						size="sm"
						onClick={handleClose}
						className="h-8 w-8 p-0 cursor-pointer"
						title="关闭菜单"
					>
						<X className="h-4 w-4" />
					</Button>
					{/* {!isPinned && (

					)} */}
				</div>
			</div>

			{/* 子菜单内容 */}
			<nav className="flex-1 overflow-auto p-2">
				<ul className="flex w-full flex-col gap-1">
					{selectedGroupData.items.map((item, index) => (
						<NavList key={item.title || index} data={item} depth={1} />
					))}
				</ul>
			</nav>
		</div>
	);
});
