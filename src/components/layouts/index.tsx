import { useMemo } from "react";
import LocalePicker from "../locale-picker";
import { HeaderLeftSlotRender } from "./components/HeaderSlots";
import { SidebarSlotRender } from "./components/SidebarSlots";
import { useLayoutMode } from "./hooks/useLayoutMode";
import { useSidebarWidth } from "./hooks/useSidebarWidth";
import SidebarWrapper from "./sidebar/sidebar-wrapper";
import AccountDropdown from "./weight/account-dropdown";
import FullscreenButton from "./weight/fullscreen-button";
import NoticeButton from "./weight/notice";
import SearchBar from "./weight/search-bar";
import { ThemeSwitch } from "./weight/themeswitch";
export default function Layouts() {
	const { isDouble } = useLayoutMode();
	const { sidebarWidth } = useSidebarWidth();

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

	return (
		<SidebarWrapper
			headerRightSlot={headerRightSlot}
			headerLeftSlot={<HeaderLeftSlotRender />}
			sidebarSlot={<SidebarSlotRender />}
			sidebarWidth={isDouble ? sidebarWidth : undefined}
		/>
	);
}
