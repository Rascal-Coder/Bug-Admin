import { lazy, Suspense } from "react";
import { Outlet, type RouteObject } from "react-router";
import { registerLocalIcons } from "@/components/icon";
import GlobalLoading from "@/components/loading/global-loading";

const Page403 = lazy(() => import("@/pages/sys/error/Page403"));
const Page404 = lazy(() => import("@/pages/sys/error/Page404"));
const Page500 = lazy(() => import("@/pages/sys/error/Page500"));

await registerLocalIcons();
export const mainRoutes: RouteObject[] = [
	{
		path: "/",
		element: (
			<Suspense fallback={<GlobalLoading />}>
				<Outlet />
			</Suspense>
		),
		children: [
			{ path: "500", element: <Page500 /> },
			{ path: "404", element: <Page404 /> },
			{ path: "403", element: <Page403 /> },
		],
	},
];
