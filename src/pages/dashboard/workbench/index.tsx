import { Button, Card, Divider, Flex, Tag } from "antd";
import type React from "react";

const Workbench: React.FC = () => (
	<Card title="测试antd适配器">
		<Divider orientation="left">按钮</Divider>
		<Flex gap="small" wrap>
			<Button type="primary">Primary Button</Button>
			<Button>Default Button</Button>
			<Button type="dashed">Dashed Button</Button>
			<Button type="text">Text Button</Button>
			<Button type="link">Link Button</Button>
		</Flex>
		<Divider orientation="left">标签</Divider>
		<Flex gap="4px 0" wrap>
			<Tag color="success">success</Tag>
			<Tag color="processing">processing</Tag>
			<Tag color="error">error</Tag>
			<Tag color="warning">warning</Tag>
			<Tag color="default">default</Tag>
		</Flex>
	</Card>
);

export default Workbench;
