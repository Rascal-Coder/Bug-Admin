import { useCallback } from "react";
import { useNavigate } from "react-router";

export interface NavigateToTabOptions {
	// label: string;
	path: string;
	// icon?: string;
	// component?: string;
}

export function useTabNavigation() {
	const navigate = useNavigate();
	const navigateToTab = useCallback(
		(options: NavigateToTabOptions) => {
			const { path } = options;
			navigate(path);
		},
		[navigate],
	);

	return {
		navigateToTab,
	};
}
