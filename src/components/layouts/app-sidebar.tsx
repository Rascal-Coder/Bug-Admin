import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/ui/sidebar";
import { NavVertical } from "../nav/vertical";
import { frontendNavData } from "./nav-data/nav-data-frontend";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" variant="floating" {...props}>
			<SidebarHeader>
				<div>SidebarHeader</div>
			</SidebarHeader>
			<SidebarContent>
				<NavVertical data={frontendNavData} />
			</SidebarContent>
			<SidebarFooter>
				<div>SidebarFooter</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
