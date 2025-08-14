import { useRouteError } from "react-router";

export default function ErrorBoundary() {
	const error: any = useRouteError();

	return <div>{error}</div>;
}
