import Cookies from "js-cookie";
import { useMemo } from "react";
import { Breadcrumb } from "@/components/layouts/weight/breadcrumb";
import { Header } from "@/components/layouts/weight/header";
import { Main } from "@/components/layouts/weight/main";
import { ThemeSwitch } from "@/components/layouts/weight/themeswitch";
import LocalePicker from "@/components/locale-picker";
import { Separator } from "@/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/ui/sidebar";
import { cn } from "@/utils";
import AccountDropdown from "../weight/account-dropdown";
import FullscreenButton from "../weight/fullscreen-button";
import NoticeButton from "../weight/notice";
import SearchBar from "../weight/search-bar";
import { SettingButton } from "../weight/setting-button";
import { AppSidebar } from "./app-sidebar";

export default function VerticalLayout() {
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
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center h-full gap-3 sm:gap-4">
							<SidebarTrigger variant="outline" className="max-md:scale-125" />
							<Separator orientation="vertical" className="h-6!" />
							<Breadcrumb />
						</div>

						<div className="flex items-center h-full gap-2 sm:gap-3">
							<SearchBar />
							<SettingButton></SettingButton>
							<ThemeSwitch />
							<LocalePicker />
							<FullscreenButton />
							<NoticeButton />
							<AccountDropdown />
						</div>
					</div>
				</Header>
				<Main />
			</SidebarInset>
		</SidebarProvider>
	);
}
