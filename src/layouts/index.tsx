import { useLayoutEffect } from "react";
import { useMediaQuery } from "@/hooks";
import { AdminLayout, LAYOUT_SCROLL_EL_ID } from "@/materials";
import { navData } from "@/routes/nav-data";
import { useAppActions } from "@/store/appStore";
import { useSettings } from "@/store/settingStore";
import GlobalFooter from "./global-footer";
import GlobalSider from "./global-sider";
import GlobalHeader from "./modules/global-header";
import GlobalMenu from "./modules/global-menu";
import { Main } from "./weight/main";
import Tabs from "./weight/tabs";

const BaseLayout = () => {
	const isMobile = useMediaQuery({ maxWidth: 768 });
	const { setIsMobile } = useAppActions();
	const { collapseSidebar } = useSettings();
	useLayoutEffect(() => {
		setIsMobile(isMobile);
	}, [isMobile, setIsMobile]);

	return (
		<AdminLayout
			fixedFooter={false}
			fixedTop={false}
			Footer={<GlobalFooter></GlobalFooter>}
			footerHeight={48}
			footerVisible={true}
			fullContent={false}
			headerHeight={56}
			isMobile={false}
			mode={"vertical"}
			rightFooter={false}
			scrollElId={LAYOUT_SCROLL_EL_ID}
			scrollMode="content"
			siderCollapse={collapseSidebar}
			siderCollapsedWidth={80}
			siderVisible={true}
			siderWidth={240}
			Tab={<Tabs></Tabs>}
			tabHeight={44}
			tabVisible={true}
			updateSiderCollapse={() => {}}
			Header={<GlobalHeader isMobile={false} mode="vertical"></GlobalHeader>}
			Sider={<GlobalSider isHorizontalMix={false} isVerticalMix={false}></GlobalSider>}
		>
			<Main></Main>
			<GlobalMenu mode="vertical" data={navData}></GlobalMenu>
		</AdminLayout>
	);
};

export default BaseLayout;
