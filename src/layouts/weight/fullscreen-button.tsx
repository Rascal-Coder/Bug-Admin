import { Maximize, Minimize } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/ui/button";

/**
 * Fullscreen Button Component
 */
export default function FullscreenButton() {
	const [isFullscreen, setIsFullscreen] = useState(false);

	// 检查当前是否为全屏状态
	useEffect(() => {
		const checkFullscreen = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		// 监听全屏状态变化
		document.addEventListener("fullscreenchange", checkFullscreen);

		return () => {
			document.removeEventListener("fullscreenchange", checkFullscreen);
		};
	}, []);

	// 切换全屏状态
	const toggleFullscreen = async () => {
		try {
			if (!document.fullscreenElement) {
				// 进入全屏
				await document.documentElement.requestFullscreen();
			} else {
				// 退出全屏
				await document.exitFullscreen();
			}
		} catch (error) {
			console.error("全屏操作失败:", error);
		}
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleFullscreen}
			className="h-8 w-8 rounded-full"
			title={isFullscreen ? "退出全屏" : "全屏"}
		>
			{isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
		</Button>
	);
}
