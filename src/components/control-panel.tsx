import { themeVars } from "@/theme/theme.css";
import { Card, CardContent } from "@/ui/card";
import { ScrollArea } from "@/ui/scroll-area";
import { cn } from "@/utils";

type Props = {
	variantKey: {
		type: string;
		values: string[];
	}[];
	selectedVariant: string;
	onChangeVarient: (varient: string) => void;
	className?: string;
};
export default function ControlPanel({ variantKey, selectedVariant, onChangeVarient, className }: Props) {
	const selectedStyle = (variantKey: string) => {
		return variantKey === selectedVariant
			? {
					backgroundColor: themeVars.colors.palette.primary.default,
					color: themeVars.colors.text.primary,
				}
			: {};
	};
	return (
		<Card>
			<CardContent>
				<ScrollArea className={cn("h-[480px]", className)}>
					{variantKey.map((item) => (
						<div key={item.type}>
							<div className="text-xs font-medium">{item.type.toUpperCase()}</div>
							<ul className="mb-4 ml-2 mt-2 text-gray-600">
								{item.values.map((item) => (
									<li
										key={item}
										className="m-2 cursor-pointer rounded-md p-2"
										onClick={() => onChangeVarient(item)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												onChangeVarient(item);
											}
										}}
										style={selectedStyle(item)}
									>
										{item}
									</li>
								))}
							</ul>
						</div>
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
