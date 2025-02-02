"use client";

import { EditorStore } from "@/hooks/editor-store";
import { Bold, Code, Italic, List, ListOrdered, ListTodo, MessageSquarePlus, PaintRoller, Printer, Redo2, RemoveFormatting, Search, SpellCheck, Underline, Undo2 } from "lucide-react";

const ToolData = () => {
	const { editor } = EditorStore();

	const tools = [
		[
			{
				name: "Search",
				icon: Search,
				onClick: () => console.log("Search"),
			},
			{
				name: "Undo",
				icon: Undo2,
				onClick: () => editor?.chain().focus().undo().run(),
			},
			{
				name: "Redo",
				icon: Redo2,
				onClick: () => editor?.chain().focus().redo().run(),
			},
			{
				name: "Print",
				icon: Printer,
				onClick: () => window.print(),
			},
			{
				name: "Spell Check",
				icon: SpellCheck,
				onClick: () => {
					const current = editor?.view.dom.getAttribute("spellcheck");
					editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
				},
			},
			{
				name: "Print Format",
				icon: PaintRoller,
				onClick: () => console.log("Print Format"),
			},
		],
		[
			{
				name: "Bold",
				icon: Bold,
				active: editor?.isActive("bold"),
				onClick: () => editor?.chain().focus().toggleBold().run(),
			},
			{
				name: "Italic",
				icon: Italic,
				active: editor?.isActive("italic"),
				onClick: () => editor?.chain().focus().toggleItalic().run(),
			},
			{
				name: "Underline",
				icon: Underline,
				active: editor?.isActive("underline"),
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
			},
			{
				name: "Clear Formatting",
				icon: RemoveFormatting,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(),
			}
		],
		[
			{
				name: "Code",
				icon: Code,
				disable: !editor?.can().chain().focus().toggleCode().run(),
				onClick: () => editor?.chain().focus().toggleCode().run(),
				active: editor?.isActive('code'),
			},
		],
		[
			{
				name: "Task List",
				icon: ListTodo,
				onClick: () => editor?.chain().focus().toggleTaskList().run(),
				active: editor?.isActive('taskList'),
			},
			{
				name: "Bullet List",
				icon: List,
				onClick: () => editor?.chain().focus().toggleBulletList().run(),
				active: editor?.isActive('bulletList'),
			},
			{
				name: "Ordered List",
				icon: ListOrdered,
				onClick: () => editor?.chain().focus().toggleOrderedList().run(),
				active: editor?.isActive('orderedList'),
			}
		]
	];

	return tools;
};

export default ToolData;
