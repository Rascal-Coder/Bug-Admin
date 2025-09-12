import { Check, Moon, Sun } from "lucide-react";
import { useSystemTheme, useUpdateSettings } from "@/hooks";
import { ThemeMode } from "@/types/enum";
import { Button } from "@/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { cn } from "@/utils";
export function ThemeSwitch() {
	const { updateSettings, settings } = useUpdateSettings();
	const systemTheme = useSystemTheme();
	const handleThemeChange = (event: React.MouseEvent<HTMLDivElement>, theme: ThemeMode) => {
		const isDark = theme === ThemeMode.Dark || (theme === ThemeMode.System && systemTheme === ThemeMode.Dark);
		const isAppearanceTransition =
			// @ts-expect-error
			document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!isAppearanceTransition || !event) {
			updateSettings({ themeMode: theme });
			return;
		}
		const transition = document.startViewTransition(async () => {
			updateSettings({ themeMode: theme });
		});

		const x = event.clientX;
		const y = event.clientY;
		const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
		transition.ready.then(() => {
			const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
			document.documentElement.animate(
				{
					clipPath: isDark ? [...clipPath].reverse() : clipPath,
				},
				{
					duration: 450,
					easing: "ease-out",
					pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
				},
			);
		});
	};
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="scale-95 rounded-full">
					<Sun className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={(event) => handleThemeChange(event, ThemeMode.Light)}>
					Light <Check size={14} className={cn("ms-auto", settings.themeMode !== ThemeMode.Light && "hidden")} />
				</DropdownMenuItem>
				<DropdownMenuItem onClick={(event) => handleThemeChange(event, ThemeMode.Dark)}>
					Dark
					<Check size={14} className={cn("ms-auto", settings.themeMode !== ThemeMode.Dark && "hidden")} />
				</DropdownMenuItem>
				<DropdownMenuItem onClick={(event) => handleThemeChange(event, ThemeMode.System)}>
					System
					<Check size={14} className={cn("ms-auto", settings.themeMode !== ThemeMode.System && "hidden")} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
