import type { RouteObject } from "react-router";
import { convertToRoute } from "@/utils/convert";
import { frontendNavConfig } from "../../nav-data/nav-data-frontend";

export function getFrontendDashboardRoutes(): RouteObject[] {
	const frontendDashboardRoutes: RouteObject[] = convertToRoute(frontendNavConfig);
	return frontendDashboardRoutes;
}
