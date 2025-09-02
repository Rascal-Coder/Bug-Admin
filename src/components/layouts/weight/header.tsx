import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { cn } from "@/utils";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
	fixed?: boolean;
	ref?: React.Ref<HTMLElement>;
	wrapCls?: string;
};

export function Header({ className, fixed, children, wrapCls, ...props }: HeaderProps) {
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
	const [offset, setOffset] = useState(0);
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
				"z-50 h-28 border-b border-dashed flex flex-col justify-between",
				fixed && "header-fixed peer/header sticky top-0 w-[inherit]",
				offset > 10 && fixed ? "shadow" : "shadow-none",
				className,
			)}
			{...props}
		>
			<div
				className={cn(
					"relative flex h-16 items-center p-4 border-b border-border",
					offset > 10 &&
						fixed &&
						"after:bg-background/20 after:absolute after:inset-0 after:-z-10 after:backdrop-blur-lg",
					wrapCls,
				)}
			>
				{children}
			</div>
			<div className="flex-1 px-3 flex items-center">
				<ScrollArea className="whitespace-nowrap px-2">
					<div className="flex items-center gap-2">
						{tabs.map((tab) => (
							<div key={tab.value} className="h-full flex items-center px-2 py-1 rounded-md bg-primary">
								{tab.label}
							</div>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</header>
	);
}
