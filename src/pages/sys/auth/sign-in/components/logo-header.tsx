import { Icon } from "@/components/icon";

export function LogoHeader() {
	return (
		<div className="mb-4 flex items-center justify-center">
			<Icon icon="local-logo" size={40} />
			<h1 className="text-xl font-medium">Bug Admin</h1>
		</div>
	);
}
