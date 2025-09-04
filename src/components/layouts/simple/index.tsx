import type React from "react";
import { Logo } from "../sidebar/app-sidebar";

type Props = {
	children: React.ReactNode;
};

function HeaderSimple() {
	return (
		<header className="flex h-16 w-full items-center justify-between px-6">
			<Logo />
		</header>
	);
}

export default function SimpleLayout({ children }: Props) {
	return (
		<div className="flex h-screen w-full flex-col text-text-base bg-bg">
			<HeaderSimple />
			{children}
		</div>
	);
}
