import DotBadge from "@/components/dot-badge";
import Icon from "@/components/icon/icon";
import { Badge } from "@/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import { NavItemRenderer } from "../components";
import { navItemClasses, navItemStyles } from "../styles";
import type { NavItemProps } from "../types";

export const NavSubItem = (item: NavItemProps) => {
	const { badge, badgeType, badgeVariants, icon } = item;
	const content = (
		<>
			{/* Icon */}
			{
				<span style={navItemStyles.icon} className="mr-2 items-center justify-center">
					{icon ? (
						<Icon className={navItemClasses.icon} icon={icon} size={20} />
					) : (
						<Icon icon="mdi:menu" size={24} className={navItemClasses.icon} />
					)}
				</span>
			}

			{/* Title */}
			<span style={navItemStyles.title} className="flex-auto">
				{item.title}
			</span>

			{/* Caption */}
			{item.caption && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Icon icon="solar:info-circle-linear" size={16} />
						</TooltipTrigger>
						<TooltipContent>
							<p>{item.caption}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}

			{/* Badge */}
			{badge && badgeType === "normal" && <Badge variant={badgeVariants}>{badge}</Badge>}
			{badgeType === "dot" && <DotBadge variant={badgeVariants || "default"} />}

			{/* Arrow */}
			{item.hasChild && <Icon icon="eva:arrow-ios-forward-fill" style={navItemStyles.arrow} />}
		</>
	);

	const itemClassName = cn(
		navItemClasses.base,
		navItemClasses.hover,
		item.active && item.depth === 1 && navItemClasses.active,
		item.active && item.depth !== 1 && "bg-action-hover!",
		item.disabled && navItemClasses.disabled,
	);

	return (
		<NavItemRenderer item={item} className={itemClassName}>
			{content}
		</NavItemRenderer>
	);
};
