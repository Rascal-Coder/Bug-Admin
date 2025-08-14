import packageJson from "../package.json";

/**
 * Global application configuration type definition
 */
export type GlobalConfig = {
	/** Default route path for the application */
	defaultRoute: string;
	/** Application name */
	appName: string;
	/** Application version number */
	appVersion: string;
	/** Public path for static assets */
	publicPath: string;
};

/**
 * Global configuration constants
 * Reads configuration from environment variables and package.json
 *
 * @warning
 * Please don't use the import.meta.env to get the configuration, use the GLOBAL_CONFIG instead
 */
export const GLOBAL_CONFIG: GlobalConfig = {
	defaultRoute: import.meta.env.VITE_APP_DEFAULT_ROUTE || "/workbench",
	appName: "Bug Admin",
	appVersion: packageJson.version,
	publicPath: import.meta.env.VITE_APP_PUBLIC_PATH || "/",
};
