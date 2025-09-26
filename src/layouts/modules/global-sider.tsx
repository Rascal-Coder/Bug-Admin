import { type FC, memo, useState } from "react";
import type { NavProps } from "@/components/nav/types";
import { Scroller } from "@/components/scroller";
import MenuToggler from "@/layouts/menu-toggler";
import { useIsMobile } from "@/store/appStore";
import { useSettings } from "@/store/settingStore";
import { cn } from "@/utils";
import { Logo } from "./global-logo";
import GlobalMenu from "./global-menu";
export const GLOBAL_SIDER_MENU_ID = "__GLOBAL_SIDER_MENU__";
type ThemeLayoutMode = "horizontal" | "horizontal-mix" | "vertical" | "vertical-mix";

interface Props {
	headerHeight?: number;
	inverted?: boolean;
	// siderCollapse?: boolean;
	data: NavProps["data"];
	mode: ThemeLayoutMode;
}
const GlobalSider: FC<Props> = memo(({ data, mode }) => {
	const [showLogo] = useState(true);
	const { collapseSidebar } = useSettings();
	const isMobile = useIsMobile();
	return (
		<div className="h-full w-full flex flex-col items-stretch bg-bg-paper border-r">
			{showLogo && (
				<div className="flex-center p-3">
					<Logo className="px-2 w-full" open={!collapseSidebar}></Logo>
				</div>
			)}
			<Scroller className={showLogo ? "flex-1 overflow-x-hidden" : "h-full overflow-x-hidden"}>
				<GlobalMenu mode={mode} data={data}></GlobalMenu>
			</Scroller>
			<div className={cn("p-2 flex items-center ", !collapseSidebar ? "justify-end" : "justify-center")}>
				{!isMobile && <MenuToggler state={collapseSidebar ? "collapsed" : "expanded"} />}
			</div>
		</div>
	);
});

export default GlobalSider;
