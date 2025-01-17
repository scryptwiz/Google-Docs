'use client'

import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

type editorsProps = {}

const Editor = (props: editorsProps) => {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'focus:outline-none print:border-0 bg-white border border-darken flex flex-col min-h-[1056px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
            },
        },
        extensions: [StarterKit],
        content: '<p>Hello World! 🌎️</p>',
    })

    return (
        <div className="size-full overflow-x-auto bg-neutral px-4 print:p-0 print:bg-white print:overflow-x-visible">
            <div className="min-w-max flex justify-center w-[816px] print:py-0 py-4 mx-auto print:w-full print:min-w-0">
                <EditorContent editor={editor}/>
            </div>
        </div>
    )
}

export default Editor;