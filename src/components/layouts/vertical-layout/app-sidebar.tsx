import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { frontendNavData } from "@/components/layouts/nav-data/nav-data-frontend";
import { NavUser } from "@/components/layouts/weight/nav-user";
import { TeamSwitcher } from "@/components/layouts/weight/team-switcher";
import { NavVertical } from "@/components/nav/vertical";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" variant="sidebar" {...props}>
			<SidebarHeader>
				<TeamSwitcher
					teams={[
						{
							name: "Bug Admin",
							logo: Command,
							plan: "Vite + ShadcnUI",
						},
						{
							name: "Ant Design",
							logo: GalleryVerticalEnd,
							plan: "UI Framework",
						},
						{
							name: "React Router",
							logo: AudioWaveform,
							plan: "Routing",
						},
					]}
				/>
			</SidebarHeader>
			<SidebarContent>
				<NavVertical data={frontendNavData} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser
					user={{
						name: "Rascal-Coder",
						email: "menoqiqio@gmail.com",
						avatar: "/avatars/shadcn.jpg",
					}}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
