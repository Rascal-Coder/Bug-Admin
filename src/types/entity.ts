import type { BasicStatus } from "./enum";
import type { BackendMenuTree } from "./menu";
export interface CommonOptions {
	status?: BasicStatus;
	desc?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface UserInfo {
	id: string;
	email: string;
	username: string;
	password?: string;
	avatar?: string;
	roles?: Role[];
	status?: BasicStatus;
	permissions?: Permission[];
	menu?: BackendMenuTree[];
}

export interface Permission extends CommonOptions {
	id: string; // uuid
	name: string;
	code: string; // resource:action  example: "user-management:read"
}

export interface Role extends CommonOptions {
	id: string; // uuid
	name: string;
	code: string;
}

export interface UserToken {
	accessToken?: string;
	refreshToken?: string;
}

export interface Role extends CommonOptions {
	id: string; // uuid
	name: string;
	code: string;
}

export interface User extends CommonOptions {
	id: string; // uuid
	username: string;
	password: string;
	email: string;
	phone?: string;
	avatar?: string;
}
