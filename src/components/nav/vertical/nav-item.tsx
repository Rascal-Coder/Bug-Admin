import DotBadge from "@/components/dot-badge";
import Icon from "@/components/icon/icon";
import { Badge } from "@/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils";
import { NavItemRenderer } from "../components";
import { navItemClasses, navItemStyles } from "../styles";
import type { NavItemProps } from "../types";

export function NavItem(item: NavItemProps) {
	const { title, icon, badge, badgeType, badgeVariants, caption, open, active, disabled, depth, hasChild } = item;

	const content = (
		<>
			{/* Icon */}
			{
				<span style={navItemStyles.icon} className="mr-2 items-center justify-center">
					{icon ? (
						<Icon className={navItemClasses.icon} icon={icon} size={16} />
					) : (
						<Icon icon="mdi:menu" size={16} className={navItemClasses.icon} />
					)}
				</span>
			}

			{/* Texts */}
			<span style={navItemStyles.texts}>
				{/* Title */}
				<span style={navItemStyles.title}>{title}</span>

				{/* Caption */}
				{caption && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span style={navItemStyles.caption}>{caption}</span>
							</TooltipTrigger>
							<TooltipContent side="top" align="start">
								{caption}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</span>

			{/* Badge */}
			{badge && badgeType === "normal" && <Badge variant={badgeVariants}>{badge}</Badge>}
			{badgeType === "dot" && <DotBadge variant={badgeVariants || "default"} />}

			{/* Arrow */}
			{hasChild && (
				<Icon
					icon="eva:arrow-ios-forward-fill"
					style={{
						...navItemStyles.arrow,
						transform: open ? "rotate(90deg)" : "rotate(0deg)",
					}}
				/>
			)}
		</>
	);

	const itemClassName = cn(
		navItemClasses.base,
		navItemClasses.hover,
		active && depth === 1 && navItemClasses.active,
		active && depth !== 1 && "bg-action-hover!",
		disabled && navItemClasses.disabled,
	);

	return (
		<NavItemRenderer item={item} className={itemClassName}>
			{content}
		</NavItemRenderer>
	);
}
