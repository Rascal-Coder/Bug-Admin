import { NavMini } from "@/components/nav/mini";
import { NavVertical } from "@/components/nav/vertical";
import { useMediaQuery } from "@/hooks";
import { BREAKPOINTS } from "../constants/layoutConfig";
import type { SidebarProps } from "./types";

export default function NavSwitcher({ open, data, className }: SidebarProps) {
	const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.MOBILE });
	return (
		<>
			{isMobile || open ? (
				<NavVertical data={data} className={className} />
			) : (
				<NavMini data={data} className={className} />
			)}
		</>
	);
}
