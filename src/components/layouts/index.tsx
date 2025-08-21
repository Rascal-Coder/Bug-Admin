import type { ReactNode } from "react";
import VerticalLayout from "./vertical-layout";

export default function Layouts({ children }: { children: ReactNode }) {
	return <VerticalLayout>{children}</VerticalLayout>;
}
