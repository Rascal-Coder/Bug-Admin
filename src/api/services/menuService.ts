import type { BackendMenu } from "@/types/menu";
import apiClient from "../apiClient";

export enum MenuApi {
	Menu = "/menu",
}

const getMenuList = () => apiClient.get<BackendMenu[]>({ url: MenuApi.Menu });

export default {
	getMenuList,
};
