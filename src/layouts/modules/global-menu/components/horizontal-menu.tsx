import { createPortal } from "react-dom";
import { NavHorizontal } from "@/components/nav/horizontal";
import type { NavProps } from "@/components/nav/types";
import { Scroller } from "@/components/scroller";
import { useGetElementById } from "@/hooks/use-getelement-by-id";
import { GLOBAL_HEADER_MENU_ID } from "../../global-header";

const HorizontalMenu = ({ data, mode }: { data: NavProps["data"]; mode: "0" | "1" }) => {
	return (
		<Scroller orientation="horizontal" className="whitespace-nowrap px-2 bg-background">
			<NavHorizontal data={data} mode={mode} />
		</Scroller>
	);
};

const Horizontal = ({ data, mode }: { data: NavProps["data"]; mode: "0" | "1" }) => {
	const container = useGetElementById(GLOBAL_HEADER_MENU_ID);

	if (!container) return null;

	return createPortal(<HorizontalMenu data={data} mode={mode} />, container);
};

export default Horizontal;
