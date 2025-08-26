import { NavVertical } from "@/components/nav/vertical";
import { useMediaQuery } from "@/hooks";
import { NavMini } from "../nav/mini";
import type { NavProps } from "../nav/types";

export default function Siderbar({ open, data }: { open: boolean; data: NavProps["data"] }) {
	const isMobile = useMediaQuery({ maxWidth: 768 });
	return <>{isMobile || open ? <NavVertical data={data} /> : <NavMini data={data} />}</>;
}
