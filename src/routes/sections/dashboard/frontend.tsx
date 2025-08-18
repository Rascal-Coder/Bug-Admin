import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import { Component } from "./utils";

export function getFrontendDashboardRoutes(): RouteObject[] {
	const frontendDashboardRoutes: RouteObject[] = [
		{ path: "workbench", element: Component("/pages/dashboard/workbench") },
		{ path: "analysis", element: Component("/pages/dashboard/analysis") },
		{
			path: "menu_level",
			children: [
				{ index: true, element: <Navigate to="1a" replace /> },
				{ path: "1a", element: Component("/pages/dashboard/menu-level/menu-level-1a") },
				{
					path: "1b",
					children: [
						{ index: true, element: <Navigate to="2a" replace /> },
						{ path: "2a", element: Component("/pages/dashboard/menu-level/menu-level-1b/menu-level-2a") },
						{
							path: "2b",
							children: [
								{ index: true, element: <Navigate to="3a" replace /> },
								{
									path: "3a",
									element: Component("/pages/dashboard/menu-level/menu-level-1b/menu-level-2b/menu-level-3a"),
								},
								{
									path: "3b",
									element: Component("/pages/dashboard/menu-level/menu-level-1b/menu-level-2b/menu-level-3b"),
								},
							],
						},
					],
				},
			],
		},
	];
	return frontendDashboardRoutes;
}
