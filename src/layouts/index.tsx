import { useLayoutEffect, useMemo } from "react";
import { useMediaQuery } from "@/hooks";
import { AdminLayout, LAYOUT_SCROLL_EL_ID } from "@/materials";
import { navData } from "@/routes/nav-data";
import { useAppActions, useIsMobileOpen } from "@/store/appStore";
import { useSettings } from "@/store/settingStore";
import GlobalContent from "./modules/global-contnet";
import GlobalFooter from "./modules/global-footer";
import GlobalHeader from "./modules/global-header";
import Horizontal from "./modules/global-menu/components/horizontal-menu";
import GlobalSider from "./modules/global-sider";
import Tabs from "./weight/tabs";

const BaseLayout = () => {
	const isMobile = useMediaQuery({ maxWidth: 768 });
	const { setIsMobile, setisMobileOpen } = useAppActions();
	const { collapseSidebar, siderVisible, layoutMode } = useSettings();
	const isMobileOpen = useIsMobileOpen();
	useLayoutEffect(() => {
		setIsMobile(isMobile);
	}, [isMobile, setIsMobile]);

	const mode = useMemo(() => {
		if (layoutMode.includes("horizontal")) {
			return "horizontal";
		}
		return "vertical";
	}, [layoutMode]);

	const showSider = useMemo(() => {
		console.log("siderVisible", siderVisible);

		return !isMobile && siderVisible && layoutMode !== "horizontal";
	}, [isMobile, siderVisible, layoutMode]);

	return (
		<AdminLayout
			mobileSiderOpen={isMobileOpen}
			fixedFooter={false}
			fixedTop={false}
			Footer={<GlobalFooter></GlobalFooter>}
			footerHeight={48}
			footerVisible={true}
			fullContent={false}
			headerHeight={56}
			isMobile={isMobile}
			mode={mode}
			rightFooter={false}
			scrollElId={LAYOUT_SCROLL_EL_ID}
			scrollMode="content"
			siderCollapse={collapseSidebar}
			siderCollapsedWidth={80}
			siderVisible={showSider}
			siderWidth={240}
			Tab={<Tabs></Tabs>}
			tabHeight={44}
			tabVisible={true}
			updateSiderCollapse={() => {
				setisMobileOpen(false);
			}}
			Header={<GlobalHeader isMobile={isMobile} mode={layoutMode}></GlobalHeader>}
			Sider={<GlobalSider mode={layoutMode} data={navData}></GlobalSider>}
			MobileSider={<GlobalSider mode="vertical" data={navData}></GlobalSider>}
		>
			{layoutMode === "horizontal" && <Horizontal data={navData} mode="0" />}
			{layoutMode === "horizontal-mix" && <Horizontal data={navData} mode="1" />}
			<GlobalContent></GlobalContent>
		</AdminLayout>
	);
};

export default BaseLayout;
