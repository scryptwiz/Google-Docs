import { Extension } from "@tiptap/react";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		lineHeight: {
			setLineHeight: (lineHeight: string) => ReturnType,
			unsetLineHeight: () => ReturnType,
		}
	}
}

export const LineHeightExtension = Extension.create({
	name: "lineHeight",

	addOptions () {
		return {
			types: ["paragraph", "heading"],
			defaultLineHeight: "1.5",
			lineHeights: ["1", "1.15", "1.5", "2", "2.5", "3"],
		}
	},

	addGlobalAttributes () {
		return [
			{
				types: this.options.types,
				attributes: {
					lineHeight: {
						default: this.options.defaultLineHeight,
						renderHTML: ({ lineHeight }) => {
							if (!lineHeight) {
								return {}
							}

							return {
								style: `line-height: ${lineHeight}`,
							}
						},
						parseHTML: (element: HTMLElement) => {
							const lineHeight = element.style.lineHeight || this.options.defaultLineHeight

							if (!lineHeight) {
								return {}
							}

							return {
								lineHeight,
							}
						},
					},
				},
			},
		]
	},

	addCommands () {
		return {
			setLineHeight: (lineHeight: string) => ({ chain }) => {
				return chain().setNode("paragraph", { lineHeight }).run()
			},
			unsetLineHeight: () => ({ chain }) => {
				return chain().setNode("paragraph", { lineHeight: null }).run()
			},
		}
	},
})