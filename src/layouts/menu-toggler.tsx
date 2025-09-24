import { useMemo } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";

const MenuToggler = ({ state }: { state: "expanded" | "collapsed" }) => {
	const iconMap = {
		expanded: "line-md:menu-fold-left",
		collapsed: "line-md:menu-fold-right",
	};
	const icon = useMemo(() => {
		return iconMap[state];
	}, [state]);
	return (
		<Button size="icon" variant="ghost">
			<Icon icon={icon} size={18}></Icon>
		</Button>
	);
};

export default MenuToggler;
