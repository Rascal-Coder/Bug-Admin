import type { NavItemDataProps } from "@/components/nav/types";
import type { BasicStatus, PermissionType } from "./enum";

export interface CommonOptions {
	status?: BasicStatus;
	desc?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface BackendMenu extends CommonOptions, MenuMetaInfo {
	id: string; // uuid
	parentId: string;
	name: string;
	code: string;
	order?: number;
	type: PermissionType;
}

export type MenuMetaInfo = Partial<
	Pick<
		NavItemDataProps,
		"path" | "icon" | "caption" | "badge" | "badgeType" | "badgeVariants" | "disabled" | "auth" | "hidden"
	>
> & {
	externalLink?: URL;
	component?: string;
};

export type BackendMenuTree = BackendMenu & {
	children?: BackendMenuTree[];
};

export type FrontendMenuTree = Omit<BackendMenu, "code" | "parentId" | "id"> & {
	children?: FrontendMenuTree[];
};
