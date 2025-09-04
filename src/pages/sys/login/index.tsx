import { useNavigate } from "react-router";
import { GLOBAL_CONFIG } from "@/global-config";
import { useSignIn } from "@/store/userStore";
import { Button } from "@/ui/button";
export default function Login() {
	const signIn = useSignIn();
	const navigatge = useNavigate();
	const handleSignIn = async () => {
		await signIn({ username: "admin", password: "demo1234" });
		navigatge(GLOBAL_CONFIG.defaultRoute, { replace: true });
	};
	return (
		<Button
			onClick={() => {
				handleSignIn();
			}}
		>
			Login
		</Button>
	);
}
