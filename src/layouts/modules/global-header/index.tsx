import { type FC, memo, useRef } from "react";
import { useFullscreen, useToggle } from "react-use";
import { Icon } from "@/components/icon";
import LocalePicker from "@/components/locale-picker";
// import { NavHorizontal } from "@/components/nav/horizontal";
import { useUpdateSettings } from "@/hooks";
import { Logo } from "@/layouts/modules/global-logo";
import { useAppActions, useIsMobileOpen } from "@/store/appStore";
import { useSettings } from "@/store/settingStore";
import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";
import { cn } from "@/utils";
import AccountDropdown from "./components/account-dropdown";
import Breadcrumb from "./components/breadcrumb";
import FullScreen from "./components/fullscreen";
import NoticeButton from "./components/notice";
import SearchBar from "./components/search-bar";
import ThemeSwitch from "./components/theme-switch";

export const GLOBAL_HEADER_MENU_ID = "__GLOBAL_HEADER_MENU__";

/**
 * The layout mode
 *
 * - vertical: the vertical menu in left
 * - horizontal: the horizontal menu in top
 * - vertical-mix: two vertical mixed menus in left
 * - horizontal-mix: the vertical menu in left and horizontal menu in top
 */
type ThemeLayoutMode = "horizontal" | "horizontal-mix" | "vertical" | "vertical-mix";
interface Props {
	isMobile: boolean;
	mode: ThemeLayoutMode;
	reverse?: boolean;
	// siderWidth: number;
}

interface HeaderProps {
	/** Whether to show the logo */
	showLogo?: boolean;
	/** Whether to show the menu */
	showMenu?: boolean;
	/** Whether to show the menu toggler */
	showMenuToggler?: boolean;
}

const HEADER_PROPS_CONFIG: Record<ThemeLayoutMode, HeaderProps> = {
	horizontal: {
		showLogo: true,
		showMenu: true,
		showMenuToggler: false,
	},
	"horizontal-mix": {
		showLogo: true,
		showMenu: true,
		showMenuToggler: true,
	},
	vertical: {
		showLogo: false,
		showMenu: false,
		showMenuToggler: true,
	},
	"vertical-mix": {
		showLogo: false,
		showMenu: false,
		showMenuToggler: false,
	},
};

const GlobalHeader: FC<Props> = memo(({ isMobile, mode, reverse }) => {
	const [show, toggle] = useToggle(false);
	const ref = useRef(document.body);
	const isFullscreen = useFullscreen(ref, show, { onClose: () => toggle(false) });

	const { showLogo, showMenu, showMenuToggler } = HEADER_PROPS_CONFIG[mode];

	const showToggler = reverse ? true : showMenuToggler;

	const { siderVisible } = useSettings();
	const { updateSettings } = useUpdateSettings();
	const isMobileOpen = useIsMobileOpen();
	const { setisMobileOpen } = useAppActions();
	const handleToggle = () => {
		if (!isMobile) {
			updateSettings({
				siderVisible: !siderVisible,
			});
		} else {
			setisMobileOpen(!isMobileOpen);
		}
	};
	return (
		<div className="h-full flex-y-center px-3 shadow-md bg-bg-paper border-b">
			{showLogo && !isMobile && (
				<div data-slot="header-logo-wrapper" className="h-full p-2">
					<Logo open={!isMobile} className="h-full px-2"></Logo>
				</div>
			)}
			<div>{reverse ? true : showMenuToggler}</div>

			{showToggler && (
				<Button size="icon" variant="ghost" onClick={handleToggle}>
					<Icon icon="line-md:close-to-menu-alt-transition" size={20}></Icon>
				</Button>
			)}
			{isMobile && !showMenuToggler && (
				<Button size="icon" variant="ghost" onClick={handleToggle}>
					<Icon icon="line-md:close-to-menu-alt-transition" size={20}></Icon>
				</Button>
			)}
			{!isMobile && mode.includes("vertical") && <Separator orientation="vertical" className="h-6! mx-2"></Separator>}
			{!isMobile && (
				<div className="h-full flex-y-center flex-1 overflow-hidden" id={GLOBAL_HEADER_MENU_ID}>
					{!isMobile && !showMenu && <Breadcrumb />}
				</div>
			)}

			<div className={cn("h-full flex-y-center justify-end gap-3", isMobile && "flex-1")}>
				<SearchBar showKbd={!isMobile} />
				<ThemeSwitch />
				<LocalePicker></LocalePicker>
				{!isMobile && (
					<FullScreen key={String(isFullscreen)} className="px-3" full={isFullscreen} toggleFullscreen={toggle} />
				)}

				<NoticeButton></NoticeButton>
				<AccountDropdown></AccountDropdown>
			</div>
		</div>
	);
});

export default GlobalHeader;
