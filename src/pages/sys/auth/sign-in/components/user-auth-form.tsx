import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Icon } from "@/components/icon";
import { PasswordInput } from "@/components/password-input";
import { GLOBAL_CONFIG } from "@/global-config";
import { useSignIn } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { cn, sleep } from "@/utils";
import { SignInStateEnum, useSignInContext } from "../providers/sign-in-provider";

const formSchema = z.object({
	username: z.string().min(1, "Please enter your username"),
	password: z.string().min(1, "Please enter your password").min(7, "Password must be at least 7 characters long"),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
	redirectTo?: string;
}

export function UserAuthForm({ className, redirectTo, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const signIn = useSignIn();
	const navigatge = useNavigate();
	const { setSignInState } = useSignInContext();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "admin",
			password: "demo1234",
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		setIsLoading(true);

		toast.promise(sleep(2000), {
			loading: "Signing in...",
			success: async () => {
				setIsLoading(false);

				await signIn({ username: "admin", password: "demo1234" });
				// Redirect to the stored location or default to dashboard
				const targetPath = redirectTo || GLOBAL_CONFIG.defaultRoute;
				navigatge(targetPath, { replace: true });

				return `Welcome back, ${data.username}!`;
			},
			duration: 600,
			error: "Error",
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid gap-3", className)} {...props}>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="admin" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="relative">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<PasswordInput placeholder="********" {...field} />
							</FormControl>
							<FormMessage />
							<Link
								to="/auth/forgot-password"
								className="text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75"
							>
								Forgot password?
							</Link>
						</FormItem>
					)}
				/>
				<Button className="mt-2" disabled={isLoading}>
					{isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
					Sign in
				</Button>

				<div className="relative my-2">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background text-muted-foreground px-2">Or continue with</span>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-2">
					<Button
						variant="outline"
						type="button"
						disabled={isLoading}
						onClick={() => setSignInState(SignInStateEnum.MOBILE)}
					>
						<Icon icon="uil:mobile-android" size={20} />
						Mobile sign in
					</Button>
					<Button
						variant="outline"
						type="button"
						disabled={isLoading}
						onClick={() => setSignInState(SignInStateEnum.QR_CODE)}
					>
						<Icon icon="uil:qrcode-scan" size={20} />
						Qr code sign in
					</Button>
				</div>
			</form>
		</Form>
	);
}
