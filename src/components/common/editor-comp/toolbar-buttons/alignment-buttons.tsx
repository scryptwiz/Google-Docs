import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditorStore } from "@/hooks/editor-store";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, ChevronDown } from "lucide-react";
import ToolbarButton from "../toolbar-button";
import SharedTooltip from "../../shared-tooltip";

export const AlignmentButtons = () => {
	const { editor } = EditorStore();

	const alignments = [
		{
			title: "Align Left",
			value: "left",
			icon: AlignLeft,
			active: editor?.isActive({ textAlign: 'left' }),
		},
		{
			title: "Align Center",
			value: "center",
			icon: AlignCenter,
			active: editor?.isActive({ textAlign: 'center' }),
		},
		{
			title: "Align Right",
			value: "right",
			icon: AlignRight,
			active: editor?.isActive({ textAlign: 'right' }),
		},
		{
			title: "Justify",
			value: "justify",
			icon: AlignJustify,
			active: editor?.isActive({ textAlign: 'justify' }),
		}
	]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SharedTooltip message="Text Alignment">
					<button className="overflow-hidden min-w-7 shrink-0 flex items-center rounded-sm px-1.5 hover:bg-s1/15 text-xs h-7">
						<AlignLeft className="size-4" />
						<ChevronDown className="size-3 shrink-0" />
					</button>
				</SharedTooltip>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 justify-center flex">
				{alignments.map((alignment) => (
					<ToolbarButton key={alignment.title} icon={alignment.icon} active={alignment.active} onClick={() => editor?.chain().focus().setTextAlign(alignment.value).run()} />
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}