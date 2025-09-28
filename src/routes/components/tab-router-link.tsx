import { useCallback } from "react";
import type { LinkProps } from "react-router";
import { useTabNavigation } from "@/hooks/use-tab-navigation";

interface TabRouterLinkProps extends Omit<LinkProps, "to"> {
	onClick?: () => void;
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
			if (!href) return;
			e.preventDefault();
			navigateToTab({
				path: href,
			});
		},
		[navigateToTab, href],
	);

	return (
		<a href={href} onClick={handleClick} {...props}>
			{children}
		</a>
	);
};
export default TabRouterLink;
