import type { ReactNode } from "react";
import LayoutHeader from "@/layouts/basic/layout-header";

export default function Layouts({ children }: { children: ReactNode }) {
	return (
		<div>
			<LayoutHeader>HEADER</LayoutHeader>
			<div>SIDEBAR</div>
			<div>MAIN</div>
			{children}
		</div>
	);
}
