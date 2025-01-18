'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

// load all languages with "all" or common languages with "common"
import { all, createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

type editorsProps = {}

const Editor = (props: editorsProps) => {
    // create a lowlight instance with all languages loaded
    const lowlight = createLowlight(all)

    // This is only an example, all supported languages are already loaded above
    // but you can also register only specific languages to reduce bundle-size
    lowlight.register('html', html)
    lowlight.register('css', css)
    lowlight.register('js', js)
    lowlight.register('ts', ts)

    const editor = useEditor({
        editorProps: {
            attributes: {
                style: 'padding-left: 62px; paddinf-right: 62px;',
                class: 'focus:outline-none print:border-0 bg-white border border-s2 flex flex-col min-h-[1056px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
            },
        },
        extensions: [
            StarterKit,
            TaskList,
            TaskItem.configure({ nested: true }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        content: `
            <h1>Hello World! 🌎️</h1>
            <blockquote>Nothing is impossible, the word itself says “I’m possible!” </blockquote>
            <pre><code class="language-javascript">for (var i=1; i <= 20; i++) {
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code>
            </pre>
            <p>Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.</p>
        `,
    })

    return (
        <div className="size-full overflow-x-auto bg-s3 px-4 print:p-0 print:bg-white print:overflow-x-visible">
            <div className="min-w-max flex justify-center w-[816px] print:py-0 py-4 mx-auto print:w-full print:min-w-0">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default Editor;