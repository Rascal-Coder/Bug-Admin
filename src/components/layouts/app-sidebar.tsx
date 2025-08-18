// import { Link } from "react-router";

import { ScrollArea } from "@/ui/scroll-area";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/ui/sidebar";
import { cn } from "@/utils";
import { NavVertical } from "../nav/vertical";
import { frontendNavData } from "./nav-data/nav-data-frontend";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" variant="floating" {...props}>
			<SidebarHeader>
				<div>SidebarHeader</div>
			</SidebarHeader>
			<SidebarContent>
				<ScrollArea className={cn("h-[calc(100vh-var(--layout-header-height))] px-2 py-2 bg-background")}>
					<NavVertical data={frontendNavData} />
				</ScrollArea>
			</SidebarContent>
			<SidebarFooter>
				<div>SidebarFooter</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
