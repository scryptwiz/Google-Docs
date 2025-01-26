import { Extension } from "@tiptap/react";
import "@tiptap/extension-text-style";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		fontSize: {
			setFontSize: (fontSize: string) => ReturnType;
			unsetFontSize: () => ReturnType;
		};
	}
}

export const FontSizeExtension = Extension.create({
	name: "fontSize",

	addOptions () {
		return {
			types: ["textStyle"],
			fontSizes: ["12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px", "48px", "60px", "72px"],
		};
	},

	addGlobalAttributes () {
		return [
			{
				types: ["textStyle"],
				attributes: {
					fontSize: {
						default: null,
						renderHTML: ({ fontSize }) => {
							if (!fontSize) {
								return {};
							}

							return {
								style: `font-size: ${fontSize}`,
							};
						},
						parseHTML: (element: HTMLElement) => {
							const fontSize = element.style.fontSize;

							if (!fontSize) {
								return {};
							}

							return {
								fontSize,
							};
						},
					},
				},
			},
		];
	},

	addCommands () {
		return {
			setFontSize: (fontSize: string) => ({ chain }) => {
				return chain().setMark("textStyle", { fontSize }).run();
			},
			unsetFontSize: () => ({ chain }) => {
				return chain().setMark("textStyle", { fontSize: null }).run();
			},
		};
	},
})