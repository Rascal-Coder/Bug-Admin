import { ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";
import { useMediaQuery } from "@/hooks";
import { Button } from "@/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

type TeamerSwitcherHorizontalProps = {
	teams: {
		name: string;
		logo: React.ElementType;
		plan: string;
	}[];
	className?: string;
};

export function TeamSwitcherHorizontal({ teams, className }: TeamerSwitcherHorizontalProps) {
	const [activeTeam, setActiveTeam] = React.useState(teams[0]);
	const isMobile = useMediaQuery({ maxWidth: 768 });
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className={`flex items-center gap-2 text-sm h-12 px-3 hover:bg-accent hover:text-accent-foreground ${className}`}
				>
					<div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
						<activeTeam.logo className="size-4" />
					</div>
					{!isMobile && (
						<>
							<div className="flex flex-col items-start">
								<span className="font-semibold text-sm leading-tight">{activeTeam.name}</span>
								<span className="text-xs text-muted-foreground leading-tight">{activeTeam.plan}</span>
							</div>
							<ChevronsUpDown className="ms-auto size-4" />
						</>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 rounded-lg" align="start" sideOffset={4}>
				<DropdownMenuLabel className="text-muted-foreground text-xs">Teams</DropdownMenuLabel>
				{teams.map((team) => (
					<DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className="gap-2 p-2 cursor-pointer">
						<div className="flex size-6 items-center justify-center rounded-sm border">
							<team.logo className="size-4 shrink-0" />
						</div>
						<div className="flex flex-col">
							<span className="font-medium">{team.name}</span>
							<span className="text-xs text-muted-foreground">{team.plan}</span>
						</div>
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem className="gap-2 p-2 cursor-pointer">
					<div className="bg-background flex size-6 items-center justify-center rounded-md border">
						<Plus className="size-4" />
					</div>
					<div className="text-muted-foreground font-medium">Add team</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
