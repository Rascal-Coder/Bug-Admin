import type { LinkProps } from "react-router";
import { useTabNavigation } from "@/hooks/use-tab-navigation";

interface TabRouterLinkProps extends Omit<LinkProps, "to"> {
	href: string;
	label: string;
	icon?: string;
	component?: string;
	ref?: React.Ref<HTMLAnchorElement>;
}

export const TabRouterLink: React.FC<TabRouterLinkProps> = ({
	href,
	label,
	icon,
	component,
	children,
	onClick,
	...props
}) => {
	const { navigateToTab } = useTabNavigation();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();

		onClick?.(e);

		navigateToTab({
			label,
			path: href,
			icon,
			component,
		});
	};

	return (
		<a href={href} onClick={handleClick} {...props}>
			{children}
		</a>
	);
};
