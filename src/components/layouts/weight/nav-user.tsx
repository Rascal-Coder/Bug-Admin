import { Book, ChevronsUpDown, Github, HelpCircle, LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { useRouter } from "@/routes/hooks";
import { useUserActions } from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/ui/sidebar";
import { GLOBAL_CONFIG } from "@/global-config";

type NavUserProps = {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
};

export function NavUser({ user }: NavUserProps) {
	const { isMobile } = useSidebar();
	const { replace } = useRouter();
	const { clearUserInfoAndToken } = useUserActions();
	const logout = () => {
		try {
			clearUserInfoAndToken();
		} catch (error) {
			console.log(error);
		} finally {
			replace(GLOBAL_CONFIG.loginRoute);
		}
	};
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-full">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="rounded-lg">SN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-start text-sm leading-tight">
								<span className="truncate font-semibold">{user.name}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ms-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
								<Avatar className="h-8 w-8 rounded-full">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className="rounded-lg">SN</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-start text-sm leading-tight">
									<span className="truncate font-semibold">{user.name}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<NavLink to="https://github.com/Rascal-Coder/Bug-Admin" target="_blank">
									<Book className="mr-2 h-4 w-4" />
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
								<NavLink
									to="https://github.com/Rascal-Coder/Bug-Admin/issues"
									target="_blank"
									className="flex items-center"
								>
									<HelpCircle className="mr-2 h-4 w-4" />
									问题 & 帮助
								</NavLink>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								logout();
							}}
						>
							<LogOut className="mr-2 h-4 w-4" />
							退出登录
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
