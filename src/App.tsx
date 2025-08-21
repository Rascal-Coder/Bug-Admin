import { Helmet, HelmetProvider } from "react-helmet-async";
import Logo from "./assets/icons/logo.svg";
import { MotionLazy } from "./components/animate/motion-lazy";
import { RouteLoadingProgress } from "./components/loading/route-loading";
import { GLOBAL_CONFIG } from "./global-config";
import { ThemeProvider } from "./theme/theme-provider";

function App({ children }: { children: React.ReactNode }) {
	return (
		<HelmetProvider>
			<ThemeProvider>
				<Helmet>
					<title>{GLOBAL_CONFIG.appName}</title>
					<link rel="icon" href={Logo} />
				</Helmet>
				<RouteLoadingProgress />
				<MotionLazy>{children}</MotionLazy>
			</ThemeProvider>
		</HelmetProvider>
	);
}

export default App;
