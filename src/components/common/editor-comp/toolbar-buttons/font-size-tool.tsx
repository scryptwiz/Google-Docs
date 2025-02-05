import { EditorStore } from "@/hooks/editor-store"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

export const FontSizeTool = () => {
	const { editor } = EditorStore()

	const fontSizeAttr = editor?.getAttributes("textStyle")?.fontSize;
	const currentFontSize = typeof fontSizeAttr === "string" ? fontSizeAttr.replace("px", "") : "16";
	const [fontSize, setFontSize] = useState(currentFontSize)
	const [inpValue, setInpValue] = useState(fontSize);
	const [editing, setEditing] = useState(false);

	const handleFontSizeChange = (newSize: string) => {
		const size = parseInt(newSize)
		if (!isNaN(size) && size > 0) {
			setFontSize(newSize)
			setInpValue(newSize)
			setEditing(false)
			editor?.chain().focus().setFontSize(newSize + "px").run()
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInpValue(e.target.value)
	}

	const handleInputBlur = () => {
		handleFontSizeChange(inpValue)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			handleFontSizeChange(inpValue)
			editor?.commands.focus()
		}
	}

	const increaseFontSize = () => {
		const newSize = parseInt(fontSize) + 1
		handleFontSizeChange(newSize.toString())
	}

	const decreaseFontSize = () => {
		const newSize = parseInt(fontSize) - 1
		if (newSize > 0) {
			handleFontSizeChange(newSize.toString())
		}
	}

	return (
		<div className="flex items-center gap-x-1">
			<button
				onClick={decreaseFontSize}
				className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-s1/15">
				<Minus className="size-4" />
			</button>
			{editing ? (
				<input
					type="text"
					value={inpValue}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown}
					className="w-10 h-7 px-1 text-sm border border-s2 text-center rounded-sm hover:cursor-text bg-transparent focus:border-p1 focus:border-2 focus:outline-none"
					pattern="\d*"
				/>
			) : (
				<button
					onClick={() => setEditing(true)}
					className="h-7 w-10 text-sm text-center border border-s2 rounded-sm hover:cursor-text bg-transparent">
					{currentFontSize}
				</button>
			)}
			<button
				onClick={increaseFontSize}
				className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-s1/15">
				<Plus className="size-4" />
			</button>
		</div>
	)
}