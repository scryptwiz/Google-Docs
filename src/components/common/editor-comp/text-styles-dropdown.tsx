import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditorStore } from "@/hooks/editor-store";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { type Level } from "@tiptap/extension-heading"

export const TextStylesDropdown = () => {
	const { editor } = EditorStore();
	const [open, setOpen] = useState(false);

	const styles = [
		{ label: "Normal text", value: 0, fontSize: "16px" },
		{ label: "Heading 1", value: 1, fontSize: "32px" },
		{ label: "Heading 2", value: 2, fontSize: "24px" },
		{ label: "Heading 3", value: 3, fontSize: "20px" },
	]

	const getCurrentStyle = () => {
		const activeStyle = styles.find(style => editor?.isActive('heading', { level: style.value }));
		return activeStyle ? `Heading ${activeStyle.value}` : "Normal text";
	}
	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<button className="overflow-hidden w-[120px] shrink-0 flex items-center rounded-sm px-1.5 hover:bg-s1/15 text-sm justify-between h-7">
					<span className="truncate">
						{getCurrentStyle()}
					</span>
					<ChevronDown className="ml-2 size-4 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{styles.map(({ label, value, fontSize }) => (
					<button
						key={value}
						className={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-s1/15",
							(value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && "bg-s1/15"
						)}
						style={{ fontSize }}
						onClick={() => {
							setOpen(false);
							if (value === 0) {
								editor?.chain().focus().setParagraph().run();
							} else {
								editor?.chain().focus().toggleHeading({ level: value as Level }).run();
							}
						}}
					>
						{label}
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}