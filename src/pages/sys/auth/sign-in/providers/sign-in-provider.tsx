import { createContext, type PropsWithChildren, useContext, useMemo, useState } from "react";

export enum SignInStateEnum {
	LOGIN = 0,
	MOBILE = 1,
	QR_CODE = 2,
}

interface SignInContextType {
	signInState: SignInStateEnum;
	setSignInState: (signInState: SignInStateEnum) => void;
	backToSignIn: () => void;
}
const SignInContext = createContext<SignInContextType>({
	signInState: SignInStateEnum.LOGIN,
	setSignInState: () => {},
	backToSignIn: () => {},
});

export function useSignInContext() {
	const context = useContext(SignInContext);
	return context;
}

export function SignInProvider({ children }: PropsWithChildren) {
	const [signInState, setSignInState] = useState(SignInStateEnum.LOGIN);

	function backToSignIn() {
		setSignInState(SignInStateEnum.LOGIN);
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	const value: SignInContextType = useMemo(() => ({ signInState, setSignInState, backToSignIn }), [signInState]);

	return <SignInContext.Provider value={value}>{children}</SignInContext.Provider>;
}
