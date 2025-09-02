import { PanelLeftIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import avatar from "@/assets/images/user/avatar.jpg";
import { Icon } from "@/components/icon";
import LocalePicker from "@/components/locale-picker";
import { NavHorizontal } from "@/components/nav/horizontal";
import { NavVertical } from "@/components/nav/vertical";
import { useMediaQuery } from "@/hooks";
import { useRouter } from "@/routes/hooks";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { MobileSidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/ui/sidebar";
import { cn } from "@/utils";
import { frontendNavData } from "../nav-data/nav-data-frontend";
import SidebarWrapper from "../sidebar/sidebar-wrapper";
import AccountDropdown from "../weight/account-dropdown";
import FullscreenButton from "../weight/fullscreen-button";
import { NavUser } from "../weight/nav-user";
import NoticeButton from "../weight/notice";
import SearchBar from "../weight/search-bar";
import { ThemeSwitch } from "../weight/themeswitch";
export default function HorizontalLayout() {
	const isMobile = useMediaQuery({ maxWidth: 768 });
	const [openMobile, setOpenMobile] = useState(false);
	const router = useRouter();
	useEffect(() => {
		if (!isMobile) {
			setOpenMobile(false);
		}
	}, [isMobile]);
	const headerLeftSlot = useMemo(
		() => (
			<>
				{isMobile ? (
					<Button
						data-sidebar="trigger"
						data-slot="sidebar-trigger"
						variant="ghost"
						size="icon"
						className="size-7 max-md:scale-125"
						onClick={() => {
							setOpenMobile(!openMobile);
						}}
					>
						<PanelLeftIcon />
						<span className="sr-only">Toggle Sidebar</span>
					</Button>
				) : (
					<>
						<div
							className="min-w-[170px] flex items-center gap-2 text-sm p-3 cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground"
							onClick={() => {
								router.push("/");
							}}
						>
							<Icon icon="local-logo" size={40} />
							<span className="font-semibold text-xl leading-tight">Bug Admin</span>
						</div>
						<ScrollArea className="whitespace-nowrap px-2">
							<NavHorizontal data={frontendNavData} />
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</>
				)}
				<MobileSidebar openMobile={openMobile} setOpenMobile={setOpenMobile}>
					<SidebarHeader>
						<div
							className={cn(
								" flex items-center gap-2 text-sm p-3 cursor-pointer rounded-md  hover:bg-accent hover:text-accent-foreground",
							)}
							onClick={() => {
								router.push("/");
							}}
						>
							<div>
								<Icon icon="local-logo" size={40} />
							</div>
							<span
								className={cn(
									"font-semibold text-xl leading-tight transition-all duration-300 ease-in-out whitespace-nowrap",
								)}
							>
								Bug Admin
							</span>
						</div>
					</SidebarHeader>
					<SidebarContent>
						<NavVertical data={frontendNavData} />
					</SidebarContent>
					<SidebarFooter>
						<NavUser
							user={{
								name: "Rascal-Coder",
								email: "menoqiqio@gmail.com",
								avatar: avatar,
							}}
						/>
					</SidebarFooter>
				</MobileSidebar>
			</>
		),
		[isMobile, openMobile, router],
	);
	const headerRightSlot = useMemo(
		() => (
			<>
				<SearchBar />
				<ThemeSwitch />
				<LocalePicker />
				<FullscreenButton />
				<NoticeButton />
				<AccountDropdown />
			</>
		),
		[],
	);
	return <SidebarWrapper headerLeftSlot={headerLeftSlot} headerRightSlot={headerRightSlot} />;
}
