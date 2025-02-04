import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditorStore } from "@/hooks/editor-store";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SharedTooltip from "../../shared-tooltip";

export const FontFamilyDropdown = () => {
	const { editor } = EditorStore();
	const [open, setOpen] = useState(false);

	const fonts = [
		{ label: "Arial", value: "Arial" },
		{ label: "Comic Sans MS", value: "Comic Sans MS" },
		{ label: "Courier New", value: "Courier New" },
		{ label: "Georgia", value: "Georgia" },
		{ label: "Impact", value: "Impact" },
		{ label: "Tahoma", value: "Tahoma" },
		{ label: "Times New Roman", value: "Times New Roman" },
		{ label: "Trebuchet MS", value: "Trebuchet MS" },
		{ label: "Verdana", value: "Verdana" },
		{ label: "Roboto", value: "Roboto" },
		{ label: "Open Sans", value: "Open Sans" },
		{ label: "Lato", value: "Lato" },
		{ label: "Montserrat", value: "Montserrat" },
		{ label: "Oswald", value: "Oswald" },
		{ label: "Source Sans Pro", value: "Source Sans Pro" },
		{ label: "Raleway", value: "Raleway" },
		{ label: "PT Sans", value: "PT Sans" },
		{ label: "Merriweather", value: "Merriweather" },
		{ label: "Noto Sans", value: "Noto Sans" },
		{ label: "Nunito", value: "Nunito" },
		{ label: "Ubuntu", value: "Ubuntu" },
		{ label: "Playfair Display", value: "Playfair Display" },
		{ label: "Rubik", value: "Rubik" },
		{ label: "Work Sans", value: "Work Sans" },
		{ label: "Zilla Slab", value: "Zilla Slab" },
	];

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<SharedTooltip message="Font Family">
					<button className={cn("overflow-hidden w-[120px] shrink-0 flex items-center rounded-sm px-1.5 hover:bg-s1/15 text-sm justify-between h-7")}>
						<span className="truncate">
							{editor?.getAttributes("textStyle").fontFamily || "Arial"}
						</span>
						<ChevronDown className="ml-2 size-4 shrink-0" />
					</button>
				</SharedTooltip>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{fonts.map(({ label, value }) => (
					<button
						key={value}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-s1/15",
							editor?.getAttributes("textStyle").fontFamily === value && "bg-s1/15"
						)}
						style={{ fontFamily: value }}
						onClick={() => { editor?.chain().focus().setMark('textStyle', { fontFamily: value }).run(); setOpen(false) }}
					>
						<span className="text-sm">{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
