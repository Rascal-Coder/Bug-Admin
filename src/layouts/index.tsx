import { Suspense } from "react";
import { AdminLayout, LAYOUT_SCROLL_EL_ID } from "@/react-layouts/index";

import "./index.scss";
import { Main } from "./weight/main";

const BaseLayout = () => {
	return (
		<AdminLayout
			fixedFooter={true}
			fixedTop={true}
			Footer={
				<a href="https://github.com/Rascal-Coder/Bug-Admin" rel="noopener noreferrer" target="_blank">
					Copyright MIT © 2025 Bug-Admin
				</a>
			}
			footerHeight={48}
			footerVisible={true}
			fullContent={false}
			headerHeight={56}
			isMobile={false}
			mode={"vertical"}
			rightFooter={false}
			scrollElId={LAYOUT_SCROLL_EL_ID}
			scrollMode={"content"}
			siderCollapse={false}
			siderCollapsedWidth={80}
			siderVisible={true}
			siderWidth={240}
			Tab={<div>111111</div>}
			tabHeight={80}
			tabVisible={true}
			updateSiderCollapse={() => {}}
			Header={<div>header</div>}
			Sider={<div>Sider</div>}
		>
			{/* <GlobalContent /> */}
			<Main></Main>
			<div>menu</div>

			<Suspense fallback={null}>
				{/* <ThemeDrawer /> */}
				<div>theme</div>
			</Suspense>
		</AdminLayout>
	);
};

export default BaseLayout;
