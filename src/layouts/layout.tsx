import clsx from "clsx";
import { useAdminLayout } from ".";
import { LAYOUT_MODES } from "./constants/layoutConfig";

const LAYOUT_NAV_WIDTH_ICON = "5.5rem";
export default function AdminLayout({
	collapsible = "icon",
	Header,
	Content,
	MobileSidebar,
	Sidebar,
}: {
	collapsible?: "offcanvas" | "icon";
	Header: React.ReactNode;
	Content: React.ReactNode;
	MobileSidebar: React.ReactNode;
	Sidebar: React.ReactNode;
}) {
	const { layoutMode, collapseSidebar, sidebarMode, isMobile } = useAdminLayout();
	return (
		<section
			data-slot="layout-wrapper"
			className={clsx("group/layout-wrapper has-data-[variant=inset]:bg-background flex min-h-svh w-full")}
			style={
				{
					"--layout-nav-width-icon": LAYOUT_NAV_WIDTH_ICON,
					"--layout-nav-width": "240px",
				} as React.CSSProperties
			}
		>
			{layoutMode !== LAYOUT_MODES.HORIZONTAL && (
				<aside
					className="group peer text-sidebar-foreground hidden md:block"
					data-state={!collapseSidebar ? "collapsed" : "expanded"}
					data-collapsible={!collapseSidebar ? collapsible : ""}
					data-variant={sidebarMode}
					data-slot="sidebar"
				>
					<div
						data-slot="sidebar-gap"
						className={clsx(
							"relative w-(--layout-nav-width) bg-transparent",
							"transition-[width] duration-200 ease-linear",
							"group-data-[collapsible=offcanvas]:w-0",
							sidebarMode === "floating" || sidebarMode === "inset"
								? "group-data-[collapsible=icon]:w-[calc(var(--layout-nav-width-icon)+(--spacing(4)))]"
								: "group-data-[collapsible=icon]:w-(--layout-nav-width-icon)",
						)}
					/>

					<div
						data-slot="sidebar-container"
						className={clsx(
							"fixed inset-y-0 z-10 hidden h-svh w-(--layout-nav-width) ease-linear md:flex",
							"transition-[left,width] duration-200",
							"left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--layout-nav-width)*-1)]",
							// Adjust the padding for floating and inset variants.
							sidebarMode === "floating" || sidebarMode === "inset"
								? "p-2 group-data-[collapsible=icon]:w-[calc(var(--layout-nav-width-icon)+(--spacing(4))+2px)]"
								: "group-data-[collapsible=icon]:w-(--layout-nav-width-icon) border-r",
						)}
					>
						<div
							data-sidebar="sidebar"
							data-slot="sidebar-inner"
							className="bg-background group-data-[variant=floating]:border-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-md"
						>
							{Sidebar}
						</div>
					</div>
				</aside>
			)}
			<main
				data-slot="layout-main"
				className={clsx(
					"text-black dark:text-white",
					"bg-background relative flex w-full flex-1 flex-col border-border border-1",
					"md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-lg md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
				)}
			>
				{Header}
				{Content}
				{isMobile && MobileSidebar}
			</main>
		</section>
	);
}
