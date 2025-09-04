import { toast } from "sonner";
import { Button } from "@/ui/button";
export default function Login() {
	return (
		<Button
			onClick={() => {
				toast.success("Login success");
			}}
		>
			Login
		</Button>
	);
}
