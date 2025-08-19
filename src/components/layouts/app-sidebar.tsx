import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/ui/sidebar";
import { NavVertical } from "../nav/vertical";
import { frontendNavData } from "./nav-data/nav-data-frontend";
import { NavUser } from "./weight/nav-user";

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
				<NavUser user={{
					name: 'Rascal-Coder',
					email: 'menoqiqio@gmail.com',
					avatar: '/avatars/shadcn.jpg',
				}} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
