import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ReturnButton } from "./return-button";
import { useSignInContext } from "../providers/sign-in-provider";

interface CountdownProps {
	value: number;
	onChange: (time: number) => void;
	onFinish: () => void;
}

function Countdown({ value, onChange, onFinish }: CountdownProps) {
	useEffect(() => {
		if (value <= 0) {
			onFinish();
			return;
		}

		const timer = setInterval(() => {
			onChange(value - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [value, onChange, onFinish]);

	return null;
}

interface MobileFormValues {
	phone: string;
	code: string;
}

export function MobileForm() {
	const [countdown, setCountdown] = useState(0);
	const [second, setSecond] = useState(0);
	const { backToSignIn } = useSignInContext();
	const form = useForm<MobileFormValues>({
		defaultValues: {
			phone: "",
			code: "",
		},
	});

	const start = () => {
		setCountdown(60);
		setSecond(60);
	};

	const reset = () => {
		setCountdown(0);
		setSecond(60);
	};

	const onFinish = (values: MobileFormValues) => {
		console.log("Received values of form: ", values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onFinish)} className="space-y-4">
				<FormField
					control={form.control}
					name="phone"
					rules={{ required: "Please input mobile phone" }}
					render={({ field }) => (
						<FormItem>
							<div className="flex flex-col space-y-2 text-center">
								<h2 className="text-lg font-semibold tracking-tight">Mobile sign in</h2>
							</div>
							<FormLabel>Mobile</FormLabel>
							<FormControl>
								<Input placeholder="Mobile" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="code"
					rules={{ required: "Please input sms code" }}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="flex items-center justify-between">
								<span className="text-sm">SMS code</span>
								<span className="text-sm text-muted-foreground" onClick={start}>
									{countdown === 0 ? (
										<span>Send SMS code</span>
									) : (
										<div className="flex items-center justify-center">
											<Countdown
												value={countdown}
												onChange={(time) => {
													setCountdown(time);
													setSecond(time);
												}}
												onFinish={reset}
											/>
											<span className="ml-1">Reacquire in {second}s</span>
										</div>
									)}
								</span>
							</FormLabel>
							<FormControl>
								<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} {...field}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					Sign in
				</Button>

				<ReturnButton
					onClick={() => {
						reset();
						backToSignIn();
					}}
				/>
			</form>
		</Form>
	);
}
