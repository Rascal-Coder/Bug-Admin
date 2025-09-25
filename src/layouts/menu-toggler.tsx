import { useMemo } from "react";
import { Icon } from "@/components/icon";
import { useUpdateSettings } from "@/hooks";
import { useSettings } from "@/store/settingStore";
// import { useSettingActions, useSettings } from "@/store/settingStore";
import { Button } from "@/ui/button";

const MenuToggler = ({ state }: { state: "expanded" | "collapsed" }) => {
	const iconMap = {
		expanded: "line-md:menu-fold-left",
		collapsed: "line-md:menu-fold-right",
	};
	const { updateSettings } = useUpdateSettings();
	const { collapseSidebar } = useSettings();
	const icon = useMemo(() => {
		return iconMap[state];
	}, [state]);
	return (
		<Button
			size="icon"
			variant="ghost"
			onClick={() =>
				updateSettings({
					collapseSidebar: !collapseSidebar,
				})
			}
		>
			<Icon icon={icon} size={18}></Icon>
		</Button>
	);
};

export default MenuToggler;
