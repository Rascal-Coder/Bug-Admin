import type { FC } from "react";
import { NavMini } from "@/components/nav/mini";
import type { NavProps } from "@/components/nav/types";
import { NavVertical } from "@/components/nav/vertical";
import { Scroller } from "@/components/scroller";
import { useSettings } from "@/store/settingStore";

interface Props {
	data: NavProps["data"];
	navMiniClassName?: string;
	navClassName?: string;
}
const VerticalMenu: FC<Props> = ({ data, navClassName }) => {
	const { collapseSidebar } = useSettings();
	return (
		<Scroller>
			{collapseSidebar ? (
				<NavMini data={data} className={navClassName}></NavMini>
			) : (
				<NavVertical data={data} className={navClassName} />
			)}
		</Scroller>
	);
};

export default VerticalMenu;
