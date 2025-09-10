import { memo, useCallback } from "react";
import type { LinkProps } from "react-router";
import { useTabNavigation } from "@/hooks/use-tab-navigation";

interface TabRouterLinkProps extends Omit<LinkProps, "to"> {
	href: string;
	label: string;
	icon?: string;
	component?: string;
	ref?: React.Ref<HTMLAnchorElement>;
}

const TabRouterLink: React.FC<TabRouterLinkProps> = ({ href, label, icon, component, children, ...props }) => {
	const { navigateToTab } = useTabNavigation();

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			e.preventDefault();
			console.log("href", href);

			navigateToTab({
				label,
				path: href,
				icon,
				component,
			});
		},
		[navigateToTab, href, label, icon, component],
	);

	return (
		<a href={href} onClick={handleClick} {...props}>
			{children}
		</a>
	);
};

export default memo(TabRouterLink);
