import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router";
import { Outlet } from "react-router";

const SignInPage = lazy(() => import("@/pages/sys/auth/sign-in"));
const SignUpPage = lazy(() => import("@/pages/sys/auth/sign-up"));
const ForgotPasswordPage = lazy(() => import("@/pages/sys/auth/forgot-password"));

const authCustom: RouteObject[] = [
	{
		path: "sign-in",
		element: <SignInPage />,
	},
	{
		path: "sign-up",
		element: <SignUpPage />,
	},
	{
		path: "forgot-password",
		element: <ForgotPasswordPage />,
	},
];

export const authRoutes: RouteObject[] = [
	{
		path: "auth",
		element: (
			<Suspense>
				<Outlet />
			</Suspense>
		),
		children: [...authCustom],
	},
];
