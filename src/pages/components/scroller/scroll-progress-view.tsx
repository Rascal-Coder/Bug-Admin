import { faker } from "@faker-js/faker";
import { useScrollProgress } from "@/components/animate";
import { ScrollProgress } from "@/components/animate/scroll-progress";
import { themeVars } from "@/theme/theme.css";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

const TEXT = faker.lorem.paragraphs({ min: 20, max: 30 });
export default function ScrollProgressView() {
	const containerProgress = useScrollProgress("container");
	return (
		<>
			<Button variant="link" asChild>
				<a
					href="https://www.framer.com/motion/"
					style={{ color: themeVars.colors.palette.primary.default }}
					className="mb-4 block"
				>
					https://www.framer.com/motion/
				</a>
			</Button>
			<Card title="ScrollProgress">
				<CardHeader>
					<CardTitle>ScrollProgress</CardTitle>
				</CardHeader>
				<CardContent>
					<ScrollProgress scrollYProgress={containerProgress.scrollYProgress} />
					<div ref={containerProgress.elementRef} className="h-80 overflow-auto">
						{[...Array(4)].map((_, index) => (
							<div key={index}>{TEXT}</div>
						))}
					</div>
				</CardContent>
			</Card>
		</>
	);
}
