import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { EditorStore } from "@/hooks/editor-store";
import { Link2 } from "lucide-react";
import { useState } from "react";
import SharedTooltip from "../../shared-tooltip";

export const LinkButton = () => {
	const { editor } = EditorStore();
	const [hrefValue, setHrefValue] = useState("");

	const changeHref = (href: string) => {
		editor?.chain().focus().setLink({ href }).run();
		setHrefValue("");
	}

	const setOpen = (open: boolean) => {
		if (open) {
			setHrefValue(editor?.getAttributes("link").href || "");
		}
	}

	return (
		<DropdownMenu onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<SharedTooltip message="Insert Link">
					<button className="overflow-hidden min-w-7 shrink-0 flex flex-col justify-center items-center rounded-sm px-1.5 hover:bg-s1/15 text-xs h-7 gap-1">
						<Link2 className="size-4" />
					</button>
				</SharedTooltip>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2.5 flex gap-2">
				<Input type="text" placeholder="Insert Link" value={hrefValue} onChange={(e) => setHrefValue(e.target.value)} className='outline-none border focus:border-1 focus:border-p1 border-s1 hover:border-s2' />
				<Button variant="outline" onClick={() => changeHref(hrefValue)} className="hover:bg-p1/10 border-none text-p1 rounded-full hover:text-p1 shadow-none">Apply</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}