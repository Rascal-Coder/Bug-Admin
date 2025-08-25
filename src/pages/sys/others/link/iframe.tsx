import { useCallback, useEffect, useRef, useState } from "react";
import { LineLoading } from "@/components/loading";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";

type Props = {
	src: string;
	title?: string;
	allowFullscreen?: boolean;
	sandbox?: string;
};

export default function Iframe({
	src = "",
	title = "External Content",
	allowFullscreen = true,
	sandbox = "allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation",
}: Props) {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleLoad = useCallback(() => {
		setIsLoading(false);
		setHasError(false);
	}, []);

	const handleError = useCallback(() => {
		setIsLoading(false);
		setHasError(true);
	}, []);

	const handleRefresh = useCallback(() => {
		setIsLoading(true);
		setHasError(false);
		if (iframeRef.current) {
			// 重新加载iframe
			const currentSrc = iframeRef.current.src;
			iframeRef.current.src = "";
			iframeRef.current.src = currentSrc;
		}
	}, []);

	const handleFullscreen = useCallback(async () => {
		if (!containerRef.current) return;

		try {
			if (!isFullscreen) {
				await containerRef.current.requestFullscreen();
				setIsFullscreen(true);
			} else {
				await document.exitFullscreen();
				setIsFullscreen(false);
			}
		} catch (error) {
			console.warn("Fullscreen operation failed:", error);
		}
	}, [isFullscreen]);

	// 监听全屏状态变化
	const handleFullscreenChange = useCallback(() => {
		setIsFullscreen(!!document.fullscreenElement);
	}, []);

	// 添加全屏事件监听
	useEffect(() => {
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, [handleFullscreenChange]);

	// 验证URL格式
	const isValidUrl = (url: string) => {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	};

	// 如果URL无效，显示错误
	if (!src || !isValidUrl(src)) {
		return (
			<Card className="h-full w-full flex flex-col">
				<CardHeader className="flex-shrink-0 pb-3">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-destructive">无效的URL</h3>
					</div>
				</CardHeader>
				<CardContent className="flex-1 flex items-center justify-center">
					<div className="text-center text-muted-foreground">
						<p className="mb-2">提供的URL格式不正确</p>
						<p className="text-sm">URL: {src}</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<div ref={containerRef} className={`h-full w-full relative flex flex-col ${isFullscreen ? "bg-background" : ""}`}>
			{/* 控制栏 */}
			<div className="flex-shrink-0 bg-background border-b border-border p-2 flex items-center justify-between gap-2">
				<div className="flex items-center gap-2 flex-1 min-w-0">
					<span className="text-sm font-medium text-foreground truncate">{title}</span>
					<span className="text-xs text-muted-foreground truncate">{src}</span>
				</div>

				<div className="flex items-center gap-1">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isLoading} className="h-8 w-8 p-0">
								<svg
									className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
									/>
								</svg>
							</Button>
						</TooltipTrigger>
						<TooltipContent>刷新页面</TooltipContent>
					</Tooltip>

					{allowFullscreen && (
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="sm" onClick={handleFullscreen} className="h-8 w-8 p-0">
									<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										{isFullscreen ? (
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0 0l5.5 5.5"
											/>
										) : (
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
											/>
										)}
									</svg>
								</Button>
							</TooltipTrigger>
							<TooltipContent>{isFullscreen ? "退出全屏" : "全屏显示"}</TooltipContent>
						</Tooltip>
					)}

					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="sm" onClick={() => window.open(src, "_blank")} className="h-8 w-8 p-0">
								<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
							</Button>
						</TooltipTrigger>
						<TooltipContent>在新窗口中打开</TooltipContent>
					</Tooltip>
				</div>
			</div>

			{/* 内容区域 */}
			<div className="flex-1 relative">
				{/* 加载状态 */}
				{isLoading && (
					<div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
						<div className="text-center">
							<LineLoading />
							{/* <p className="mt-4 text-sm text-muted-foreground">正在加载内容...</p> */}
						</div>
					</div>
				)}

				{/* 错误状态 */}
				{hasError && !isLoading && (
					<div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
						<Card className="w-96 max-w-full mx-4">
							<CardContent className="pt-6 text-center">
								<div className="mb-4">
									<svg
										className="h-12 w-12 text-destructive mx-auto"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-semibold mb-2">加载失败</h3>
								<p className="text-muted-foreground mb-4">无法加载此内容，可能是网络问题或URL不可访问</p>
								<div className="flex gap-2 justify-center">
									<Button onClick={handleRefresh} variant="outline" size="sm">
										重试
									</Button>
									<Button onClick={() => window.open(src, "_blank")} variant="outline" size="sm">
										在新窗口中打开
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{/* iframe */}
				<iframe
					ref={iframeRef}
					src={src}
					title={title}
					className="h-full w-full border-0"
					onLoad={handleLoad}
					onError={handleError}
					sandbox={sandbox}
					allow="fullscreen"
					loading="lazy"
					style={{
						opacity: hasError ? 0 : 1,
						transition: "opacity 0.2s ease-in-out",
					}}
				/>
			</div>
		</div>
	);
}
