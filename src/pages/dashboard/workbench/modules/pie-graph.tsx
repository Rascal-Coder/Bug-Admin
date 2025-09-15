import * as React from "react";
import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import { Icon } from "@/components/icon";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/ui/chart";
import { Skeleton } from "@/ui/skeleton";
import { sleep } from "@/utils";

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--primary)" },
	{ browser: "safari", visitors: 200, fill: "var(--primary-light)" },
	{ browser: "firefox", visitors: 287, fill: "var(--primary-lighter)" },
	{ browser: "edge", visitors: 173, fill: "var(--primary-dark)" },
	{ browser: "other", visitors: 190, fill: "var(--primary-darker)" },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "var(--primary)",
	},
	safari: {
		label: "Safari",
		color: "var(--primary)",
	},
	firefox: {
		label: "Firefox",
		color: "var(--primary)",
	},
	edge: {
		label: "Edge",
		color: "var(--primary)",
	},
	other: {
		label: "Other",
		color: "var(--primary)",
	},
} satisfies ChartConfig;

export function PieGraph() {
	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
	}, []);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		sleep(1000).then(() => {
			setIsLoading(false);
		});
	}, []);
	return isLoading ? (
		<PieGraphSkeleton />
	) : (
		<Card className="@container/card">
			<CardHeader>
				<CardTitle>Pie Chart - Donut with Text</CardTitle>
				<CardDescription>
					<span className="hidden @[540px]/card:block">Total visitors by browser for the last 6 months</span>
					<span className="@[540px]/card:hidden">Browser distribution</span>
				</CardDescription>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
					<PieChart>
						<defs>
							{["chrome", "safari", "firefox", "edge", "other"].map((browser, index) => (
								<linearGradient key={browser} id={`fill${browser}`} x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor="var(--primary)" stopOpacity={1 - index * 0.15} />
									<stop offset="100%" stopColor="var(--primary)" stopOpacity={0.8 - index * 0.15} />
								</linearGradient>
							))}
						</defs>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie
							data={chartData.map((item) => ({
								...item,
								fill: `url(#fill${item.browser})`,
							}))}
							dataKey="visitors"
							nameKey="browser"
							innerRadius={60}
							strokeWidth={2}
							stroke="var(--background)"
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
												<tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
													Total Visitors
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 leading-none font-medium">
					Chrome leads with {((chartData[0].visitors / totalVisitors) * 100).toFixed(1)}%{" "}
					<Icon icon="mdi:trending-up" className="h-4 w-4" />
				</div>
				<div className="text-muted-foreground leading-none">Based on data from January - June 2024</div>
			</CardFooter>
		</Card>
	);
}

function PieGraphSkeleton() {
	return (
		<Card>
			<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
					<Skeleton className="h-6 w-[180px]" />
					<Skeleton className="h-4 w-[250px]" />
				</div>
			</CardHeader>
			<CardContent className="p-6">
				<div className="flex h-[280px] items-center justify-center">
					{/* Circular skeleton for pie chart */}
					<Skeleton className="h-[300px] w-[300px] rounded-full" />
				</div>
			</CardContent>
		</Card>
	);
}
