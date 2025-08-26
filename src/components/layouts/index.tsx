import type { ReactNode } from "react";
import { useSettings } from "@/store/settingStore";
import HorizontalLayout from "./horizontal-layout";
import VerticalLayout from "./vertical-layout";

export default function Layouts({ children }: { children: ReactNode }) {
	const { layoutMode } = useSettings();
	return (
		<>
			{layoutMode === "vertical" && <VerticalLayout></VerticalLayout>}
			{layoutMode === "horizontal" && <HorizontalLayout />}
			{layoutMode === "mixed" && (
				<div className="flex-1 flex flex-col text-primary">
					混合布局
					{children}
				</div>
			)}
			{layoutMode === "double" && (
				<div className="flex-1 flex flex-col text-primary">
					双列布局
					{children}
				</div>
			)}
		</>
	);
}
