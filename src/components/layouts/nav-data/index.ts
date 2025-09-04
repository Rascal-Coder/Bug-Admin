import { GLOBAL_CONFIG } from "@/global-config";
import { backendNavData } from "./nav-data-backend";
import { frontendNavData } from "./nav-data-frontend";

export const navData = GLOBAL_CONFIG.routerMode === "backend" ? backendNavData : frontendNavData;
