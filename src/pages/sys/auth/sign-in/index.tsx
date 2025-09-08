import { useSignInLayout } from "@/store/settingStore";
import { ToolBar } from "../tool-bar";
import { SignInProvider } from "./providers/sign-in-provider";
import { UnifiedSignIn } from "./unified-sign-in";

function SignPage() {
	const signInLayout = useSignInLayout();
	return (
		<>
			<SignInProvider>
				<UnifiedSignIn layout={signInLayout} />
			</SignInProvider>
			<ToolBar></ToolBar>
		</>
	);
}
// 默认导出简单布局
export default SignPage;
