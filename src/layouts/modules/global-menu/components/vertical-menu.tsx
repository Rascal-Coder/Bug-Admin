import type { FC } from "react";
import { NavMini } from "@/components/nav/mini";
import type { NavProps } from "@/components/nav/types";
import { NavVertical } from "@/components/nav/vertical";
import { useIsMobile } from "@/store/appStore";
import { useSettings } from "@/store/settingStore";

interface Props {
	data: NavProps["data"];
	navMiniClassName?: string;
	navClassName?: string;
}
const VerticalMenu: FC<Props> = ({ data, navClassName }) => {
	const { collapseSidebar } = useSettings();
	const isMoblie = useIsMobile();
	return (
		<>
			{collapseSidebar && !isMoblie ? (
				<NavMini data={data} className={navClassName}></NavMini>
			) : (
				<NavVertical data={data} className={navClassName} />
			)}
		</>
	);
};

export default VerticalMenu;
