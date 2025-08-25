import type { SVGProps } from "react";

export function IconSidebarSidebar(props: SVGProps<SVGSVGElement>) {
	return (
		<svg data-name="icon-sidebar-sidebar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 52" {...props}>
			<rect
				x={8}
				y={8}
				width={64}
				height={36}
				rx={4}
				ry={4}
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				opacity={0.3}
			/>
			<rect x={8} y={8} width={16} height={36} rx={4} ry={4} fill="currentColor" opacity={0.12} />
			<line x1={24} y1={8} x2={24} y2={44} stroke="currentColor" strokeWidth="1" opacity={0.3} />
			<g opacity={0.6}>
				<rect x={11} y={16} width={10} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={11} y={20} width={8} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={11} y={24} width={6} height={1.5} rx={0.75} fill="currentColor" />
			</g>
			<g opacity={0.4}>
				<rect x={30} y={16} width={32} height={2} rx={1} fill="currentColor" />
				<rect x={30} y={22} width={28} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={30} y={26} width={24} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={30} y={30} width={20} height={1.5} rx={0.75} fill="currentColor" />
			</g>
		</svg>
	);
}
