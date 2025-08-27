import { PinIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { NavProps } from "@/components/nav/types";
import { NavList } from "@/components/nav/vertical/nav-list";
import { Button } from "@/ui/button";
import { cn } from "@/utils";

interface FloatingSubMenuProps {
	data: NavProps["data"];
	selectedGroup: string;
	isVisible: boolean;
	onVisibilityChange: (visible: boolean) => void;
	triggerRef?: React.RefObject<HTMLDivElement | null>; // 触发器元素的引用，用于定位
	className?: string;
}

export function FloatingSubMenu({
	data,
	selectedGroup,
	isVisible,
	onVisibilityChange,
	triggerRef,
	className,
}: FloatingSubMenuProps) {
	const [isPinned, setIsPinned] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [position, setPosition] = useState({ top: 0, left: 0 });
	const menuRef = useRef<HTMLDivElement>(null);

	// 找到选中的主菜单组
	const selectedGroupData = data.find((group) => group.name === selectedGroup);

	// 计算是否应该显示菜单
	const shouldShow = isPinned || isVisible || isHovered;

	// 处理铆钉点击
	const handlePinToggle = () => {
		setIsPinned(!isPinned);
		if (!isPinned) {
			// 如果要固定，确保菜单可见
			onVisibilityChange(true);
		}
	};

	// 处理鼠标进入
	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	// 处理鼠标离开
	const handleMouseLeave = () => {
		setIsHovered(false);
		if (!isPinned) {
			// 延迟隐藏，给用户时间移动鼠标
			setTimeout(() => {
				if (!isPinned && !isHovered) {
					onVisibilityChange(false);
				}
			}, 300);
		}
	};

	// 计算菜单位置
	useEffect(() => {
		if (triggerRef?.current && shouldShow) {
			const triggerRect = triggerRef.current.getBoundingClientRect();
			setPosition({
				top: triggerRect.top,
				left: triggerRect.right,
			});
		}
	}, [triggerRef, shouldShow]);

	// 点击外部关闭菜单（仅在未固定时）
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!isPinned && menuRef.current && !menuRef.current.contains(event.target as Node)) {
				// 也要检查是否点击了触发器
				if (triggerRef?.current && !triggerRef.current.contains(event.target as Node)) {
					onVisibilityChange(false);
				}
			}
		};

		if (shouldShow) {
			document.addEventListener("mousedown", handleClickOutside);
			return () => document.removeEventListener("mousedown", handleClickOutside);
		}
	}, [shouldShow, isPinned, onVisibilityChange, triggerRef]);

	if (!selectedGroupData) {
		return null;
	}

	const menuContent = (
		<div
			ref={menuRef}
			style={{
				position: "absolute",
				top: position.top,
				left: position.left,
				zIndex: 60,
			}}
			className={cn(
				"w-64 h-[calc(100svh-16px)] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
				"rounded-lg shadow-lg transition-all duration-300 ease-in-out",
				shouldShow ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
				className,
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="flex items-center justify-between p-2">
				<span className="font-semibold text-xl text-primary leading-tight ml-4">Bug Admin</span>
				<Button
					variant="ghost"
					size="sm"
					onClick={handlePinToggle}
					className={cn("h-6 w-6 p-0", "text-black dark:text-white", isPinned && "bg-primary/10 text-primary!")}
				>
					<PinIcon className={cn("h-3 w-3 transition-transform", isPinned && "rotate-45")} />
				</Button>
			</div>

			{/* 子菜单内容 */}
			<nav className="flex w-full flex-col gap-1 relative min-w-0 p-2 overflow-auto flex-1">
				<ul className="flex w-full flex-col gap-1">
					{selectedGroupData.items.map((item, index) => (
						<NavList key={item.title || index} data={item} depth={1} />
					))}
				</ul>
			</nav>
		</div>
	);

	// 使用 Portal 将菜单渲染到 body
	return typeof document !== "undefined" ? createPortal(menuContent, document.body) : null;
}
