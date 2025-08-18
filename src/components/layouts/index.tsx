import Cookies from "js-cookie";
import { type ReactNode, useMemo } from "react";
import { SidebarProvider } from "@/ui/sidebar";
import { cn } from "@/utils";
import { AppSidebar } from "./app-sidebar";

export default function Layouts({ children }: { children: ReactNode }) {
	// const defaultOpen = Cookies.get("sidebar_state") !== "false";
	const defaultOpen = useMemo(() => {
		const cookieValue = Cookies.get("sidebar_state");
		return cookieValue !== "false";
	}, []);
	return (
		<SidebarProvider
			defaultOpen={defaultOpen}
			style={{ "--sidebar-width": "var(--layout-nav-width)" } as React.CSSProperties}
		>
			<AppSidebar />
			<div
				id="content"
				className={cn(
					"ml-auto w-full max-w-full",
					"peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
					"peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
					"sm:transition-[width] sm:duration-200 sm:ease-linear",
					"flex h-svh flex-col",
					"group-data-[scroll-locked=1]/body:h-full",
					"has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh",
				)}
			>
				{children}
			</div>
		</SidebarProvider>
	);
}
