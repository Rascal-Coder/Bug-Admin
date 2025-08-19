import { Check, Moon, Sun } from "lucide-react";
import { type SettingsType, useSettingActions, useSettings } from "@/store/settingStore";
import { ThemeMode } from "@/types/enum";
// import { useEffect } from 'react'
import { Button } from "@/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
// import { useTheme } from '@/ui/theme-provider'
import { cn } from "@/utils";

export function ThemeSwitch() {
	const { setSettings } = useSettingActions();
	const settings = useSettings();
	const updateSettings = (partialSettings: Partial<SettingsType>) => {
		setSettings({
			...settings,
			...partialSettings,
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
				<DropdownMenuItem onClick={() => updateSettings({ themeMode: ThemeMode.Light })}>
					Light <Check size={14} className={cn("ms-auto", settings.themeMode !== ThemeMode.Light && "hidden")} />
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => updateSettings({ themeMode: ThemeMode.Dark })}>
					Dark
					<Check size={14} className={cn("ms-auto", settings.themeMode !== ThemeMode.Dark && "hidden")} />
				</DropdownMenuItem>
				{/* Todo: 添加系统主题 */}
				{/* <DropdownMenuItem onClick={() => setTheme('system')}>
          System
          <Check
            size={14}
            className={cn('ms-auto', theme !== 'system' && 'hidden')}
          />
        </DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
