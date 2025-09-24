import type { FC } from "react";
import type { NavProps } from "@/components/nav/types";
import { NavVertical } from "@/components/nav/vertical";
import { Scroller } from "@/components/scroller";

interface Props {
	// open: boolean;
	data: NavProps["data"];
	navMiniClassName?: string;
	navClassName?: string;
}
const VerticalMenu: FC<Props> = ({ data, navClassName }) => {
	return (
		<Scroller>
			<NavVertical data={data} className={navClassName} />
		</Scroller>
	);
};

export default VerticalMenu;
