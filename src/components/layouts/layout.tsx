import { useMemo } from "react";
import avatar from "@/assets/images/user/avatar.jpg";
import { navData } from "@/routes/nav-data";
import { cn } from "@/utils";
import { HeaderLeftSlotRender, HeaderRightSlotRender } from "./components/HeaderSlots";
import { USER_INFO } from "./constants/layoutConfig";
import { Logo } from "./sidebar/logo";
import NavSwitcher from "./sidebar/nav-switcher";
import type { UserInfo } from "./sidebar/types";
import { Header } from "./weight/header";
import { Main } from "./weight/main";
import { NavUser } from "./weight/nav-user";
export default function AdminLayout({
	className,
	// children,
	isMobile = false,
	state = "expanded",
	collapsible = "icon",
	variant = "sidebar",
	// side = "left",
}: {
	className?: string;
	// children: React.ReactNode;
	isMobile?: boolean;
	state?: "expanded" | "collapsed";
	collapsible?: "offcanvas" | "icon";
	variant?: "sidebar" | "floating" | "inset";
	// side?: "left" | "right";
}) {
	const data = useMemo(() => {
		return navData;
	}, []);

	const userInfo: UserInfo = useMemo(() => {
		return {
			name: USER_INFO.name,
			email: USER_INFO.email,
			avatar: avatar,
		};
	}, []);
	const LAYOUT_NAV_WIDTH_ICON = "5.5rem";
	return (
		<section
			data-slot="layout-wrapper"
			className={cn("group/layout-wrapper has-data-[variant=inset]:bg-background flex min-h-svh w-full", className)}
			style={
				{
					"--layout-nav-width-icon": LAYOUT_NAV_WIDTH_ICON,
				} as React.CSSProperties
			}
		>
			<aside
				className="group peer text-sidebar-foreground hidden md:block"
				data-state={state}
				data-collapsible={state === "collapsed" ? collapsible : ""}
				data-variant={variant}
				data-slot="sidebar"
			>
				<div
					data-slot="sidebar-gap"
					className={cn(
						"relative w-(--layout-nav-width) bg-transparent",
						"transition-[width] duration-200 ease-linear",
						"group-data-[collapsible=offcanvas]:w-0",
						variant === "floating" || variant === "inset"
							? "group-data-[collapsible=icon]:w-[calc(var(--layout-nav-width-icon)+(--spacing(4)))]"
							: "group-data-[collapsible=icon]:w-(--layout-nav-width-icon)",
					)}
				/>
				<div
					data-slot="sidebar-container"
					className={cn(
						"fixed inset-y-0 z-10 hidden h-svh w-(--layout-nav-width) ease-linear md:flex",
						"transition-[left,width] duration-200",
						"left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--layout-nav-width)*-1)]",
						// Adjust the padding for floating and inset variants.
						variant === "floating" || variant === "inset"
							? "p-2 group-data-[collapsible=icon]:w-[calc(var(--layout-nav-width-icon)+(--spacing(4))+2px)]"
							: "group-data-[collapsible=icon]:w-(--layout-nav-width-icon) border-r",
						className,
					)}
				>
					<div
						data-sidebar="sidebar"
						data-slot="sidebar-inner"
						className="bg-background group-data-[variant=floating]:border-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-md"
					>
						<div data-slot="sidebar-header" data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)}>
							<Logo isMobile={isMobile} open={true} />
						</div>
						<div
							data-slot="sidebar-content"
							data-sidebar="content"
							className={cn(
								"flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
							)}
						>
							<NavSwitcher open={true} data={data} />
						</div>
						<div data-slot="sidebar-footer" data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)}>
							<NavUser user={userInfo} />
						</div>
					</div>
				</div>
			</aside>
			<main
				data-slot="layout-main"
				className={cn(
					"text-black dark:text-white",
					"bg-background relative flex w-full flex-1 flex-col border-border border-1",
					"md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-lg md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
				)}
			>
				<Header fixed>
					<HeaderLeftSlotRender />
					<div data-slot="right" className="flex flex-1 justify-end items-center gap-2 sm:gap-3">
						<HeaderRightSlotRender />
					</div>
				</Header>
				<Main />
			</main>
		</section>
	);
}
