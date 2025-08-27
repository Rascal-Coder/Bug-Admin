import Cookies from "js-cookie";
import { useMemo } from "react";
import { SidebarInset, SidebarProvider } from "@/ui/sidebar";
import { cn } from "@/utils";
import { Header } from "../weight/header";
import { Main } from "../weight/main";

interface SidebarWrapperProps {
	sidebarSlot: React.ReactNode;
	headerLeftSlot: React.ReactNode;
	headerRightSlot: React.ReactNode;
	insetClassName?: string;
	style?: React.CSSProperties;
}

export default function SidebarWrapper({
	sidebarSlot,
	headerLeftSlot,
	headerRightSlot,
	insetClassName,
	style,
}: SidebarWrapperProps) {
	const defaultOpen = useMemo(() => {
		const cookieValue = Cookies.get("sidebar_state");
		return cookieValue !== "false";
	}, []);
	return (
		<SidebarProvider
			defaultOpen={defaultOpen}
			style={{ "--sidebar-width": "var(--layout-nav-width)", ...style } as React.CSSProperties}
		>
			{sidebarSlot}
			<SidebarInset
				className={cn(
					// If layout is fixed and sidebar is inset,
					"peer-data-[variant=inset]:has-[[data-layout=fixed]]:h-[calc(100svh-(var(--spacing)*5))]",

					// Set content container, so we can use container queries
					"@container/content",
					// border
					"peer-data-[variant=floating]:border-none",
					// font color
					"text-black dark:text-white",
					insetClassName,
				)}
			>
				<Header fixed>
					{headerLeftSlot}
					<div data-slot="right" className="flex flex-1 justify-end items-center gap-2 sm:gap-3">
						{headerRightSlot}
					</div>
				</Header>
				<Main />
			</SidebarInset>
		</SidebarProvider>
	);
}
