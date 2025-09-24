import { useEffect, useState } from "react";
import { useIsMobile } from "@/store/appStore";
// import { useMediaQuery } from "./use-media-query";
// import { getIsMobile } from "@/layouts/appStore";

export function useGetElementById(id: string) {
	const [container, setContainers] = useState<HTMLElement | null>();

	const isMobile = useIsMobile();
	// biome-ignore lint/correctness/useExhaustiveDependencies: false
	useEffect(() => {
		const element = document.getElementById(id);

		setContainers(element);
	}, [isMobile]);

	return container;
}
