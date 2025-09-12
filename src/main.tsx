import "./theme/theme.css";
import "./styles/global.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { worker } from "./_mock";
import App from "./App.tsx";
import menuService from "./api/services/menuService.ts";
import registerLocalIcons from "./components/icon/register-icons.ts";
import { GLOBAL_CONFIG } from "./global-config.ts";
import ErrorBoundary from "./routes/components/error-boundary";
import { routesSection } from "./routes/sections";
import { urlJoin } from "./utils";

const charAt = `
$$$$$$$\                      
$$  __$$\                     
$$ |  $$ |$$\   $$\  $$$$$$\  
$$$$$$$\ |$$ |  $$ |$$  __$$\ 
$$  __$$\ $$ |  $$ |$$ /  $$ |
$$ |  $$ |$$ |  $$ |$$ |  $$ |
$$$$$$$  |\$$$$$$  |\$$$$$$$ |
\_______/  \______/  \____$$ |
                    $$\   $$ |
                    \$$$$$$  |
                     \______/                                                               
  `;
console.info(`%c${charAt}`, `color: #5BE49B`);

await registerLocalIcons();
await worker.start({
	onUnhandledRequest: "bypass",
	serviceWorker: { url: urlJoin(GLOBAL_CONFIG.publicPath, "mockServiceWorker.js") },
});

if (GLOBAL_CONFIG.routerMode === "backend") {
	await menuService.getMenuList();
}

const router = createBrowserRouter(
	[
		{
			Component: () => (
				<App>
					<Outlet />
				</App>
			),
			errorElement: <ErrorBoundary />,
			children: routesSection,
		},
	],
	{
		basename: GLOBAL_CONFIG.publicPath,
	},
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={router} />);
