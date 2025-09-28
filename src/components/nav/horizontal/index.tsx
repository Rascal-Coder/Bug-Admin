import { cn } from "@/utils";
import type { NavProps } from "../types";
import { NavGroup } from "./nav-group";

export function NavHorizontal({ data, className, mode, ...props }: NavProps & { mode: "0" | "1" }) {
	return (
		<nav className={cn("flex items-center gap-1 min-h-[var(--layout-nav-height-horizontal)]", className)} {...props}>
			{data.map((group, index) => (
				<NavGroup key={group.name || index} groupIcon={group.icon} name={group.name} items={group.items} mode={mode} />
			))}
		</nav>
	);
}
