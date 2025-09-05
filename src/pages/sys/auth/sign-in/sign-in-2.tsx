import { Icon } from "@/components/icon";
import { cn } from "@/utils";
import RightExample from "./components/right-example";
import { UserAuthForm } from "./components/user-auth-form";
import { SignInStateEnum, useSignInContext } from "./providers/sign-in-provider";
import { MobileForm } from "./components/mobile-form";
import { QrCodeForm } from "./components/qrcode-form";
export function SignIn2() {
	const { signInState } = useSignInContext();
	return (
		<div className="relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div
				className={cn(
					"bg-muted relative h-full overflow-hidden max-lg:hidden",
					"[&>img]:absolute [&>img]:top-[15%] [&>img]:left-20 [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:object-top-left [&>img]:select-none",
				)}
			>
				<RightExample />
			</div>
			<div className="lg:p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8">
					<div className="mb-4 flex items-center justify-center">
						<Icon icon="local-logo" size={40} />
						<h1 className="text-xl font-medium">Bug Admin</h1>
					</div>
				</div>

				<div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-2">
					{signInState === SignInStateEnum.LOGIN && (
						<>
							<div className="flex flex-col space-y-2 text-center">
								<h2 className="text-lg font-semibold tracking-tight">Sign in</h2>
								<p className="text-muted-foreground text-sm">
									Enter your email and password below <br />
									to log into your account
								</p>
							</div>
							<UserAuthForm />
							<p className="text-muted-foreground px-8 text-center text-sm">
								By clicking sign in, you agree to our{" "}
								<span className="hover:text-primary underline underline-offset-4">Terms of Service</span> and{" "}
								<span className="hover:text-primary underline underline-offset-4">Privacy Policy</span>.
							</p>
						</>
					)}
					{signInState === SignInStateEnum.MOBILE && (
						<>
							<MobileForm />
						</>
					)}
					{signInState === SignInStateEnum.QR_CODE && <QrCodeForm />}
				</div>
			</div>
		</div>
	);
}
