import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";

interface ReturnButtonProps {
	onClick?: () => void;
}
export function ReturnButton({ onClick }: ReturnButtonProps) {
	return (
		<Button variant="link" onClick={onClick} className="w-full cursor-pointer text-accent-foreground">
			<Icon icon="solar:alt-arrow-left-linear" size={20} />
			<span className="text-sm">Back to sign in</span>
		</Button>
	);
}
