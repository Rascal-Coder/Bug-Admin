import { useMemo } from "react";
import { useSettings } from "@/store/settingStore";
import { LAYOUT_MODES } from "../constants/layoutConfig";

/**
 * 布局模式
 */
export const useLayoutMode = () => {
	const { layoutMode } = useSettings();

	const isHorizontal = layoutMode === LAYOUT_MODES.HORIZONTAL;
	const isVertical = layoutMode === LAYOUT_MODES.VERTICAL;
	const isMixed = layoutMode === LAYOUT_MODES.MIXED;
	const isDouble = layoutMode === LAYOUT_MODES.DOUBLE;

	return {
		layoutMode,
		isHorizontal,
		isVertical,
		isMixed,
		isDouble,
	};
};

/**
 * 获取当前布局模式对应的组件类型
 */
export const useLayoutComponents = () => {
	const { layoutMode } = useLayoutMode();

	return useMemo(() => {
		switch (layoutMode) {
			case LAYOUT_MODES.HORIZONTAL:
				return {
					headerLeft: LAYOUT_MODES.HORIZONTAL,
					sidebar: null,
				};
			case LAYOUT_MODES.VERTICAL:
				return {
					headerLeft: LAYOUT_MODES.VERTICAL,
					sidebar: LAYOUT_MODES.VERTICAL,
				};
			case LAYOUT_MODES.MIXED:
				return {
					headerLeft: LAYOUT_MODES.MIXED,
					sidebar: LAYOUT_MODES.MIXED,
				};
			case LAYOUT_MODES.DOUBLE:
				return {
					headerLeft: LAYOUT_MODES.VERTICAL,
					sidebar: LAYOUT_MODES.DOUBLE,
				};
			default:
				return {
					headerLeft: LAYOUT_MODES.VERTICAL,
					sidebar: LAYOUT_MODES.VERTICAL,
				};
		}
	}, [layoutMode]);
};
