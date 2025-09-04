import type { RouteObject } from "react-router";
import { frontendNavConfig } from "@/components/layouts/nav-data/nav-data-frontend";
import { convertToRoute } from "@/utils/convert";

export function getFrontendDashboardRoutes(): RouteObject[] {
	const frontendDashboardRoutes: RouteObject[] = convertToRoute(frontendNavConfig);
	return frontendDashboardRoutes;
}
