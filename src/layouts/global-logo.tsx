import { Icon } from "@/components/icon";
import { useRouter } from "@/routes/hooks";
import { cn } from "@/utils";

interface LogoProps {
	isMobile?: boolean;
	open?: boolean;
	className?: string;
	onClick?: () => void;
}

export function Logo({ isMobile = false, open = true, className, onClick }: LogoProps) {
	const router = useRouter();

	return (
		<div
			className={cn(
				"flex items-center gap-2 text-sm cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground",
				className,
			)}
			onClick={onClick || (() => router.push("/"))}
		>
			<div>
				<Icon icon="local-logo" size={40} />
			</div>
			<span
				className={cn("font-semibold text-xl leading-tight transition-all duration-300 ease-in-out whitespace-nowrap", {
					"opacity-0": !isMobile && !open,
				})}
			>
				Bug Admin
			</span>
		</div>
	);
}
