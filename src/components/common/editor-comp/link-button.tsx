import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditorStore } from "@/hooks/editor-store";
import { Link } from "lucide-react";
import { useState } from "react";

const LinkButton = () => {
	const { editor } = EditorStore();
	const [open, setOpen] = useState(false);
	const [hrefValue, setHrefValue] = useState(editor?.getAttributes("link").href || "");

	const onChange = (href: string) => {
		editor?.chain().focus().setLink({ href }).run();
		setHrefValue(href);
	}

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<button className="overflow-hidden min-w-7 shrink-0 flex flex-col justify-center items-center rounded-sm px-1.5 hover:bg-s1/15 text-sm h-7 gap-1" onClick={() => setOpen(!open)}>
					<Link />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2.5">

			</DropdownMenuContent>
		</DropdownMenu>
	)
}