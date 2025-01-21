"use client"

import { LucideIcon } from "lucide-react";
import ToolbarButton from "./toolbarButton";

interface ToolbarProps {
	tools: {
		name: string;
		icon: LucideIcon;
		onClick: () => void;
		active?: boolean;
		disabled?: boolean;
	}[];
}

const Toolbar: React.FC<ToolbarProps> = ({ tools }) => {
	return (
		<div className="bg-white px-5">
			<div className="w-full rounded-full bg-s4 px-3 gap-x-0.5 py-1 flex items-center overflow-x-auto">
				{tools.map((tool) => (
					<ToolbarButton key={tool.name} {...tool} />
				))}
			</div>
		</div>
	);
}

export default Toolbar;