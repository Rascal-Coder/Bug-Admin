import { Book, Github, HelpCircle, LogOut } from "lucide-react";
import { NavLink } from "react-router";
import avatar from "@/assets/images/user/avatar.jpg";

import { Button } from "@/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

/**
 * Account Dropdown
 */
export default function AccountDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full">
					<img className="h-6 w-6 rounded-full" src={avatar} alt="" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<div className="flex items-center gap-2 p-2">
					<img className="h-10 w-10 rounded-full" src={avatar} alt="" />
					<div className="flex flex-col items-start">
						<div className="text-text-primary text-sm font-medium">Rascal-Coder</div>
						<div className="text-text-secondary text-xs">meno.qiqio@gmail.com</div>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Book className="mr-2 h-4 w-4" />
					<NavLink to="https://github.com/Rascal-Coder/Bug-Admin" target="_blank">
						文档
					</NavLink>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<NavLink to="https://github.com/Rascal-Coder/Bug-Admin" target="_blank" className="flex items-center">
						<Github className="mr-2 h-4 w-4" />
						Github
					</NavLink>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<NavLink to="https://github.com/Rascal-Coder/Bug-Admin/issues" target="_blank" className="flex items-center">
						<HelpCircle className="mr-2 h-4 w-4" />
						问题 & 帮助
					</NavLink>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut className="mr-2 h-4 w-4" />
					退出登录
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
