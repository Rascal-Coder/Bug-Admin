import { Suspense } from "react";
import { Navigate, Outlet, type RouteObject, ScrollRestoration } from "react-router";
import { GLOBAL_CONFIG } from "@/global-config";
import { getFrontendDashboardRoutes } from "./frontend";

export const dashboardRoutes: RouteObject[] = [
	{
		element: (
			<div data-slot="slash-layout-root" className="w-full min-h-screen bg-background">
				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
					<ScrollRestoration />
				</Suspense>
			</div>
		),
		children: [
			{ index: true, element: <Navigate to={GLOBAL_CONFIG.defaultRoute} replace /> },
			...getFrontendDashboardRoutes(),
		],
	},
];
