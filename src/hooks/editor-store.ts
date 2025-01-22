import { create } from 'zustand'
import { type Editor } from '@tiptap/react';

type EditorStateProps = {
	editor: Editor | null;
	setEditor: (editor: Editor | null) => void;
}

const EditorStore = create<EditorStateProps>((set) => ({
	editor: null,
	setEditor: (editor) => set({ editor }),
}))

export { EditorStore }