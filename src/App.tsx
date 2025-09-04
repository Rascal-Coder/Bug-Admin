import { Helmet, HelmetProvider } from "react-helmet-async";
import Logo from "./assets/icons/logo.svg";
import { MotionLazy } from "./components/animate/motion-lazy";
import { FixedSettingButton } from "./components/fixed-setting-button";
import { RouteLoadingProgress } from "./components/loading/route-loading";
// import { Toaster } from "sonner";
import Toast from "./components/toast";
import { GLOBAL_CONFIG } from "./global-config";
import { AntdAdapter } from "./theme/adapter/antd.adapter";
import { ThemeProvider } from "./theme/theme-provider";

if (import.meta.env.DEV) {
	import("react-scan").then(({ scan }) => {
		scan({
			enabled: false,
			showToolbar: true,
			log: false,
			animationSpeed: "fast",
		});
	});
}

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
				<Toast />
			</ThemeProvider>
		</HelmetProvider>
	);
}

export default App;
