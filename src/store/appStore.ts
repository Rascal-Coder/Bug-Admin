import { create } from "zustand";

interface AppStore {
	isMobile: boolean;
	actions: {
		setIsMobile: (isMobile: boolean) => void;
	};
}

const useAppStore = create<AppStore>((set) => ({
	isMobile: false,
	actions: {
		setIsMobile: (isMobile) => {
			set({
				isMobile,
			});
		},
	},
}));

export const useIsMobile = () => useAppStore((state) => state.isMobile);
export const useAppActions = () => useAppStore((state) => state.actions);
