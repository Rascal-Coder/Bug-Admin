import { Maximize, Minimize } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/ui/button";
import { cn } from "@/utils";

/**
 * Fullscreen Button Component
 */
const FullScreen = ({
	toggleFullscreen,
	full,
	className,
}: {
	toggleFullscreen: () => void;
	full: boolean;
	className?: string;
}) => {
	const mergedCls = useMemo(() => {
		return cn("h-8 w-8 rounded-full", className);
	}, [className]);
	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleFullscreen}
			className={mergedCls}
			title={full ? "退出全屏" : "全屏"}
		>
			{full ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
		</Button>
	);
};

export default FullScreen;
