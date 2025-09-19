import { createContext, useContext, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { useUpdateEffect } from "react-use";
import avatar from "@/assets/images/user/avatar.jpg";
import type { NavItemDataProps } from "@/components/nav/types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { navData } from "@/routes/nav-data";
import { useSettings } from "@/store/settingStore";
import { useTabActions } from "@/store/tabStore";
import { PermissionType } from "@/types/enum";
import { cn } from "@/utils";
import { getMenuInfoByPath } from "@/utils/menu";
import { HeaderLeftSlotRender, HeaderRightSlotRender, MobileSidebar } from "./components/HeaderSlots";
import { DoubleSidebarSlot } from "./components/SidebarSlots";
import { USER_INFO } from "./constants/layoutConfig";
import { useSidebarWidth } from "./hooks/useSidebarWidth";
import AdminLayout from "./layout";
import { Logo } from "./sidebar/logo";
import NavSwitcher from "./sidebar/nav-switcher";
import type { UserInfo } from "./sidebar/types";
import { Header } from "./weight/header";
import { Main } from "./weight/main";
import { NavUser } from "./weight/nav-user";

function GlobalHeader() {
	return (
		<Header fixed>
			<HeaderLeftSlotRender />
			<div data-slot="right" className="flex flex-1 justify-end items-center gap-2 sm:gap-3">
				<HeaderRightSlotRender />
			</div>
		</Header>
	);
}

function GlobalSidebar() {
	const userInfo: UserInfo = useMemo(() => {
		return {
			name: USER_INFO.name,
			email: USER_INFO.email,
			avatar: avatar,
		};
	}, []);
	const { selectedGroup, isSubMenuVisible, handleGroupSelect, handleGroupClick, handleSubMenuClose } =
		useSidebarWidth();
	const { isMobile, collapseSidebar, layoutMode, data } = useAdminLayout();
	const navData = useMemo(() => {
		if (layoutMode === "mixed") {
			return data.map((section) => ({
				...section,
				items: section.items.map((item) => ({
					...item,
					children: [],
				})),
			}));
		}
		return data;
	}, [layoutMode, data]);
	return layoutMode !== "double" ? (
		<>
			<div data-slot="sidebar-header" data-sidebar="header" className={cn("flex flex-col gap-2 p-2")}>
				<Logo isMobile={isMobile} open={collapseSidebar} />
			</div>
			<div
				data-slot="sidebar-content"
				data-sidebar="content"
				className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden")}
			>
				<NavSwitcher open={collapseSidebar} data={navData} />
			</div>
			<div data-slot="sidebar-footer" data-sidebar="footer" className={cn("flex flex-col gap-2 p-2")}>
				<NavUser user={userInfo} />
			</div>
		</>
	) : (
		<DoubleSidebarSlot
			selectedGroup={selectedGroup}
			isSubMenuVisible={isSubMenuVisible}
			handleGroupSelect={handleGroupSelect}
			handleGroupClick={handleGroupClick}
			handleSubMenuClose={handleSubMenuClose}
		/>
	);
}

function GlobalMobileSidebar() {
	return <MobileSidebar />;
}

export default function Layouts() {
	const { addTab, addCacheKey, clearCacheKeys } = useTabActions();
	const { pathname } = useLocation();
	const menuInfo = getMenuInfoByPath(pathname);
	// 递归初始化缓存键
	const initializeCacheKeys = (items: NavItemDataProps[]) => {
		items.forEach((item) => {
			if (item.keepAlive === true && item.path) {
				addCacheKey(item.path);
			}
			if (item.children && Array.isArray(item.children) && item.children.length > 0) {
				initializeCacheKeys(item.children);
			}
		});
	};
	useUpdateEffect(() => {
		if (menuInfo && menuInfo.type === PermissionType.MENU) {
			addTab({
				label: menuInfo.title,
				value: menuInfo.path,
				path: menuInfo.path,
				icon: typeof menuInfo.icon === "string" ? menuInfo.icon : undefined,
			});
		}
		clearCacheKeys();
		navData.forEach((group) => {
			if (group.items && Array.isArray(group.items)) {
				initializeCacheKeys(group.items);
			}
		});
	}, [menuInfo]);

	return (
		<AdminLayoutProvider>
			<AdminLayout
				Header={<GlobalHeader></GlobalHeader>}
				Content={<Main></Main>}
				MobileSidebar={<GlobalMobileSidebar></GlobalMobileSidebar>}
				Sidebar={<GlobalSidebar></GlobalSidebar>}
			/>
		</AdminLayoutProvider>
	);
}

const AdminLayoutContext = createContext<{
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	data: {
		name?: string;
		items: NavItemDataProps[];
	}[];
	layoutMode: "vertical" | "horizontal" | "mixed" | "double";
	collapseSidebar: boolean;
	sidebarMode: "sidebar" | "floating" | "inset";
} | null>(null);

const AdminLayoutProvider = ({ children }: { children: React.ReactNode }) => {
	const [openMobile, setOpenMobile] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: 768 });
	const data = useMemo(() => {
		return navData;
	}, []);
	const { layoutMode, collapseSidebar, sidebarMode } = useSettings();
	return (
		<AdminLayoutContext.Provider
			value={{ sidebarMode, openMobile, setOpenMobile, isMobile, data, layoutMode, collapseSidebar }}
		>
			{children}
		</AdminLayoutContext.Provider>
	);
};

export function useAdminLayout() {
	const context = useContext(AdminLayoutContext);
	if (!context) {
		throw new Error("useAdminLayout must be used within a AdminLayoutProvider");
	}
	return context;
}
