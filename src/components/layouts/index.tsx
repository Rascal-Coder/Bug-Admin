import { useSettings } from "@/store/settingStore";
import DoubleLayout from "./double-layout";
import HorizontalLayout from "./horizontal-layout";
import MixedLayout from "./mixed-layout";
import VerticalLayout from "./vertical-layout";

export default function Layouts() {
	const { layoutMode } = useSettings();
	const layoutMap = {
		vertical: <VerticalLayout />,
		horizontal: <HorizontalLayout />,
		mixed: <MixedLayout />,
		double: <DoubleLayout />,
	};
	return <>{layoutMap[layoutMode]}</>;
}
