import { SignInProvider } from "./providers/sign-in-provider";
// import { SignIn } from "./sign-in-1";
import { SignIn2 } from "./sign-in-2";

export default function Login() {
	return (
		<SignInProvider>
			<SignIn2 />
			{/* <SignIn /> */}
		</SignInProvider>
	);
}
