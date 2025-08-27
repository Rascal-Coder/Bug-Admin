import { PanelLeftIcon } from "lucide-react";
import { useState } from "react";
import LocalePicker from "@/components/locale-picker";
import { NavHorizontal } from "@/components/nav/horizontal";
import { NavVertical } from "@/components/nav/vertical";
import { useMediaQuery } from "@/hooks";
import { useRouter } from "@/routes/hooks";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { MobileSidebar } from "@/ui/sidebar";
import { cn } from "@/utils";
import { frontendNavData } from "../nav-data/nav-data-frontend";
import AccountDropdown from "../weight/account-dropdown";
import FullscreenButton from "../weight/fullscreen-button";
import { Header } from "../weight/header";
import { Main } from "../weight/main";
import NoticeButton from "../weight/notice";
import SearchBar from "../weight/search-bar";
import { ThemeSwitch } from "../weight/themeswitch";
import { Icon } from "@/components/icon";

export default function HorizontalLayout() {
	const isMobile = useMediaQuery({ maxWidth: 768 });
	const [openMobile, setOpenMobile] = useState(false);
	const router = useRouter();
	return (
		<main className={cn("text-black dark:text-white min-h-screen")}>
			<Header fixed>
				<div
					className="min-w-[160px] flex items-center gap-2 text-sm p-3 cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground"
					onClick={() => {
						router.push("/");
					}}
				>
					<Icon icon="local-logo" size={40} />
					<span className="font-semibold text-xl leading-tight">Bug Admin</span>
				</div>
				{isMobile ? (
					<Button
						data-sidebar="trigger"
						data-slot="sidebar-trigger"
						variant="ghost"
						size="icon"
						className="size-7 mr-1"
						onClick={() => {
							setOpenMobile(!openMobile);
						}}
					>
						<PanelLeftIcon />
						<span className="sr-only">Toggle Sidebar</span>
					</Button>
				) : (
					<ScrollArea className="whitespace-nowrap px-2 bg-background">
						<NavHorizontal data={frontendNavData} />
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				)}
				<MobileSidebar openMobile={openMobile} setOpenMobile={setOpenMobile}>
					<NavVertical data={frontendNavData} />
				</MobileSidebar>
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
		</main>
	);
}
