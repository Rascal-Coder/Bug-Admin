import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";

type Props = {
	src: string;
	title?: string;
	redirectDelay?: number;
};

export default function ExternalLink({ src, title = "外部链接", redirectDelay = 2000 }: Props) {
	const [countdown, setCountdown] = useState(Math.floor(redirectDelay / 1000));
	const [isRedirecting, setIsRedirecting] = useState(false);

	const handleRedirect = useCallback(() => {
		window.open(src, "_blank", "noopener,noreferrer");
	}, [src]);

	useEffect(() => {
		setIsRedirecting(true);
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					handleRedirect();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [handleRedirect]);

	if (!src) return null;
	return (
		<div className="h-full w-full flex items-center justify-center p-8">
			<Card className="w-full max-w-md gap-0!">
				<CardHeader className="text-center">
					<div className="flex justify-center items-center mb-4 gap-2">
						<Icon icon="material-symbols:open-in-new" size={20} className="text-primary" />
						<h2 className="text-xl font-semibold">{title}</h2>
					</div>
				</CardHeader>
				<CardContent className="text-center space-y-6">
					<div className="space-y-2">
						<p className="text-muted-foreground">即将跳转到外部网站</p>
						<div className="p-3 bg-muted rounded-lg">
							<p className="text-sm text-primary break-all">{src}</p>
						</div>
					</div>

					{isRedirecting && countdown > 0 && (
						<div className="space-y-2">
							<p className="text-sm text-muted-foreground">{countdown} 秒后自动跳转</p>
							<div className="w-full bg-muted rounded-full h-2">
								<div
									className="bg-primary h-2 rounded-full transition-all duration-1000 ease-linear"
									style={{
										width: `${((Math.floor(redirectDelay / 1000) - countdown) / Math.floor(redirectDelay / 1000)) * 100}%`,
									}}
								/>
							</div>
						</div>
					)}

					<div className="flex flex-col gap-3">
						<Button onClick={handleRedirect} className="w-full" size="lg">
							<Icon icon="material-symbols:open-in-new" className="mr-2 h-4 w-4" />
							立即跳转
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
