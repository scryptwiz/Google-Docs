"use client";
import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSub, MenubarSubTrigger, MenubarSubContent } from "@/components/ui/menubar";
import { Bold, Clipboard, CloudUpload, Copy, Download, FileText, Folder, Italic, Monitor, Redo2, RemoveFormatting, Scissors, StrikethroughIcon, Underline, Undo2, ZoomIn, ZoomOut } from "lucide-react";
import { EditorStore } from "@/hooks/editor-store";

const DocMenuBar = () => {
	const { editor } = EditorStore();

	const handleClipboardAction = async (action: "cut" | "copy", editor: any) => {
		if (!editor) return;

		const selectedText = window.getSelection()?.toString();
		if (!selectedText) return;

		try {
			if (action === "cut") {
				await navigator.clipboard.writeText(selectedText);
				document.execCommand("delete");
			} else if (action === "copy") {
				await navigator.clipboard.writeText(selectedText);
			}
		} catch (err) {
			alert(`Failed to ${action} content. Please try again.`);
		}
	};

	const menus = [
		{
			id: "docs-file-menu",
			label: "File",
			items: [
				{ name: "New", icon: FileText, action: () => console.log("New document created") },
				{ name: "Open", icon: Folder, action: () => console.log("Opening document") },
				{ name: "Save", icon: CloudUpload, action: () => console.log("Saving document") },
				{
					name: "Export",
					icon: Download,
					submenu: [
						{ name: "Export as PDF", action: () => console.log("Exporting as PDF") },
						{ name: "Export as DOCX", action: () => console.log("Exporting as DOCX") },
						{ name: "Export as TXT", action: () => console.log("Exporting as TXT") },
					],
				},
			],
		},
		{
			id: "docs-edit-menu",
			label: "Edit",
			items: [
				{ name: "Undo", icon: Undo2, action: () => editor?.chain().focus().undo().run() },
				{ name: "Redo", icon: Redo2, action: () => editor?.chain().focus().redo().run() },
				{
					name: "Cut",
					icon: Scissors,
					action: () => handleClipboardAction("cut", editor),
				},
				{
					name: "Copy",
					icon: Copy,
					action: () => handleClipboardAction("copy", editor),
				},
				{
					name: "Paste",
					icon: Clipboard,
					action: async () => {
						if (editor) {
							try {
								const text = await navigator.clipboard.readText();
								editor.chain().focus().insertContent(text).run();
							} catch (err) {
								alert("Failed to paste content. Please try again.");
							}
						}
					},
				},
			],
		},
		{
			id: "docs-view-menu",
			label: "View",
			items: [
				{ name: "Zoom In", icon: ZoomIn, action: () => console.log("Zoom In clicked") },
				{ name: "Zoom Out", icon: ZoomOut, action: () => console.log("Zoom Out clicked") },
				{ name: "Full Screen", icon: Monitor, action: () => console.log("Full Screen clicked") },
			],
		},
		{ id: "docs-insert-menu", label: "Insert" },
		{
			id: "docs-format-menu", label: "Format", items: [
				{
					name: "Text",
					submenu: [
						{ name: "Bold", icon: Bold, action: () => editor?.chain().focus().toggleBold().run() },
						{ name: "Italic", icon: Italic, action: () => editor?.chain().focus().toggleItalic().run() },
						{ name: "Underline", icon: Underline, action: () => editor?.chain().focus().toggleUnderline().run() },
						{ name: "Strikethrough", icon: StrikethroughIcon, action: () => editor?.chain().focus().toggleStrike().run() },
					],
				},
				{ name: "Clear Formatting", icon: RemoveFormatting, action: () => editor?.chain().focus().unsetAllMarks().run() },
			]
		},
		{ id: "docs-tools-menu", label: "Tools" },
		{ id: "docs-extensions-menu", label: "Extensions" },
		{ id: "docs-help-menu", label: "Help" },
	];

	return (
		<Menubar className="shadow-none rounded-none border-none bg-transparent">
			{menus.map((menu) => (
				<MenubarMenu key={menu.id}>
					<MenubarTrigger className="px-3 py-1 flex items-center gap-1 hover:bg-s1/15 font-normal text-gray-800 focus:bg-s1/20">
						{menu.label}
					</MenubarTrigger>
					{menu.items && (
						<MenubarContent>
							{menu.items.map((item, index) =>
								item.submenu ? (
									<MenubarSub key={index}>
										<MenubarSubTrigger className="flex justify-between items-center">
											<div className="flex items-center gap-2">
												{item.icon && <item.icon size={14} />}
												<span>{item.name}</span>
											</div>
										</MenubarSubTrigger>
										<MenubarSubContent>
											{item.submenu.map((subItem, subIndex) => (
												<MenubarItem key={subIndex} onSelect={subItem.action} className="flex items-center gap-2">
													{subItem.icon && <subItem.icon size={14} />}
													<span>{subItem.name}</span>
												</MenubarItem>
											))}
										</MenubarSubContent>
									</MenubarSub>
								) : (
									<MenubarItem key={index} onSelect={item.action} className="flex items-center gap-2">
										{item.icon && <item.icon size={14} />}
										<span>{item.name}</span>
									</MenubarItem>
								)
							)}
						</MenubarContent>
					)}
				</MenubarMenu>
			))}
		</Menubar>
	);
};

export default DocMenuBar;
