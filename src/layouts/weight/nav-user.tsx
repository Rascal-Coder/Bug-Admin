import { Book, ChevronsUpDown, Github, HelpCircle, LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { GLOBAL_CONFIG } from "@/global-config";
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
// import { SidebarMenuItem } from "@/ui/sidebar";
import { cn } from "@/utils";

type NavUserProps = {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
};

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={cn("group/menu-item relative flex items-center justify-center", className)}
			{...props}
		/>
	);
}

function SidebarMenuButton({
	isActive = false,
	className,
}: React.ComponentProps<"button"> & {
	isActive?: boolean;
}) {
	const button = (
		<button
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-active={isActive}
			className={cn(
				" peer/menu-button cursor-pointer flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
				"hover:bg-accent hover:text-sidebar-accent-foreground",
				"h-8 text-sm",
				className,
			)}
			type="button"
		/>
	);

	return button;
}
function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={cn("flex w-full min-w-0 flex-col gap-1", className)}
			{...props}
		/>
	);
}

export function NavUser({ user }: NavUserProps) {
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
						<SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
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
						// side={isMobile ? "bottom" : "right"}
						side="right"
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
