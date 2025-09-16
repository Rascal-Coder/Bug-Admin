import type { ReactNode } from "react";
import { useAuthCheck } from "./use-auth";

type AuthCheckStrategy = (checkFn: ReturnType<typeof useAuthCheck>) => boolean;

interface CheckConditions {
	check?: string;
	checkAny?: string[];
	checkAll?: string[];
}

interface AuthGuardProps {
	/**
	 * The content to be rendered if the user has the required permissions/roles
	 */
	children: ReactNode;
	/**
	 * The fallback content to be rendered if the user doesn't have the required permissions/roles
	 */
	fallback?: ReactNode;
	/**
	 * The permission/role to check
	 */
	check?: string;
	/**
	 * The permissions/roles to check (any one of them)
	 */
	checkAny?: string[];
	/**
	 * The permissions/roles to check (all of them)
	 */
	checkAll?: string[];
	/**
	 * The type of check to perform: 'role' or 'permission'
	 * @default 'permission'
	 */
	baseOn?: "role" | "permission";
}

/**
 * A wrapper component that conditionally renders its children based on user permissions/roles
 *
 * @example
 * // Check single permission
 * <AuthGuard check="user.create">
 *   <button>Create User</button>
 * </AuthGuard>
 *
 * @example
 * // Check multiple permissions (any)
 * <AuthGuard checkAny={["user.create", "user.edit"]}>
 *   <button>Edit User</button>
 * </AuthGuard>
 *
 * @example
 * // Check multiple permissions (all)
 * <AuthGuard checkAll={["user.create", "user.edit"]}>
 *   <button>Advanced Edit</button>
 * </AuthGuard>
 *
 * @example
 * // With fallback content
 * <AuthGuard check="admin" baseOn="role" fallback={<div>Access Denied</div>}>
 *   <AdminPanel />
 * </AuthGuard>
 */
export const AuthGuard = ({
	children,
	fallback = null,
	check,
	checkAny,
	checkAll,
	baseOn = "permission",
}: AuthGuardProps) => {
	const checkFn = useAuthCheck(baseOn);

	const strategies: Record<string, AuthCheckStrategy> = {
		// 单个权限/角色检查策略
		single: (checkFn) => (check ? checkFn.check(check) : false),
		// 任意权限/角色检查策略
		any: (checkFn) => (checkAny ? checkFn.checkAny(checkAny) : false),
		// 全部权限/角色检查策略
		all: (checkFn) => (checkAll ? checkFn.checkAll(checkAll) : false),
		// 默认策略：无检查条件时允许访问
		default: () => true,
	};

	const selectStrategy = (conditions: CheckConditions): string => {
		if (conditions.check) return "single";
		if (conditions.checkAny) return "any";
		if (conditions.checkAll) return "all";
		return "default";
	};

	// 权限检查
	const strategyKey = selectStrategy({ check, checkAny, checkAll });
	const hasAccess = strategies[strategyKey](checkFn);

	return hasAccess ? children : fallback;
};
