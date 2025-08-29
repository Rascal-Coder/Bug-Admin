import { useMemo } from "react";
import { Icon } from "@/components/icon";
import type { NavProps } from "@/components/nav/types";
import { useRouter } from "@/routes/hooks";
import { useSettings } from "@/store/settingStore";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from "@/ui/sidebar";
import { NavUser } from "../weight/nav-user";
import Siderbar from "./siderbar";

export function AppSidebar({ data }: React.ComponentProps<typeof Sidebar> & { data: NavProps["data"] }) {
	const { open } = useSidebar();
	const router = useRouter();
	return (
		<AppSidebarContainer>
			<SidebarHeader>
				<div
					className="min-w-[150px] flex items-center gap-2 text-sm p-3 cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground"
					onClick={() => {
						router.push("/");
					}}
				>
					<Icon icon="local-logo" size={40} />
					<span className="font-semibold text-xl leading-tight">Bug Admin</span>
				</div>
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
		</AppSidebarContainer>
	);
}
export function AppSidebarContainer({
	children,
	transition = true,
}: {
	children: React.ReactNode;
	transition?: boolean;
}) {
	const { sidebarMode, collapsibleType, layoutMode } = useSettings();
	const collapsible = useMemo(() => {
		if (layoutMode === "double") {
			return "offcanvas";
		}
		return collapsibleType;
	}, [collapsibleType, layoutMode]);
	return (
		<Sidebar collapsible={collapsible} variant={sidebarMode} transition={transition}>
			{children}
		</Sidebar>
	);
}
