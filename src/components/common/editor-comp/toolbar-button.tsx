import { cn } from "@/lib/utils";
import { Check, LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
	icon: LucideIcon;
	onClick?: () => void;
	active?: boolean;
	disabled?: boolean;
}

const ToolbarButton = ({ icon: Icon, active, onClick, disabled }: ToolbarButtonProps) => {
	return (
		<button className={cn("text-gray-600 text-sm h-7 px-1.5 flex items-center rounded-sm transition-all duration-300", active && "bg-p1/20", !disabled && "hover:bg-s1/15 text-gray-800")} onClick={!disabled ? onClick : undefined} disabled={disabled}>
			<Icon className={cn("size-4")} />
		</button>
	);
}

export default ToolbarButton;

interface LineHeightButtonProps {
	title: string;
	onClick?: () => void;
	active?: boolean;
	disabled?: boolean;
}

export const LineHeightButton = ({ title, active, onClick, disabled }: LineHeightButtonProps) => {
	return (
		<button className={cn("text-gray-600 text-sm h-7 px-1.5 flex items-center rounded-sm transition-all duration-300", !disabled && "hover:bg-s1/15 text-gray-800")} onClick={!disabled ? onClick : undefined} disabled={disabled}>
			<span className="size-5 mr-2">{active && <Check className="size-4" />}</span> {title}
		</button>
	);
}