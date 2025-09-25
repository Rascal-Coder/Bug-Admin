import { useEffect, useRef, useState } from "react";
import { Progress } from "@/ui/progress";

export function RouteLoadingProgress() {
	const [progress, setProgress] = useState(0);
	const rafRef = useRef<number | null>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		let lastHref = window.location.href;

		const handleRouteChange = () => {
			// 清理上一次的动画
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);

			setProgress(0);
			let currentProgress = 0;

			const step = () => {
				currentProgress += 4;
				if (currentProgress <= 90) {
					setProgress(currentProgress);
					rafRef.current = requestAnimationFrame(step);
				}
			};

			rafRef.current = requestAnimationFrame(step);

			timeoutRef.current = setTimeout(() => {
				if (rafRef.current) cancelAnimationFrame(rafRef.current);
				setProgress(100);
				setTimeout(() => setProgress(0), 100);
			}, 500);
		};

		// 监听 URL 变化
		const observer = new MutationObserver(() => {
			const currentHref = window.location.href;
			if (currentHref !== lastHref) {
				lastHref = currentHref;
				handleRouteChange();
			}
		});

		observer.observe(document, { subtree: true, childList: true });
		window.addEventListener("popstate", handleRouteChange);

		// 初始触发
		handleRouteChange();

		return () => {
			observer.disconnect();
			window.removeEventListener("popstate", handleRouteChange);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	return progress > 0 ? (
		<div className="fixed top-0 left-0 right-0 z-tooltip w-screen">
			<Progress value={progress} className="h-[3px] shadow-2xl" />
		</div>
	) : null;
}
