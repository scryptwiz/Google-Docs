import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditorStore } from "@/hooks/editor-store";
import { ListCollapseIcon } from "lucide-react";
import { LineHeightButton } from "../toolbar-button";
import SharedTooltip from "../../shared-tooltip";

export const LineHeightButtons = () => {
	const { editor } = EditorStore();

	const lineHeights = [
		{
			title: "Single",
			value: "1",
			active: editor?.getAttributes("paragraph")?.lineHeight === "1",
		},
		{
			title: "1.15",
			value: "1.15",
			active: editor?.getAttributes("paragraph")?.lineHeight === "1.15",
		},
		{
			title: "1.5",
			value: "1.5",
			active: editor?.getAttributes("paragraph")?.lineHeight === "1.5",
		},
		{
			title: "2",
			value: "2",
			active: editor?.getAttributes("paragraph")?.lineHeight === "2",
		},
		{
			title: "2.5",
			value: "2.5",
			active: editor?.getAttributes("paragraph")?.lineHeight === "2.5",
		},
		{
			title: "3",
			value: "3",
			active: editor?.getAttributes("paragraph")?.lineHeight === "3",
		}
	]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild >
				<button className="overflow-hidden min-w-7 shrink-0 flex items-center rounded-sm px-1.5 hover:bg-s1/15 text-xs h-7" >
					<SharedTooltip message="Line Height" >
						<ListCollapseIcon className="size-4" />
					</SharedTooltip>
				</button>
			</DropdownMenuTrigger >
			<DropdownMenuContent className="px-1 py-2 flex flex-col" >
				{
					lineHeights.map((lineHeight) => (
						<LineHeightButton key={lineHeight.title} title={lineHeight.title} active={lineHeight.active} onClick={() => editor?.chain().focus().setLineHeight(lineHeight.value).run()} />
					))}
			</DropdownMenuContent>
		</DropdownMenu >
	)
}