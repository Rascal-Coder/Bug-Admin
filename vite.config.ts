import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const base = env.VITE_APP_PUBLIC_PATH || "/";
	const isProduction = mode === "production";
	return {
		base,
		plugins: [react(), tsconfigPaths(), tailwindcss()],
		server: {
			open: true,
			host: true,
			port: 3001,
		},
		esbuild: {
			drop: isProduction ? ["console", "debugger"] : [],
			legalComments: "none",
			target: "esnext",
		},
		alias: {
			"@": path.resolve(__dirname, "src"),
			"#": path.resolve(__dirname, "src/types"),
		},
	};
});
