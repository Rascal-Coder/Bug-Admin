import { createPortal } from "react-dom";
import type { NavProps } from "@/components/nav/types";
import { useGetElementById } from "@/hooks/use-getelement-by-id";
import VerticalMenu from "../components/vertical-menu";

export const GLOBAL_SIDER_MENU_ID = "__GLOBAL_SIDER_MENU__";
const Vertical = ({ data }: { data: NavProps["data"] }) => {
	const container = useGetElementById(GLOBAL_SIDER_MENU_ID);

	if (!container) return null;

	return createPortal(<VerticalMenu data={data} />, container);
};

export default Vertical;
