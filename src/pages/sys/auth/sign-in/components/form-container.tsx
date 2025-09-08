import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { SignInStateEnum } from "../providers/sign-in-provider";
import { MobileForm } from "./mobile-form";
import { PrivacyTerms } from "./privacy-terms";
import { QrCodeForm } from "./qrcode-form";
import { UserAuthForm } from "./user-auth-form";

interface FormContainerProps {
	signInState: SignInStateEnum;
}

export function FormContainer({ signInState }: FormContainerProps) {
	const renderLoginForm = () => (
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
				<PrivacyTerms />
			</CardFooter>
		</>
	);

	const renderMobileForm = () => (
		<>
			<CardContent>
				<MobileForm />
			</CardContent>
		</>
	);

	const renderQrCodeForm = () => (
		<>
			<CardContent>
				<QrCodeForm />
			</CardContent>
		</>
	);

	const renderContent = () => {
		switch (signInState) {
			case SignInStateEnum.LOGIN:
				return renderLoginForm();
			case SignInStateEnum.MOBILE:
				return renderMobileForm();
			case SignInStateEnum.QR_CODE:
				return renderQrCodeForm();
			default:
				return null;
		}
	};

	return <Card className="gap-4">{renderContent()}</Card>;
}
