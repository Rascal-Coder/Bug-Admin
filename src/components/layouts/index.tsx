import Cookies from "js-cookie";
import type { ReactNode } from "react";
import { SidebarProvider } from "@/ui/sidebar";
import { cn } from "@/utils";
import { AppSidebar } from "./app-sidebar";

export default function Layouts({ children }: { children: ReactNode }) {
	const defaultOpen = Cookies.get("sidebar_state") !== "false";
	return (
		<SidebarProvider defaultOpen={defaultOpen}>
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
