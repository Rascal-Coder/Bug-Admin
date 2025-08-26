import { useState } from "react";
import { LocalEnum } from "#/enum";
import { Icon } from "@/components/icon";
import { Button } from "@/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";

type Locale = keyof typeof LocalEnum;

/**
 * Locale Picker
 */
export default function LocalePicker() {
	// TODO: useLocale 封装
	const [locale, setLocale] = useState<Locale>(LocalEnum.en_US);
	const LANGUAGE_MAP = {
		en_US: {
			locale: "en_US",
			label: "English",
			icon: "flag-us",
		},
		zh_CN: {
			locale: "zh_CN",
			label: "Chinese",
			icon: "flag-cn",
		},
	};
	const localeList = Object.values(LANGUAGE_MAP).map((item) => {
		return {
			key: item.locale,
			label: item.label,
			icon: <Icon icon={`local:${item.icon}`} size="20" className="rounded-md" />,
		};
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full">
					<Icon icon={`local:${LANGUAGE_MAP[locale].icon}`} size="20" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{localeList.map((item) => (
					<DropdownMenuItem key={item.key} onClick={() => setLocale(item.key as Locale)}>
						{item.icon}
						{item.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
