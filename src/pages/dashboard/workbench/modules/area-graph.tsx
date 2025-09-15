import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Icon } from "@/components/icon";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/ui/chart";
import { Skeleton } from "@/ui/skeleton";
import { sleep } from "@/utils";

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	desktop: {
		label: "Desktop",
		color: "var(--primary)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--primary)",
	},
} satisfies ChartConfig;

export function AreaGraph() {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		sleep(1000).then(() => {
			setIsLoading(false);
		});
	}, []);
	return isLoading ? (
		<AreaGraphSkeleton />
	) : (
		<Card className="@container/card">
			<CardHeader>
				<CardTitle>Area Chart - Stacked</CardTitle>
				<CardDescription>Showing total visitors for the last 6 months</CardDescription>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<AreaChart
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<defs>
							<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1.0} />
								<stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
							</linearGradient>
							<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
						<Area dataKey="mobile" type="natural" fill="url(#fillMobile)" stroke="var(--color-mobile)" stackId="a" />
						<Area dataKey="desktop" type="natural" fill="url(#fillDesktop)" stroke="var(--color-desktop)" stackId="a" />
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 leading-none font-medium">
							Trending up by 5.2% this month <Icon icon="mdi:trending-up" size={20} />
						</div>
						<div className="text-muted-foreground flex items-center gap-2 leading-none">January - June 2024</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}

function AreaGraphSkeleton() {
	return (
		<Card>
			<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
					<Skeleton className="h-6 w-[180px]" />
					<Skeleton className="h-4 w-[250px]" />
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				{/* Area-like shape */}
				<div className="relative aspect-auto h-[280px] w-full">
					<div className="from-primary/5 to-primary/20 absolute inset-0 rounded-lg bg-linear-to-t" />
					<Skeleton className="absolute right-0 bottom-0 left-0 h-[1px]" /> {/* x-axis */}
					<Skeleton className="absolute top-0 bottom-0 left-0 w-[1px]" /> {/* y-axis */}
				</div>
			</CardContent>
		</Card>
	);
}
