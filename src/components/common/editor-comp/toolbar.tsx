"use client";

import { LucideIcon } from "lucide-react";
import ToolbarButton from "./toolbar-button";
import { Separator } from "@/components/ui/separator";
import ToolData from "./tool-data";
import { FontFamilyDropdown } from "./toolbar-buttons/font-family-dropdown";
import { TextStylesDropdown } from "./toolbar-buttons/text-styles-dropdown";
import { ColorButton, HighlightButton } from "./toolbar-buttons/color-button";
import { LinkButton } from "./toolbar-buttons/link-button";
import { ImageButton } from "./toolbar-buttons/image-button";

interface ToolbarProps {
	tools: {
		name: string;
		icon: LucideIcon;
		onClick: () => void;
		active?: boolean;
		disabled?: boolean;
	}[][];
}

const Toolbar = () => {
	const tools = ToolData();

	return (
		<div className="bg-white px-5 print:hidden">
			<div className="w-full rounded-full bg-s4 px-3 gap-x-0.5 py-1 flex items-center overflow-x-auto">
				{tools[0].map((tool) => (
					<ToolbarButton key={tool.name} {...tool} />
				))}
				<Separator orientation="vertical" className="h-6 bg-neutral-300" />
				<TextStylesDropdown />
				<Separator orientation="vertical" className="h-6 bg-neutral-300" />
				<FontFamilyDropdown />
				<Separator orientation="vertical" className="h-6 bg-neutral-300" />
				{tools[1].map((tool) => (
					<ToolbarButton key={tool.name} {...tool} />
				))}
				<ColorButton />
				<HighlightButton />
				<Separator orientation="vertical" className="h-6 bg-neutral-300" />
				<LinkButton />
				{tools[2].map((tool) => (
					<ToolbarButton key={tool.name} {...tool} />
				))}
				<ImageButton />
				<Separator orientation="vertical" className="h-6 bg-neutral-300" />
				{tools[3].map((tool) => (
					<ToolbarButton key={tool.name} {...tool} />
				))}
			</div>
		</div>
	);
};

export default Toolbar;
