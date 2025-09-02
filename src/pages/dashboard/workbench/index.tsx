// export default function Workbench() {
// 	return <div>Workbench</div>;
// }
import { Button, Card, Flex } from "antd";
import type React from "react";

const Workbench: React.FC = () => (
	<Card title="测试antd适配器">
		<Flex gap="small" wrap>
			<Button type="primary">Primary Button</Button>
			<Button>Default Button</Button>
			<Button type="dashed">Dashed Button</Button>
			<Button type="text">Text Button</Button>
			<Button type="link">Link Button</Button>
		</Flex>
	</Card>
);

export default Workbench;
