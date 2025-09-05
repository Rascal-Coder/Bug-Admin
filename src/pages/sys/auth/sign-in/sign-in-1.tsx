import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { AuthLayout } from "../auth-layout";
import { UserAuthForm } from "./components/user-auth-form";
import { SignInStateEnum, useSignInContext } from "./providers/sign-in-provider";
import { MobileForm } from "./components/mobile-form";
import { QrCodeForm } from "./components/qrcode-form";

export function SignIn() {
	const { signInState } = useSignInContext();

	return (
		<AuthLayout>
			<Card className="gap-4">
				{signInState === SignInStateEnum.LOGIN && (
					<>
						<CardHeader>
							<CardTitle className="text-lg text-center tracking-tight">Sign in</CardTitle>
							<CardDescription className="text-center">
								Enter your email and password below to <br />
								log into your account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<UserAuthForm />
						</CardContent>
						<CardFooter>
							<p className="text-muted-foreground px-8 text-center text-sm">
								By clicking sign in, you agree to our{" "}
								<span className="hover:text-primary underline underline-offset-4">Terms of Service</span> and{" "}
								<span className="hover:text-primary underline underline-offset-4">Privacy Policy</span>.
							</p>
						</CardFooter>
					</>
				)}
				{signInState === SignInStateEnum.MOBILE && (
					<CardContent>
						<MobileForm />
					</CardContent>
				)}
				{signInState === SignInStateEnum.QR_CODE && (
					<CardContent>
						<QrCodeForm />
					</CardContent>
				)}
			</Card>
		</AuthLayout>
	);
}
