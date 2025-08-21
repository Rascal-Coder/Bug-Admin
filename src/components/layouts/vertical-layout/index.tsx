import Cookies from "js-cookie";
import { type ReactNode, useMemo } from "react";
import { Breadcrumb } from "@/components/layouts/weight/breadcrumb";
import { Header } from "@/components/layouts/weight/header";
import { Main } from "@/components/layouts/weight/main";
import { ThemeSwitch } from "@/components/layouts/weight/themeswitch";
import { SidebarInset, SidebarProvider } from "@/ui/sidebar";
import { cn } from "@/utils";
import { AppSidebar } from "./app-sidebar";

export default function VerticalLayout({ children }: { children: ReactNode }) {
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
			<SidebarInset
				className={cn(
					// If layout is fixed, set the height
					// to 100svh to prevent overflow
					"has-[[data-layout=fixed]]:h-svh",

					// If layout is fixed and sidebar is inset,
					"peer-data-[variant=inset]:has-[[data-layout=fixed]]:h-[calc(100svh-(var(--spacing)*5))]",

					// Set content container, so we can use container queries
					"@container/content",
					// border
					"peer-data-[variant=floating]:border-none",
					// font color
					"text-black dark:text-white",
				)}
			>
				<Header fixed>
					<Breadcrumb />
					<ThemeSwitch />
				</Header>

				{/* fluid | fixed */}
				<Main fixed>{children}</Main>
			</SidebarInset>
		</SidebarProvider>
	);
}
