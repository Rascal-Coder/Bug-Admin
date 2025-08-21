import { Suspense } from "react";
import { Navigate, Outlet, type RouteObject, ScrollRestoration } from "react-router";
import Layouts from "@/components/layouts";

import { GLOBAL_CONFIG } from "@/global-config";
import { getFrontendDashboardRoutes } from "./frontend";
import GlobalLoading from "@/components/loading/global-loading";

export const dashboardRoutes: RouteObject[] = [
	{
		element: (
			<Layouts>
				<Suspense fallback={<GlobalLoading loading center width={80} text={GLOBAL_CONFIG.appName} />}>
					<Outlet />
					<ScrollRestoration />
				</Suspense>
			</Layouts>
		),
		children: [
			{ index: true, element: <Navigate to={GLOBAL_CONFIG.defaultRoute} replace /> },
			...getFrontendDashboardRoutes(),
		],
	},
];
