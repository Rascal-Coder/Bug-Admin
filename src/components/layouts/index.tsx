import { HeaderLeftSlotRender, HeaderRightSlotRender } from "./components/HeaderSlots";
import { SidebarSlotRender } from "./components/SidebarSlots";
import { useLayoutMode } from "./hooks/useLayoutMode";
import { useSidebarWidth } from "./hooks/useSidebarWidth";
import SidebarWrapper from "./sidebar/sidebar-wrapper";
export default function Layouts() {
	const { isDouble } = useLayoutMode();
	const { sidebarWidth } = useSidebarWidth();
	return (
		<SidebarWrapper
			headerRightSlot={<HeaderRightSlotRender />}
			headerLeftSlot={<HeaderLeftSlotRender />}
			sidebarSlot={<SidebarSlotRender />}
			sidebarWidth={isDouble ? sidebarWidth : undefined}
		/>
	);
}
