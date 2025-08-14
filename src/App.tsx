import { Helmet, HelmetProvider } from "react-helmet-async";
import Logo from "./assets/icons/logo.svg";
import { MotionLazy } from "./components/animate/motion-lazy";
import { GLOBAL_CONFIG } from "./global-config";

function App({ children }: { children: React.ReactNode }) {
	return (
		<HelmetProvider>
			<Helmet>
				<title>{GLOBAL_CONFIG.appName}</title>
				<link rel="icon" href={Logo} />
			</Helmet>
			<MotionLazy>{children}</MotionLazy>
		</HelmetProvider>
	);
}

export default App;
