import { useCallback, useEffect } from "react";
import { useUserToken } from "@/store/userStore";
import { useRouter } from "../hooks";
import { GLOBAL_CONFIG } from "@/global-config";

type Props = {
	children: React.ReactNode;
};
export default function LoginAuthGuard({ children }: Props) {
	const router = useRouter();
	const { accessToken } = useUserToken();

	const check = useCallback(() => {
		if (!accessToken) {
			router.replace(GLOBAL_CONFIG.loginRoute);
		}
	}, [router, accessToken]);

	useEffect(() => {
		check();
	}, [check]);

	return <>{children}</>;
}
