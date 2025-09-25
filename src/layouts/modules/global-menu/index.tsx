import { memo } from "react";
import type { NavProps } from "@/components/nav/types.ts";
import VerticalModule from "./components/vertical-menu";

type ThemeLayoutMode = "horizontal" | "horizontal-mix" | "vertical" | "vertical-mix";
interface Props {
	mode: ThemeLayoutMode;
	reverse?: boolean;
	data: NavProps["data"];
}

const GlobalMenu = memo(({ mode, data }: Props) => {
	if (mode === "vertical") return <VerticalModule data={data} />;

	return <VerticalModule data={data} />;
});

export default GlobalMenu;
