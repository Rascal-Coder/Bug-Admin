import { useEffect, useState } from "react";
import { useSettings } from "@/store/settingStore";
import { cn } from "@/utils";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
	fixed?: boolean;
	ref?: React.Ref<HTMLElement>;
	wrapCls?: string;
};

export function Header({ className, fixed, children, wrapCls, ...props }: HeaderProps) {
	const [offset, setOffset] = useState(0);
	const { layoutMode } = useSettings();
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
			className={cn(
				"z-50 h-16",
				fixed && "header-fixed peer/header sticky top-0 w-[inherit]",
				offset > 10 && fixed ? "shadow" : "shadow-none",
				(layoutMode === "horizontal" || layoutMode === "mixed") && "border-b border-dashed",
				className,
			)}
			{...props}
		>
			<div
				className={cn(
					"relative flex h-full items-center p-4",
					offset > 10 &&
						fixed &&
						"after:bg-background/20 after:absolute after:inset-0 after:-z-10 after:backdrop-blur-lg",
					wrapCls,
				)}
			>
				{children}
			</div>
		</header>
	);
}
