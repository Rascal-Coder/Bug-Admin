import type { SVGProps } from "react";

export function IconSidebarInset(props: SVGProps<SVGSVGElement>) {
	return (
		<svg data-name="icon-sidebar-inset" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 52" {...props}>
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
			<rect x={10} y={10} width={16} height={32} rx={2} ry={2} fill="currentColor" opacity={0.08} />
			<g opacity={0.4}>
				<rect x={13} y={16} width={10} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={13} y={20} width={8} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={13} y={24} width={6} height={1.5} rx={0.75} fill="currentColor" />
			</g>
			<rect
				x={30}
				y={12}
				width={38}
				height={28}
				rx={3}
				ry={3}
				fill="currentColor"
				opacity={0.15}
				stroke="currentColor"
				strokeWidth="1"
			/>
			<g opacity={0.7}>
				<rect x={34} y={18} width={24} height={2} rx={1} fill="currentColor" />
				<rect x={34} y={24} width={28} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={34} y={28} width={20} height={1.5} rx={0.75} fill="currentColor" />
				<rect x={34} y={32} width={16} height={1.5} rx={0.75} fill="currentColor" />
			</g>
		</svg>
	);
}
