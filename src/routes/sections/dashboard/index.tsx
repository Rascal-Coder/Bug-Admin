import { Suspense } from "react";
import { Navigate, Outlet, type RouteObject, ScrollRestoration } from "react-router";
import Layouts from "@/components/layouts";
import { GLOBAL_CONFIG } from "@/global-config";
import { getFrontendDashboardRoutes } from "./frontend";

export const dashboardRoutes: RouteObject[] = [
	{
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<Layouts>
					<Outlet />
					<ScrollRestoration />
				</Layouts>
			</Suspense>
		),
		children: [
			{ index: true, element: <Navigate to={GLOBAL_CONFIG.defaultRoute} replace /> },
			...getFrontendDashboardRoutes(),
		],
	},
];
