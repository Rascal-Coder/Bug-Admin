import { create } from "zustand";

interface AppStore {
	isMobile: boolean;
	isMobileOpen: boolean;
	actions: {
		setIsMobile: (isMobile: boolean) => void;
		setisMobileOpen: (isMobileOpen: boolean) => void;
	};
}

const useAppStore = create<AppStore>((set) => ({
	isMobile: false,
	isMobileOpen: false,
	actions: {
		setisMobileOpen: (isMobileOpen) => {
			set({
				isMobileOpen,
			});
		},
		setIsMobile: (isMobile) => {
			set({
				isMobile,
			});
		},
	},
}));

export const useIsMobile = () => useAppStore((state) => state.isMobile);
export const useAppActions = () => useAppStore((state) => state.actions);
export const useIsMobileOpen = () => useAppStore((state) => state.isMobileOpen);
