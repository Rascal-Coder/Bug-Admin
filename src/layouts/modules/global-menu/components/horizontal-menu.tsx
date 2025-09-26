import { createPortal } from "react-dom";
import { NavHorizontal } from "@/components/nav/horizontal";
import type { NavProps } from "@/components/nav/types";
import { Scroller } from "@/components/scroller";
import { useGetElementById } from "@/hooks/use-getelement-by-id";
import { GLOBAL_HEADER_MENU_ID } from "../../global-header";

const HorizontalMenu = ({ data }: { data: NavProps["data"] }) => {
	return (
		<Scroller hideScrollbar orientation="horizontal" className="whitespace-nowrap px-2 bg-background">
			<NavHorizontal data={data} />
		</Scroller>
	);
};

const Horizontal = ({ data }: { data: NavProps["data"] }) => {
	const container = useGetElementById(GLOBAL_HEADER_MENU_ID);

	if (!container) return null;

	return createPortal(<HorizontalMenu data={data} />, container);
};

export default Horizontal;
