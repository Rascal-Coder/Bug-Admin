import { NavMini } from "@/components/nav/mini";
import type { NavProps } from "@/components/nav/types";
import { NavVertical } from "@/components/nav/vertical";
import { useMediaQuery } from "@/hooks";
import { BREAKPOINTS } from "../constants/layoutConfig";

export default function Siderbar({ open, data }: { open: boolean; data: NavProps["data"] }) {
	const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.MOBILE });
	return <>{isMobile || open ? <NavVertical data={data} /> : <NavMini data={data} />}</>;
}
