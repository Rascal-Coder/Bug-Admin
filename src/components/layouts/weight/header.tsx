import { useEffect, useState } from "react";
import { useSettings, useShowMaximize } from "@/store/settingStore";
import { cn } from "@/utils";
import Tabs from "./tabs";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
	fixed?: boolean;
	ref?: React.Ref<HTMLElement>;
	wrapCls?: string;
};

export function Header({ className, fixed, children, wrapCls, ...props }: HeaderProps) {
	const [offset, setOffset] = useState(0);
	const { sidebarMode } = useSettings();
	const showMaximize = useShowMaximize();
	useEffect(() => {
		const onScroll = () => {
			setOffset(document.body.scrollTop || document.documentElement.scrollTop);
		};

		// Add scroll listener to the body
		document.addEventListener("scroll", onScroll, { passive: true });

		// Clean up the event listener on unmount
		return () => document.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			data-slot="bug-admin-header"
			className={cn(
				"z-50 border-b border-dashed flex flex-col justify-between",
				fixed &&
					"header-fixed peer/header sticky top-0 w-[inherit] after:bg-background/20 after:absolute after:inset-0 after:-z-10 after:backdrop-blur-lg",
				fixed && sidebarMode === "inset" && "after:rounded-t-xl",
				offset > 10 && fixed ? "shadow" : "shadow-none",
				showMaximize ? "h-14" : "h-30",
				className,
			)}
			{...props}
		>
			<div
				className={cn(
					"relative flex items-center border-b border-border overflow-hidden transition-all duration-300 ease-in-out",
					offset > 10 && wrapCls,
					showMaximize ? "h-0 opacity-0 p-0 border-b-0" : "h-16 opacity-100 p-4",
				)}
			>
				{children}
			</div>
			<Tabs />
		</header>
	);
}
