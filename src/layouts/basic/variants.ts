import { cva, type VariantProps } from "class-variance-authority";

export const layoutVariants = cva("group relative flex w-full min-h-full data-[side=right]:flex-row-reverse", {
	variants: {
		variant: {
			sidebar: "",
			floating: "",
			inset: "bg-sidebar-background",
		},
		side: {
			left: "",
			right: "",
		},
		collapsible: {
			offcanvas: "",
			icon: "",
		},
	},
	defaultVariants: {
		variant: "sidebar",
		side: "left",
		collapsible: "icon",
	},
});

export const sidebarRootVariants = cva("hidden md:block");

export const sidebarWrapperVariants = cva(
	"absolute inset-y-0 z-10 hidden h-full w-[--sidebar-width] transition-[left,right,width,opacity] duration-200 ease-linear md:flex",
	{
		variants: {
			variant: {
				sidebar:
					"group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
				floating:
					"p-2 w-[calc(var(--sidebar-width)+1rem)] group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]",
				inset:
					"p-2 w-[calc(var(--sidebar-width)+1rem)] group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]",
			},
			side: {
				left: "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
				right: "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
			},
			collapsible: {
				offcanvas: "group-data-[state=collapsed]:opacity-0",
				icon: "",
			},
		},
		defaultVariants: {
			variant: "sidebar",
			side: "left",
			collapsible: "icon",
		},
	},
);

export const sidebarVariants = cva("flex flex-col size-full bg-sidebar-background", {
	variants: {
		variant: {
			sidebar: "",
			floating: "rounded-lg border border-border border-solid shadow",
			inset: "",
		},
	},
	defaultVariants: {
		variant: "sidebar",
	},
});

export const sidebarGapHandlerVariants = cva(
	"relative h-full w-[--sidebar-width] bg-transparent transition-width duration-200 ease-linear",
	{
		variants: {
			variant: {
				sidebar: "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
				floating:
					"w-[calc(var(--sidebar-width)+1rem)] group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]",
				inset:
					"w-[calc(var(--sidebar-width)+1rem)] group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]",
			},
			side: {
				left: "",
				right: "rotate-180",
			},
			collapsible: {
				offcanvas: "w-0",
				icon: "",
			},
		},
		defaultVariants: {
			variant: "sidebar",
			side: "left",
			collapsible: "icon",
		},
	},
);

export const mobileRootVariants = cva("w-[--sidebar-width] bg-sidebar-background p-0 [&>button]:hidden");

export const mobileVariants = cva("flex flex-col size-full");

export const triggerVariants = cva("");

export const mainVariants = cva("relative flex flex-1 flex-col min-h-full bg-background", {
	variants: {
		variant: {
			sidebar: "",
			floating: "",
			inset: "md:(m-2 ml-0 rounded-xl shadow)",
		},
		collapsible: {
			offcanvas: "",
			icon: "",
		},
	},
	compoundVariants: [
		{
			variant: "inset",
			collapsible: "offcanvas",
			class: "md:group-data-[state=collapsed]:ml-2",
		},
	],
	defaultVariants: {
		variant: "sidebar",
		collapsible: "icon",
	},
});

export const headerVariants = cva("relative flex items-center");

export const railVariants = cva(
	"absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:(absolute inset-y-0 left-1/2 w-[2px]) hover:after:bg-border sm:flex",
	{
		variants: {
			side: {
				left: "cursor-w-resize group-data-[state=collapsed]:cursor-e-resize -right-4",
				right: "cursor-e-resize group-data-[state=collapsed]:cursor-w-resize left-0",
			},
			collapsible: {
				offcanvas: "translate-x-0 after:left-full hover:bg-sidebar-background",
				icon: "",
			},
		},
		compoundVariants: [
			{
				side: "left",
				collapsible: "offcanvas",
				class: "-right-2",
			},
			{
				side: "right",
				collapsible: "offcanvas",
				class: "-left-2",
			},
		],
		defaultVariants: {
			side: "left",
			collapsible: "icon",
		},
	},
);

type LayoutVariants = VariantProps<typeof layoutVariants>;

export type LayoutVariant = NonNullable<LayoutVariants["variant"]>;
export type LayoutCollapsible = NonNullable<LayoutVariants["collapsible"]>;
export type LayoutSide = NonNullable<LayoutVariants["side"]>;

export type LayoutSlots =
	| "root"
	| "sidebarRoot"
	| "sidebarWrapper"
	| "sidebar"
	| "sidebarGapHandler"
	| "mobileRoot"
	| "mobile"
	| "trigger"
	| "main"
	| "header"
	| "rail";

export function getLayoutClasses(
	slot: LayoutSlots,
	props: {
		variant?: LayoutVariant;
		side?: LayoutSide;
		collapsible?: LayoutCollapsible;
	} = {},
) {
	switch (slot) {
		case "root":
			return layoutVariants(props);
		case "sidebarRoot":
			return sidebarRootVariants();
		case "sidebarWrapper":
			return sidebarWrapperVariants(props);
		case "sidebar":
			return sidebarVariants(props);
		case "sidebarGapHandler":
			return sidebarGapHandlerVariants(props);
		case "mobileRoot":
			return mobileRootVariants();
		case "mobile":
			return mobileVariants();
		case "trigger":
			return triggerVariants();
		case "main":
			return mainVariants(props);
		case "header":
			return headerVariants();
		case "rail":
			return railVariants(props);
		default:
			return "";
	}
}
