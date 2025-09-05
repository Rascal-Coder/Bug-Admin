import { QRCodeSVG } from "qrcode.react";
import { ReturnButton } from "./return-button";
import { useSignInContext } from "../providers/sign-in-provider";

export function QrCodeForm() {
	const { backToSignIn } = useSignInContext();
	return (
		<>
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-lg font-semibold tracking-tight">Qr code sign in</h1>
				<p className="text-muted-foreground text-sm">scanning the code to complete the login</p>
			</div>

			<div className="flex w-full flex-col items-center justify-center p-4">
				<QRCodeSVG value="https://github.com/Rascal-Coder/Bug-Admin" size={200} />
			</div>
			<ReturnButton onClick={backToSignIn} />
		</>
	);
}
