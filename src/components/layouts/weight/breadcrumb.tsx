import { ChevronDown } from "lucide-react";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { Link, useMatches } from "react-router";
import Icon from "@/components/icon/icon";
import { frontendNavData } from "@/components/layouts/nav-data/nav-data-frontend";
import type { NavItemDataProps } from "@/components/nav/types";
import {
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Breadcrumb as BreadcrumbUI,
} from "@/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";

interface BreadCrumbProps {
	maxItems?: number;
}

type NavItem = Pick<NavItemDataProps, "path" | "title" | "icon"> & {
	children?: NavItem[];
};

interface BreadcrumbItemData {
	key: string;
	label: string;
	icon?: string | React.ReactNode;
	items: Array<{
		key: string;
		label: string;
		icon?: string | React.ReactNode;
	}>;
}

export function Breadcrumb({ maxItems = 3 }: BreadCrumbProps) {
	const matches = useMatches();
	const navData = frontendNavData;
	const findPathInNavData = useCallback((path: string, items: NavItem[]): NavItem[] => {
		for (const item of items) {
			if (item.path === path) {
				return [item];
			}
			if (item.children) {
				const found = findPathInNavData(path, item.children);
				if (found.length > 0) {
					return [item, ...found];
				}
			}
		}
		return [];
	}, []);

	const breadCrumbs = useMemo(() => {
		const paths = matches.filter((item) => item.pathname !== "/").map((item) => item.pathname);

		const results: BreadcrumbItemData[] = [];

		for (const path of paths) {
			const navItems = navData.flatMap((section) => section.items);
			const pathItems = findPathInNavData(path, navItems);

			if (pathItems.length === 0) continue;

			const currentItem = pathItems[pathItems.length - 1];
			const children =
				currentItem.children?.map((child) => ({
					key: child.path,
					label: child.title,
					icon: child.icon,
				})) ?? [];

			results.push({
				key: currentItem.path,
				label: currentItem.title,
				icon: currentItem.icon,
				items: children,
			});
		}

		return results;
	}, [matches, findPathInNavData, navData]);

	const renderIcon = (icon?: string | React.ReactNode) => {
		return icon ? typeof icon === "string" ? <Icon icon={icon} size={16} /> : icon : <Icon icon="mdi:menu" size={16} />;
	};
	const renderBreadcrumbItem = (item: BreadcrumbItemData, isLast: boolean) => {
		const hasItems = item.items && item.items.length > 0;

		if (hasItems) {
			return (
				<BreadcrumbItem className="cursor-pointer hover:bg-accent rounded-lg hover:text-accent-foreground p-2">
					<DropdownMenu>
						<DropdownMenuTrigger className="cursor-pointer flex items-center gap-1">
							{renderIcon(item.icon)}
							{item.label}
							<ChevronDown className="h-4 w-4" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{item.items.map((subItem) => (
								<DropdownMenuItem key={subItem.key} asChild>
									<Link to={subItem.key} className="flex items-center gap-2">
										{renderIcon(subItem.icon)}
										{subItem.label}
									</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</BreadcrumbItem>
			);
		}
		return (
			<BreadcrumbItem className="rounded-lg p-2">
				{isLast && (
					<BreadcrumbPage className="flex items-center gap-2">
						{renderIcon(item.icon)}
						{item.label}
					</BreadcrumbPage>
				)}
			</BreadcrumbItem>
		);
	};

	const renderBreadcrumbs = () => {
		if (breadCrumbs.length <= maxItems) {
			return breadCrumbs.map((item, index) => (
				<React.Fragment key={item.key}>
					{renderBreadcrumbItem(item, index === breadCrumbs.length - 1)}
					{index < breadCrumbs.length - 1 && <BreadcrumbSeparator />}
				</React.Fragment>
			));
		}

		// Show first item, ellipsis, and last maxItems-1 items
		const firstItem = breadCrumbs[0];
		const lastItems = breadCrumbs.slice(-(maxItems - 1));
		const hiddenItems = breadCrumbs.slice(1, -(maxItems - 1));

		return (
			<>
				{renderBreadcrumbItem(firstItem, false)}
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex items-center gap-1">
							<div className="flex items-center gap-1 cursor-pointer hover:bg-accent rounded-lg hover:text-accent-foreground">
								<BreadcrumbEllipsis />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							{hiddenItems.map((item) => (
								<DropdownMenuItem key={item.key} asChild>
									<Link to={item.key} className="flex items-center gap-2">
										{renderIcon(item.icon)}
										{item.label}
									</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{lastItems.map((item, index) => (
					<React.Fragment key={item.key}>
						{renderBreadcrumbItem(item, index === lastItems.length - 1)}
						{index < lastItems.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</>
		);
	};

	return (
		<ScrollArea className="whitespace-nowrap px-2 bg-background">
			<BreadcrumbUI>
				<BreadcrumbList className="flex-nowrap!">{renderBreadcrumbs()}</BreadcrumbList>
			</BreadcrumbUI>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
