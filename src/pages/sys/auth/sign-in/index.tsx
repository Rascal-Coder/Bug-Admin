import { Helmet } from "react-helmet-async";
import { useSignInLayout } from "@/store/settingStore";
import { ToolBar } from "../tool-bar";
import { SignInProvider } from "./providers/sign-in-provider";
import { UnifiedSignIn } from "./unified-sign-in";

function SignPage() {
	const signInLayout = useSignInLayout();
	return (
		<>
			<Helmet>
				<title>Sign In - Bug Admin</title>
			</Helmet>
			<SignInProvider>
				<UnifiedSignIn layout={signInLayout} />
			</SignInProvider>
			<ToolBar></ToolBar>
		</>
	);
}
// 默认导出简单布局
export default SignPage;
