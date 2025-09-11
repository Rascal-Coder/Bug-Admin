/** biome-ignore-all lint/suspicious/noArrayIndexKey: index */

import { useState } from "react";
import ControlPanel from "@/components/control-panel";
import { Scroller } from "@/components/scroller";
import { Card, CardContent } from "@/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import ScrollProgressView from "./scroll-progress-view";

export default function ScrollerPage() {
	const [selectedVariant, setSelectedVariant] = useState<string>("Default");

	const VARIANTS = [{ type: "scroller", values: ["Default", "Horizontal", "HideScrollbar", "WithNavigation"] }];

	const renderScrollerDemo = () => {
		switch (selectedVariant) {
			case "Horizontal":
				return (
					<Scroller orientation="horizontal" className="w-full p-4" asChild>
						<div className="flex items-center gap-2.5">
							{Array.from({ length: 10 }).map((_, index) => (
								<div
									key={index}
									className="flex h-32 w-[180px] shrink-0 flex-col items-center justify-center rounded-md bg-accent p-4"
								>
									<div className="font-medium text-lg">Card {index + 1}</div>
									<span className="text-muted-foreground text-sm">Scroll horizontally</span>
								</div>
							))}
						</div>
					</Scroller>
				);
			case "HideScrollbar":
				return (
					<Scroller className="flex h-80 w-full flex-col gap-2.5 p-4" hideScrollbar>
						{Array.from({ length: 20 }).map((_, index) => (
							<div key={index} className="flex h-40 flex-col rounded-md bg-accent p-4">
								<div className="font-medium text-lg">Card {index + 1}</div>
								<span className="text-muted-foreground text-sm">Scroll smoothly without visible scrollbars</span>
							</div>
						))}
					</Scroller>
				);
			case "WithNavigation":
				return (
					<Scroller
						hideScrollbar
						withNavigation
						scrollTriggerMode="press"
						className="flex h-80 w-full flex-col gap-2.5 p-4"
					>
						{Array.from({ length: 10 }).map((_, index) => (
							<div key={index} className="flex flex-col rounded-md bg-accent p-4">
								<div className="font-medium text-lg">Card {index + 1}</div>
								<span className="text-muted-foreground text-sm">Use the navigation arrows to scroll</span>
							</div>
						))}
					</Scroller>
				);
			default:
				return (
					<Scroller className="flex h-80 w-full flex-col gap-2.5 p-4">
						{Array.from({ length: 20 }).map((_, index) => (
							<div key={index} className="flex h-40 flex-col rounded-md bg-accent p-4">
								<div className="font-medium text-lg">Card {index + 1}</div>
								<span className="text-muted-foreground text-sm">This is a card description.</span>
							</div>
						))}
					</Scroller>
				);
		}
	};

	return (
		<div>
			<Tabs defaultValue="scroller">
				<TabsList>
					<TabsTrigger value="scroller">Scroller</TabsTrigger>
					<TabsTrigger value="progress">ScrollProgress</TabsTrigger>
				</TabsList>

				<TabsContent value="scroller">
					<Card>
						<CardContent>
							<div className="flex gap-4 w-full">
								<div className="flex-1 overflow-auto">{renderScrollerDemo()}</div>
								<div className="sticky top-0 w-60 shrink-0">
									<ControlPanel
										className="h-80"
										variantKey={VARIANTS}
										selectedVariant={selectedVariant}
										onChangeVarient={setSelectedVariant}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="progress">
					<ScrollProgressView />
				</TabsContent>
			</Tabs>
		</div>
	);
}
