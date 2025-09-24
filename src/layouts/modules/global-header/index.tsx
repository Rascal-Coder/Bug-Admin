import { type FC, memo, useRef } from "react";
import { useFullscreen, useToggle } from "react-use";
import LocalePicker from "@/components/locale-picker";
import { Logo } from "@/layouts/global-logo";
import MenuToggler from "@/layouts/menu-toggler";
import { Separator } from "@/ui/separator";
import AccountDropdown from "./components/account-dropdown";
import Breadcrumb from "./components/breadcrumb";
import FullScreen from "./components/fullscreen";
import NoticeButton from "./components/notice";
import SearchBar from "./components/search-bar";
import ThemeSwitch from "./components/theme-switch";

const GLOBAL_HEADER_MENU_ID = "__GLOBAL_HEADER_MENU__";

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
		showMenuToggler: false,
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
	// const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);
	const [show, toggle] = useToggle(false);
	const ref = useRef(document.body);
	const isFullscreen = useFullscreen(ref, show, { onClose: () => toggle(false) });

	const { showLogo, showMenu, showMenuToggler } = HEADER_PROPS_CONFIG[mode];

	const showToggler = reverse ? true : showMenuToggler;

	return (
		<div className="h-full flex-y-center px-3 shadow-md bg-accent/50 border-b">
			{showLogo && (
				<div data-slot="header-logo-wrapper" className="h-full p-2">
					<Logo className="h-full px-2"></Logo>
				</div>
			)}
			<div>{reverse ? true : showMenuToggler}</div>

			{showToggler && <MenuToggler state="expanded" />}

			<Separator orientation="vertical" className="h-6! mx-2"></Separator>
			<div className="h-full flex-y-center flex-1 overflow-hidden" id={GLOBAL_HEADER_MENU_ID}>
				{!isMobile && !showMenu && <Breadcrumb />}
			</div>

			<div className="h-full flex-y-center justify-end gap-3">
				<SearchBar />
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
