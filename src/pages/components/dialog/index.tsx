import { useState } from "react";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/dialog";
import { Button } from "@/ui/button";
export default function DialogPage() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open Dialog
			</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogHeader>
					<DialogTitle>Dialog Title</DialogTitle>
					<DialogDescription>Dialog Description</DialogDescription>
					<DialogFooter>
						<Button type="submit" onClick={() => setOpen(false)}>
							Get Started
						</Button>
					</DialogFooter>
				</DialogHeader>
			</Dialog>
		</>
	);
}
