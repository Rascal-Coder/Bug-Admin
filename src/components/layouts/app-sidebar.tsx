import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

import { NavUser } from "@/components/layouts/weight/nav-user";
import { TeamSwitcher } from "@/components/layouts/weight/team-switcher";
import { useSettings } from "@/store/settingStore";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from "@/ui/sidebar";
import type { NavProps } from "../nav/types";
import Siderbar from "./siderbar";

export function AppSidebar({ data, ...props }: React.ComponentProps<typeof Sidebar> & { data: NavProps["data"] }) {
	const { open } = useSidebar();
	const { sidebarMode } = useSettings();
	return (
		<Sidebar collapsible="icon" variant={sidebarMode} {...props}>
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
				<Siderbar open={open} data={data} />
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
