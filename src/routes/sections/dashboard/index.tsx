import { Navigate, type RouteObject } from "react-router";
import Layouts from "@/components/layouts";
import { GLOBAL_CONFIG } from "@/global-config";
import { getFrontendDashboardRoutes } from "./frontend";

export const dashboardRoutes: RouteObject[] = [
	{
		element: <Layouts />,
		children: [
			{ index: true, element: <Navigate to={GLOBAL_CONFIG.defaultRoute} replace /> },
			...getFrontendDashboardRoutes(),
		],
	},
];
