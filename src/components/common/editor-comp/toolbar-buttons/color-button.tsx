import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditorStore } from "@/hooks/editor-store";
import { Highlighter } from "lucide-react";
import { useState } from "react";
import { SketchPicker, type ColorResult } from "react-color";
import SharedTooltip from "../../shared-tooltip";

export const ColorButton = () => {
	const { editor } = EditorStore();
	const value = editor?.getAttributes("textStyle").color || "#000";
	const [open, setOpen] = useState(false);

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run();
	}

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<SharedTooltip message="Text Color">
					<button className="overflow-hidden min-w-7 shrink-0 flex flex-col justify-center items-center rounded-sm px-1.5 hover:bg-s1/15 text-sm h-7" onClick={() => setOpen(!open)}>
						<span className="text-sm">A</span>
						<div className="h-1 w-full" style={{ backgroundColor: value }} />
					</button>
				</SharedTooltip>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2.5">
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const HighlightButton = () => {
	const { editor } = EditorStore();
	const value = editor?.getAttributes("highlight").color || "transparent";
	const [open, setOpen] = useState(false);

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setHighlight({ color: color.hex }).run();
	}

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<SharedTooltip message="Text Highlight">
					<button className="overflow-hidden min-w-7 shrink-0 flex flex-col justify-center items-center rounded-sm px-1.5 hover:bg-s1/15 text-sm h-7 gap-1" onClick={() => setOpen(!open)}>
						<Highlighter size={14} />
						<div className="h-1 w-full" style={{ backgroundColor: value }} />
					</button>
				</SharedTooltip>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2.5">
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}