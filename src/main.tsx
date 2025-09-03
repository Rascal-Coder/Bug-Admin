import "./theme/theme.css";
import "./global.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import App from "./App.tsx";
import { GLOBAL_CONFIG } from "./global-config.ts";
import ErrorBoundary from "./routes/components/error-boundary";
import { routesSection } from "./routes/sections";

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
