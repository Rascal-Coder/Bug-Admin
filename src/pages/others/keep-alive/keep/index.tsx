import { useState } from "react";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

export default function KeepAlive() {
	const [value, setValue] = useState("");
	return (
		<div className="w-[200px] flex flex-col gap-2">
			<Label>持久化</Label>
			<Input value={value} onChange={(e) => setValue(e.target.value)}></Input>
		</div>
	);
}
