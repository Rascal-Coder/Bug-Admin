import Cookies from "js-cookie";
import { useMemo } from "react";
import { useLocation } from "react-router";
import { Header } from "@/components/layouts/weight/header";
import { Main } from "@/components/layouts/weight/main";
import { ThemeSwitch } from "@/components/layouts/weight/themeswitch";
import LocalePicker from "@/components/locale-picker";
import { NavHorizontal } from "@/components/nav/horizontal";
import type { NavItemDataProps } from "@/components/nav/types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { Separator } from "@/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/ui/sidebar";
import { cn } from "@/utils";
import { AppSidebar } from "../app-sidebar";
import { frontendNavData } from "../nav-data/nav-data-frontend";
import AccountDropdown from "../weight/account-dropdown";
import FullscreenButton from "../weight/fullscreen-button";
import NoticeButton from "../weight/notice";
import SearchBar from "../weight/search-bar";
export default function MixedLayout() {
	const location = useLocation();
	const isMobile = useMediaQuery("(max-width: 768px)");
	const defaultOpen = useMemo(() => {
		const cookieValue = Cookies.get("sidebar_state");
		return cookieValue !== "false";
	}, []);

	const verticalMenuData = useMemo(() => {
		return frontendNavData.map((section) => ({
			...section,
			items: section.items.map((item) => ({
				...item,
				children: [],
			})),
		}));
	}, []);

	const matchedChildren: NavItemDataProps[] = [];
	const horizontalMenuData = useMemo(() => {
		const currentPath = location.pathname;

		frontendNavData.forEach((section) => {
			section.items.forEach((item) => {
				if (item.children) {
					if (currentPath.startsWith(item.path) || item.children.some((child) => currentPath.startsWith(child.path))) {
						matchedChildren.push(...item.children);
					}
				}
			});
		});

		if (matchedChildren.length > 0) {
			return [
				{
					name: "导航",
					items: matchedChildren,
				},
			];
		}

		return [];
	}, [location.pathname]);
	return (
		<SidebarProvider
			defaultOpen={defaultOpen}
			style={{ "--sidebar-width": "var(--layout-nav-width)" } as React.CSSProperties}
		>
			<AppSidebar data={isMobile ? frontendNavData : verticalMenuData} />
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
					<SidebarTrigger variant="outline" className="min-w-[28px] min-h-[28px]" />
					{!isMobile && (
						<>
							{matchedChildren.length > 0 && <Separator orientation="vertical" className="h-6! ml-2!" />}
							<ScrollArea className="whitespace-nowrap px-2 bg-background">
								<NavHorizontal data={horizontalMenuData} />
								<ScrollBar orientation="horizontal" />
							</ScrollArea>
						</>
					)}

					<div data-slot="right" className="flex flex-1 justify-end items-center gap-2 sm:gap-3">
						<SearchBar />
						<ThemeSwitch />
						<LocalePicker />
						<FullscreenButton />
						<NoticeButton />
						<AccountDropdown />
					</div>
				</Header>
				<Main />
			</SidebarInset>
		</SidebarProvider>
	);
}
