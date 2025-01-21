"use client";

import { LucideIcon, PaintRoller, Printer, Redo2, Search, SpellCheck, Undo2 } from "lucide-react";

export const tools: {
	name: string;
	icon: LucideIcon;
	onClick: () => void;
	active?: boolean;
	disabled?: boolean;
}[] = [
		{
			name: "Search",
			icon: Search,
			onClick: () => console.log("Search"),
		},
		{
			name: "Undo",
			icon: Undo2,
			onClick: () => console.log("Undo"),
		},
		{
			name: "Redo",
			icon: Redo2,
			onClick: () => console.log("Redo"),
		},
		{
			name: "Print",
			icon: Printer,
			onClick: () => console.log("Print"),
		},
		{
			name: "Spell Check",
			icon: SpellCheck,
			onClick: () => console.log("Spell Check"),
		},
		{
			name: "Print",
			icon: PaintRoller,
			onClick: () => console.log("Print"),
		}
	];