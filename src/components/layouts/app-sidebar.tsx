import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" variant="floating" {...props}>
			<SidebarHeader>
				<div>SidebarHeader</div>
			</SidebarHeader>
			<SidebarContent>
				<div>SidebarContent</div>
			</SidebarContent>
			<SidebarFooter>
				<div>SidebarFooter</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
