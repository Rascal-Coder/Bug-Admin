/** biome-ignore-all lint/a11y/noStaticElementInteractions: false positive */
import { TabRouterLink } from "@/routes/components/tab-router-link";
import type { NavItemProps } from "../types";

type NavItemRendererProps = {
	item: NavItemProps;
	className: string;
	children: React.ReactNode;
};

/**
 * Renderer for Navigation Items.
 * Handles disabled, external link, clickable child container, and internal link logic.
 */
export const NavItemRenderer: React.FC<NavItemRendererProps> = ({ item, className, children }) => {
	const { disabled, hasChild, path, onClick, title, icon } = item;

	if (disabled) {
		return <div className={className}>{children}</div>;
	}

	if (hasChild) {
		// Vertical nav items with children are clickable containers
		return (
			<div className={className} onClick={onClick}>
				{children}
			</div>
		);
	}

	// Default: internal link with tab integration
	return (
		<TabRouterLink href={path} className={className} label={title} icon={typeof icon === "string" ? icon : undefined}>
			{children}
		</TabRouterLink>
	);
};
