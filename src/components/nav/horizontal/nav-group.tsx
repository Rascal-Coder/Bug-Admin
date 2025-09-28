import { useMemo } from "react";
import type { NavGroupProps } from "../types";
import { NavList } from "./nav-list";

export function NavGroup({
	items,
	name,
	groupIcon,
	mode = "0",
}: NavGroupProps & { groupIcon: string | undefined; mode?: "0" | "1" }) {
	const renderItems = useMemo(() => {
		const groupItem = [
			{
				path: "",
				title: name || "",
				icon: groupIcon,
			},
		];
		if (mode === "0") {
			return items.map((item, index) => <NavList key={item.title || index} data={item} depth={1} />);
		}
		if (mode === "1") {
			return groupItem.map((item, index) => <NavList key={item.title || index} data={item} depth={1} />);
		}
	}, [name, groupIcon, items, mode]);
	return (
		<li className="flex items-center">
			<ul className="flex flex-row gap-1">{renderItems}</ul>
		</li>
	);
}
