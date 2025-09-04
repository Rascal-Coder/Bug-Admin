import { DB_MENU } from "@/_mock/assets";
import { convertToRoute } from "@/utils/convert";
import { convertFlatToTree } from "@/utils/tree";

export function getBackendDashboardRoutes() {
	const backendDashboardRoutes = convertToRoute(convertFlatToTree(DB_MENU));
	return backendDashboardRoutes;
}
