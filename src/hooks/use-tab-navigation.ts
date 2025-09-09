import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useTabActions } from "@/store/tabStore";

export interface NavigateToTabOptions {
	label: string;
	path: string;
	icon?: string;
	component?: string;
}

export function useTabNavigation() {
	const navigate = useNavigate();
	const { addTab } = useTabActions();

	const navigateToTab = useCallback(
		(options: NavigateToTabOptions) => {
			const { label, path, icon, component } = options;

			addTab({
				label,
				value: path,
				path,
				icon,
				component,
			});

			navigate(path);
		},
		[addTab, navigate],
	);

	return {
		navigateToTab,
	};
}
