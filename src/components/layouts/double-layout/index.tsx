import { useMemo } from "react";
import LocalePicker from "@/components/locale-picker";
import { Separator } from "@/ui/separator";
import { SidebarTrigger } from "@/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { frontendNavData } from "../nav-data/nav-data-frontend";
import SidebarWrapper from "../sidebar-wrapper";
import AccountDropdown from "../weight/account-dropdown";
import { Breadcrumb } from "../weight/breadcrumb";
import FullscreenButton from "../weight/fullscreen-button";
import NoticeButton from "../weight/notice";
import SearchBar from "../weight/search-bar";
import { ThemeSwitch } from "../weight/themeswitch";

/**
 * 垂直布局组件
 */
export default function DoubleLayout() {
	/**
	 * 头部左侧区域组件
	 */
	const headerLeftSlot = useMemo(
		() => (
			<>
				<SidebarTrigger variant="outline" className="max-md:scale-125" />
				<Separator orientation="vertical" className="h-6" />
				<Breadcrumb />
			</>
		),
		[],
	);

	/**
	 * 头部右侧区域组件
	 */
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
			sidebarSlot={<AppSidebar data={frontendNavData} />}
			headerLeftSlot={headerLeftSlot}
			headerRightSlot={headerRightSlot}
		/>
	);
}
