import { X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { Dialog as DialogPrimitive } from "radix-ui";
import * as React from "react";
import {
	DialogClose as DialogCloseUi,
	type DialogContent as DialogContentUi,
	DialogDescription as DialogDescriptionUi,
	DialogOverlay as DialogOverlayUi,
	DialogPortal as DialogPortalUi,
	DialogTitle as DialogTitleUi,
	DialogTrigger as DialogTriggerUi,
	Dialog as DialogUi,
} from "@/ui/dialog";
import { cn } from "@/utils";

type DialogContextType = {
	open: boolean;
	setOpen: (value: boolean) => void;
};

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

const useDialog = (): DialogContextType => {
	const context = React.useContext(DialogContext);
	if (!context) {
		throw new Error("useDialog must be used within a Dialog");
	}
	return context;
};

type DialogWithContextProps = React.ComponentProps<typeof DialogPrimitive.Root> & {};
function DialogWithContext({ children, open: openProp, onOpenChange: setOpenProp, ...props }: DialogWithContextProps) {
	const [_open, _setOpen] = React.useState(false);
	const open = openProp ?? _open;

	const setOpen = React.useCallback(
		(value: boolean | ((value: boolean) => boolean)) => {
			const openState = typeof value === "function" ? value(open) : value;

			if (setOpenProp) {
				setOpenProp(openState);
			} else {
				_setOpen(openState);
			}
		},
		[setOpenProp, open],
	);

	const contextValue = React.useMemo<DialogContextType>(() => ({ open, setOpen }), [open, setOpen]);

	return (
		<DialogContext.Provider value={contextValue}>
			<DialogUi {...props} onOpenChange={setOpen}>
				{children}
			</DialogUi>
		</DialogContext.Provider>
	);
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay> & {}) {
	return (
		<DialogOverlayUi className={cn(className)} asChild {...props}>
			<m.div
				key="dialog-overlay"
				initial={{ opacity: 0, filter: "blur(4px)" }}
				animate={{ opacity: 1, filter: "blur(0px)" }}
				exit={{ opacity: 0, filter: "blur(4px)" }}
				transition={{ duration: 0.2, ease: "easeInOut" }}
			/>
		</DialogOverlayUi>
	);
}

function DialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: React.ComponentProps<typeof DialogContentUi> & {
	showCloseButton?: boolean;
}) {
	const { open, setOpen } = useDialog();

	return (
		<AnimatePresence>
			{open && (
				<DialogPortalUi forceMount>
					<DialogOverlay />
					<DialogPrimitive.Content asChild forceMount {...props}>
						<m.div
							key="dialog-content"
							data-slot="dialog-content"
							initial={{
								opacity: 0,
								filter: "blur(4px)",
								transform: `perspective(500px) rotateY(30deg) scale(0.8)`,
							}}
							animate={{
								opacity: 1,
								filter: "blur(0px)",
								transform: `perspective(500px) rotateY(0deg) scale(1)`,
							}}
							exit={{
								opacity: 0,
								filter: "blur(4px)",
								transform: `perspective(500px) rotateY(30deg) scale(0.8)`,
							}}
							className={cn(
								"text-text-primary bg-background fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border p-4",
								className,
							)}
							transition={{ type: "spring", stiffness: 150, damping: 25 }}
						>
							{children}
							{showCloseButton && (
								<DialogCloseUi className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
									<X onClick={() => setOpen(false)} className="h-4 w-4 cursor-pointer" />
									<span className="sr-only">Close</span>
								</DialogCloseUi>
							)}
						</m.div>
					</DialogPrimitive.Content>
				</DialogPortalUi>
			)}
		</AnimatePresence>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
			{...props}
		/>
	);
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn("flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end", className)}
			{...props}
		/>
	);
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogTitleUi>) {
	return <DialogTitleUi className={cn("mb-2.5 leading-none font-semibold tracking-tight", className)} {...props} />;
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogDescriptionUi>) {
	return <DialogDescriptionUi className={cn("text-muted-foreground", className)} {...props} />;
}

const Dialog = ({
	trigger,
	children,
	showCloseButton = true,
	...props
}: { showCloseButton?: boolean; trigger?: React.ReactNode; children: React.ReactNode } & DialogWithContextProps) => {
	return (
		<DialogWithContext {...props}>
			<DialogTriggerUi asChild>{trigger}</DialogTriggerUi>
			<DialogContent showCloseButton={showCloseButton}>{children}</DialogContent>
		</DialogWithContext>
	);
};
export { Dialog, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
