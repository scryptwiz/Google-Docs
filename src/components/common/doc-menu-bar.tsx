"use client";

import { jsPDF } from "jspdf";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSub, MenubarSubTrigger, MenubarSubContent } from "@/components/ui/menubar";
import { Bold, Clipboard, CloudUpload, Copy, Download, FileText, Folder, Italic, Monitor, Redo2, RemoveFormatting, Scissors, StrikethroughIcon, Table, Underline, Undo2, ZoomIn, ZoomOut } from "lucide-react";
import { EditorStore } from "@/hooks/editor-store";
import { Document, Packer, Paragraph, TextRun } from "docx";
import html2canvas from "html2canvas";
import { preloadedDocProps } from "@/constants/types";
import { useMutation, usePreloadedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocMenuBar = ({ preloadedDoc }: preloadedDocProps) => {
	const router = useRouter();
	const docData = usePreloadedQuery(preloadedDoc)
	const create = useMutation(api.documents.createDocument);

	const { editor } = EditorStore();

	const createNewDoc = () => {
		create({ title: "Untitled Document", initialContent: "" })
			.catch(() => toast.error("Failed to create a new document. Please try again."))
			.then((doc_id) => {
				router.push(`/docs/${doc_id}`);
			})
	}

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

	const insertTable = (rows: number, cols: number) => {
		editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
	}

	const onDownload = (blob: Blob, filename: string) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
	}

	const exportAsDOCX = async () => {
		if (!editor) return;

		const text = editor.getText();
		const doc = new Document({
			sections: [
				{
					properties: {},
					children: [new Paragraph({ children: [new TextRun(text)] })],
				},
			],
		});

		const blob = await Packer.toBlob(doc);
		onDownload(blob, `${docData?.title}.docx`);
	};

	const exportAsTXT = async () => {
		if (!editor) return;

		const text = editor.getText();
		const blob = new Blob([text], { type: "text/plain" });
		onDownload(blob, `${docData?.title}.txt`);
	};

	const exportAsPDF = async () => {
		if (!editor) return;

		const node = document.querySelector(".ProseMirror") as HTMLElement;
		const canvas = await html2canvas(node, { scale: 2 });
		const imgData = canvas.toDataURL("image/png");
		const pdf = new jsPDF("p", "mm", "a4");

		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = pdf.internal.pageSize.getHeight();

		// Scale the image to fit full width
		const imgHeight = (canvas.height * pdfWidth) / canvas.width;

		// Add the image to fill the entire page width
		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);

		// Use your custom onDownload function
		onDownload(pdf.output("blob"), `${docData?.title}.pdf`);
	};

	const menus = [
		{
			id: "docs-file-menu",
			label: "File",
			items: [
				{ name: "New", icon: FileText, action: () => createNewDoc() },
				{
					name: "Export",
					icon: Download,
					submenu: [
						{ name: "Export as PDF", action: () => { exportAsPDF() } },
						{ name: "Export as DOCX", action: () => { exportAsDOCX() } },
						{ name: "Export as TXT", action: () => { exportAsTXT() } },
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
				{ name: "Cut", icon: Scissors, action: () => handleClipboardAction("cut", editor) },
				{ name: "Copy", icon: Copy, action: () => handleClipboardAction("copy", editor) },
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
		{
			id: "docs-insert-menu", label: "Insert", items: [
				{
					name: "Table",
					icon: Table,
					submenu: [
						{ name: "1x1", action: () => insertTable(1, 1) },
						{ name: "2x2", action: () => insertTable(2, 2) },
						{ name: "3x3", action: () => insertTable(3, 3) },
						{ name: "4x4", action: () => insertTable(4, 4) },
					],
				},
				{ name: "Merge Cells", action: () => editor?.chain().focus().mergeCells().run() },
				{ name: "Split Cell", action: () => editor?.chain().focus().splitCell().run() },
			]
		},
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
													{"icon" in subItem && <subItem.icon size={14} />}
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
