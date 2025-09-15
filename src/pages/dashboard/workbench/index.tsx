import { Icon } from "@/components/icon";
import NumberTicker from "@/components/number-ticker";
import { Badge } from "@/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { AreaGraph } from "./modules/area-graph";
import { BarGraph } from "./modules/bar-graph";
import { PieGraph } from "./modules/pie-graph";
import { RecentSales } from "./modules/recent-sales";

export default function Workbench() {
	return (
		<div className="flex flex-1 flex-col space-y-2">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
			</div>
			<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
				<Card className="@container/card">
					<CardHeader>
						<CardDescription>Total Revenue</CardDescription>
						<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
							<NumberTicker value={1250} prefix="$" />
						</CardTitle>
						<CardAction>
							<Badge variant="outline">
								<Icon icon="mdi:trending-up" />
								+12.5%
							</Badge>
						</CardAction>
					</CardHeader>
					<CardFooter className="flex-col items-start gap-1.5 text-sm">
						<div className="line-clamp-1 flex gap-2 font-medium">
							Trending up this month
							<Icon icon="mdi:trending-up" size={20} />
						</div>
						<div className="text-muted-foreground">Visitors for the last 6 months</div>
					</CardFooter>
				</Card>
				<Card className="@container/card">
					<CardHeader>
						<CardDescription>New Customers</CardDescription>
						<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
							<NumberTicker value={1234} />
						</CardTitle>
						<CardAction>
							<Badge variant="outline">
								<Icon icon="mdi:trending-down" />
								-20%
							</Badge>
						</CardAction>
					</CardHeader>
					<CardFooter className="flex-col items-start gap-1.5 text-sm">
						<div className="line-clamp-1 flex gap-2 font-medium">
							Down 20% this period
							<Icon icon="mdi:trending-down" size={20} />
						</div>
						<div className="text-muted-foreground">Acquisition needs attention</div>
					</CardFooter>
				</Card>
				<Card className="@container/card">
					<CardHeader>
						<CardDescription>Active Accounts</CardDescription>
						<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
							<NumberTicker value={45678} />
						</CardTitle>
						<CardAction>
							<Badge variant="outline">
								<Icon icon="mdi:trending-up" />
								+12.5%
							</Badge>
						</CardAction>
					</CardHeader>
					<CardFooter className="flex-col items-start gap-1.5 text-sm">
						<div className="line-clamp-1 flex gap-2 font-medium">
							Strong user retention
							<Icon icon="mdi:trending-up" size={20} />
						</div>
						<div className="text-muted-foreground">Engagement exceed targets</div>
					</CardFooter>
				</Card>
				<Card className="@container/card">
					<CardHeader>
						<CardDescription>Growth Rate</CardDescription>
						<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
							<NumberTicker value={4.5} decimalPlaces={2} suffix="%" />
						</CardTitle>
						<CardAction>
							<Badge variant="outline">
								<Icon icon="mdi:trending-up" />
								+4.5%
							</Badge>
						</CardAction>
					</CardHeader>
					<CardFooter className="flex-col items-start gap-1.5 text-sm">
						<div className="line-clamp-1 flex gap-2 font-medium">
							Steady performance increase <Icon icon="mdi:trending-up" size={20} />
						</div>
						<div className="text-muted-foreground">Meets growth projections</div>
					</CardFooter>
				</Card>
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
				<div className="col-span-4">
					<BarGraph></BarGraph>
				</div>
				<div className="col-span-4 md:col-span-3">
					{/* sales arallel routes */}
					<RecentSales></RecentSales>
				</div>
				<div className="col-span-4">
					<AreaGraph></AreaGraph>
				</div>
				<div className="col-span-4 md:col-span-3">
					<PieGraph></PieGraph>
				</div>
			</div>
		</div>
	);
}
