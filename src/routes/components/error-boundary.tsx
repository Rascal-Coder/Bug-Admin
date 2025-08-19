import { useRouteError } from "react-router";

export default function ErrorBoundary() {
	const error = useRouteError();

	return <div>{error instanceof Error ? error.message : String(error)}</div>;
}
