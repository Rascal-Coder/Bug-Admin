import { Navigate, type RouteObject } from "react-router";
import AdminLayout from "@/components/layouts/layout";
// import Layouts from "@/components/layouts";
import { GLOBAL_CONFIG } from "@/global-config";
import LoginAuthGuard from "@/routes/components/login-auth-guard";
import { getBackendDashboardRoutes } from "./backend";
import { getFrontendDashboardRoutes } from "./frontend";

const getRoutes = (): RouteObject[] => {
	if (GLOBAL_CONFIG.routerMode === "frontend") {
		return getFrontendDashboardRoutes();
	}
	return getBackendDashboardRoutes();
};
export const dashboardRoutes: RouteObject[] = [
	{
		element: (
			<LoginAuthGuard>
				<AdminLayout />
			</LoginAuthGuard>
		),
		children: [{ index: true, element: <Navigate to={GLOBAL_CONFIG.defaultRoute} replace /> }, ...getRoutes()],
	},
];
