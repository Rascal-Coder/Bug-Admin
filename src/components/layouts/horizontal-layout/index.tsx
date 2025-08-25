import { AudioWaveform, Bell, Command, GalleryVerticalEnd } from "lucide-react";
import { NavHorizontal } from "@/components/nav/horizontal";
import { Button } from "@/ui/button";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { cn } from "@/utils";
import { frontendNavData } from "../nav-data/nav-data-frontend";
import { Header } from "../weight/header";
import { Main } from "../weight/main";
import { SettingButton } from "../weight/setting-button";
import { TeamSwitcherHorizontal } from "../weight/teamer-switcher-horizontal";
import { ThemeSwitch } from "../weight/themeswitch";

export default function HorizontalLayout() {
	return (
		<main className={cn("text-black dark:text-white")}>
			<Header fixed>
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center h-full gap-3 sm:gap-4">
						<TeamSwitcherHorizontal
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
						<ScrollArea className="whitespace-nowrap px-2 bg-background">
							<NavHorizontal data={frontendNavData} />
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</div>
					<div className="flex items-center gap-2 sm:gap-3">
						<div>search</div>
						<SettingButton></SettingButton>
						<ThemeSwitch />
						<div>多语言</div>
						<div>全屏</div>
						<Button variant="ghost" size="icon">
							<Bell />
						</Button>
						<div>头像</div>
					</div>
				</div>
			</Header>
			<Main />
		</main>
	);
}
