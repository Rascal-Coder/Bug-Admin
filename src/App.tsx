import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import Logo from "./assets/icons/logo.svg";
import { MotionLazy } from "./components/animate/motion-lazy";
import { FixedSettingButton } from "./components/fixed-setting-button";
import { RouteLoadingProgress } from "./components/loading/route-loading";
import { GLOBAL_CONFIG } from "./global-config";
import { AntdAdapter } from "./theme/adapter/antd.adapter";
import { ThemeProvider } from "./theme/theme-provider";

function App({ children }: { children: React.ReactNode }) {
	return (
		<HelmetProvider>
			<ThemeProvider adapters={[AntdAdapter]}>
				<Helmet>
					<title>{GLOBAL_CONFIG.appName}</title>
					<link rel="icon" href={Logo} />
				</Helmet>
				<RouteLoadingProgress />
				<MotionLazy>{children}</MotionLazy>
				<FixedSettingButton />
				<Toaster position="top-center" richColors />
			</ThemeProvider>
		</HelmetProvider>
	);
}

export default App;
