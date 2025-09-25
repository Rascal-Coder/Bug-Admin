/** biome-ignore-all lint/a11y/noStaticElementInteractions: false positive */
// import { useToggle } from "react-use";
// import { Icon } from "@/components/icon";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
// import { cn } from "@/utils";
import type { NavGroupProps } from "../types";
import { NavList } from "./nav-list";

export function NavGroup({ name, items }: NavGroupProps) {
	// const [open, toggleOpen] = useToggle(true);
	// open={open} onClick={toggleOpen}
	return (
		<>
			<Group name={name} />
			<ul className="flex w-full flex-col gap-1">
				{items.map((item, index) => (
					<NavList key={item.title || index} data={item} depth={1} />
				))}
			</ul>
		</>
	);
}

function Group({ name }: { name?: string }) {
	return (
		name && (
			<div className="pt-4 pr-2 pb-2 pl-3">
				<div className="relative flex items-center">
					<div className="absolute left-0 right-0 top-1/2 h-px bg-border -translate-y-1/2"></div>
					<div className="h-4 leading-4 mx-6 rounded-sm text-xs font-medium text-text-disabled bg-background px-2 relative z-10">
						{name}
					</div>
				</div>
			</div>
		)
	);
}
