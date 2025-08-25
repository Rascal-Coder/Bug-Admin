import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import GlobalLoading from "@/components/loading/global-loading";
import { useSettings } from "@/store/settingStore";
import { cn } from "@/utils";

// type MainProps = React.HTMLAttributes<HTMLElement> & {
// 	fixed?: boolean;
// 	fluid?: boolean;
// 	ref?: React.Ref<HTMLElement>;
// };

export function Main() {
	const { themeStretch } = useSettings();
	return (
		<main
			data-layout="bug-admin-layout"
			className={cn(
				"flex-auto w-full flex flex-col",
				"transition-[max-width] duration-300 ease-in-out",
				"px-4 sm:px-6 py-4 sm:py-6 md:px-8 mx-auto",
				{
					"max-w-full": themeStretch,
					"xl:max-w-screen-xl": !themeStretch,
				},
			)}
			style={{
				willChange: "max-width",
			}}
		>
			<Suspense fallback={<GlobalLoading loading center width={80} />}>
				<Outlet />
				<ScrollRestoration />
			</Suspense>
		</main>
	);
}
