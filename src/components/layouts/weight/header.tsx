import { useEffect, useState } from "react";
import { useSettings } from "@/store/settingStore";
// import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
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
				"z-50 h-30 border-b border-dashed flex flex-col justify-between",
				fixed &&
					"header-fixed peer/header sticky top-0 w-[inherit] after:bg-background/20 after:absolute after:inset-0 after:-z-10 after:backdrop-blur-lg",
				fixed && sidebarMode === "inset" && "after:rounded-t-xl",
				offset > 10 && fixed ? "shadow" : "shadow-none",
				className,
			)}
			{...props}
		>
			<div className={cn("relative flex h-16 items-center p-4 border-b border-border", offset > 10 && wrapCls)}>
				{children}
			</div>
			<Tabs />
		</header>
	);
}
