import { type CSSProperties, type ReactNode, useMemo } from "react";
import { cn } from "@/utils";

export default function LayoutHeader({
	children,
	className,
	style,
}: {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
}) {
	const mergedCls = useMemo(() => {
		return cn("relative flex items-center", className);
	}, [className]);
	return (
		<header className={mergedCls} style={style}>
			{children}
		</header>
	);
}
