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
				{ path: "1a", element: Component("/pages/menu-level/menu-level-1a") },
				{
					path: "1b",
					children: [
						{ index: true, element: <Navigate to="2a" replace /> },
						{ path: "2a", element: Component("/pages/menu-level/menu-level-1b/menu-level-2a") },
						{
							path: "2b",
							children: [
								{ index: true, element: <Navigate to="3a" replace /> },
								{
									path: "3a",
									element: Component("/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3a"),
								},
								{
									path: "3b",
									element: Component("/pages/menu-level/menu-level-1b/menu-level-2b/menu-level-3b"),
								},
							],
						},
					],
				},
			],
		},
		{
			path: "error",
			children: [
				{ index: true, element: <Navigate to="403" replace /> },
				{ path: "403", element: Component("/pages/sys/error/Page403") },
				{ path: "404", element: Component("/pages/sys/error/Page404") },
				{ path: "500", element: Component("/pages/sys/error/Page500") },
			],
		},
		{
			path: "components",
			children: [
				{ index: true, element: <Navigate to="icon" replace /> },
				{ path: "icon", element: Component("/pages/components/icon") },
				{ path: "toast", element: Component("/pages/components/toast") },
			],
		},
		{
			path: "link",
			children: [
				{ index: true, element: <Navigate to="iframe" replace /> },
				{
					path: "iframe",
					element: Component("/pages/others/link/iframe", { src: "https://ant.design/index-cn" }),
				},
				{
					path: "external-link",
					element: Component("/pages/others/link/external-link", { src: "https://ant.design/index-cn" }),
				},
			],
		},
	];
	return frontendDashboardRoutes;
}
