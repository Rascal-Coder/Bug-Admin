import { memo, useCallback, useMemo } from "react";
import { Icon } from "@/components/icon";
import { useUpdateSettings } from "@/hooks";
import { useSettings } from "@/store/settingStore";
import { Button } from "@/ui/button";

const MenuToggler = memo(function MenuToggler({ state }: { state: "expanded" | "collapsed" }) {
	const iconMap = {
		expanded: "line-md:menu-fold-left",
		collapsed: "line-md:menu-fold-right",
	};
	const { updateSettings } = useUpdateSettings();
	const { collapseSidebar } = useSettings();

	const icon = useMemo(() => {
		return iconMap[state];
	}, [state]);

	const handleToggle = useCallback(() => {
		updateSettings({
			collapseSidebar: !collapseSidebar,
		});
	}, [updateSettings, collapseSidebar]);

	return (
		<Button size="icon" variant="ghost" onClick={handleToggle}>
			<Icon icon={icon} size={18}></Icon>
		</Button>
	);
});

export default MenuToggler;
