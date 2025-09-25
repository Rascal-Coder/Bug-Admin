import { type FC, memo, useState } from "react";
import { useSettings } from "@/store/settingStore";
import { Logo } from "./global-logo";

export const GLOBAL_SIDER_MENU_ID = "__GLOBAL_SIDER_MENU__";

interface Props {
	headerHeight?: number;
	inverted?: boolean;
	isHorizontalMix?: boolean;
	isVerticalMix?: boolean;
	siderCollapse?: boolean;
}
const GlobalSider: FC<Props> = memo(() => {
	const [showLogo] = useState(true);
	const { collapseSidebar } = useSettings();
	return (
		<div className="h-full w-full flex flex-col items-stretch bg-accent/50 border-r">
			{showLogo && (
				<div className="flex-center p-3">
					<Logo className="px-2 w-full" open={!collapseSidebar}></Logo>
				</div>
			)}
			<div className={showLogo ? "flex-1 overflow-hidden" : "h-full"} id={GLOBAL_SIDER_MENU_ID} />
		</div>
	);
});

export default GlobalSider;
