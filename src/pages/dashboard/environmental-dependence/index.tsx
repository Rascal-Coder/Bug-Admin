import { Badge, Card, Col, Row, Space, Typography } from "antd";
import { keys, map } from "lodash";
import type { FC } from "react";

import pckJson from "../../../../package.json";

const { Text } = Typography;

const EnvironmentalDependence: FC = () => {
	// 渲染依赖布局
	const renderDependenciesLayout = (dataSource: Record<string, string>, title: string) => {
		return (
			<Card title={title}>
				<Row gutter={[12, 10]}>
					{map(keys(dataSource), (key: string) => (
						<Col xs={24} sm={12} md={12} lg={8} xl={6} key={key}>
							<Badge.Ribbon text={dataSource[key]}>
								<Card>
									<Text strong ellipsis={{ tooltip: key }} style={{ width: "100%" }}>
										{key}
									</Text>
								</Card>
							</Badge.Ribbon>
						</Col>
					))}
				</Row>
			</Card>
		);
	};
	return (
		<Space direction="vertical" size="small" style={{ display: "flex" }}>
			{/* 生产环境依赖 */}
			{renderDependenciesLayout(pckJson.dependencies, "dependencies")}
			{/* 开发环境依赖 */}
			{renderDependenciesLayout(pckJson.devDependencies, "devDependencies")}
		</Space>
	);
};
export default EnvironmentalDependence;
