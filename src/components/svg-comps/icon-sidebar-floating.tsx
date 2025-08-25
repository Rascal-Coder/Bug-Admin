import type { SVGProps } from "react";

export function IconSidebarFloating(props: SVGProps<SVGSVGElement>) {
	return (
		<svg data-name="icon-sidebar-floating" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 52" {...props}>
			<rect
				x={6}
				y={6}
				width={18}
				height={40}
				rx={4}
				ry={4}
				fill="currentColor"
				opacity={0.18}
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<g opacity={0.8}>
				<rect x={10} y={16} width={10} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={10} y={20} width={8} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={10} y={24} width={6} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={10} y={32} width={10} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={10} y={36} width={7} height={1.5} rx={0.75} fill="currentColor" />
			</g>
			<rect
				x={30}
				y={12}
				width={42}
				height={28}
				rx={3}
				ry={3}
				fill="currentColor"
				opacity={0.06}
				stroke="currentColor"
				strokeWidth="1"
			/>
			<g opacity={0.4}>
				<rect x={34} y={18} width={20} height={2} rx={1} fill="currentColor" />
				<rect x={34} y={24} width={28} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={34} y={28} width={24} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={34} y={32} width={16} height={1.5} rx={0.75} fill="currentColor" />
			</g>
		</svg>
	);
}
