'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { FontSizeExtension } from '@/extensions/font-size'
import { LineHeightExtension } from '@/extensions/line-height'

// load all languages with "all" or common languages with "common"
import { all, createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { EditorStore } from '@/hooks/editor-store'
import { Ruler } from './ruler'
import { preloadedDocProps } from '@/constants/types'
import { usePreloadedQuery } from 'convex/react'
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Threads } from '@/app/docs/[_id]/threads'
import { useStorage } from '@liveblocks/react'
import { LEFT_MARGIN, RIGHT_MARGIN } from '@/constants/ui'

const Editor = ({ preloadedDoc }: preloadedDocProps) => {
  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);

  const { setEditor } = EditorStore();
  const docData = usePreloadedQuery(preloadedDoc)

  const liveblocks = useLiveblocksExtension({
    initialContent: docData?.initialContent,
    offlineSupport_experimental: true,
  });

  // create a lowlight instance with all languages loaded
  const lowlight = createLowlight(all)

  // This is only an example, all supported languages are already loaded above
  // but you can also register only specific languages to reduce bundle-size
  lowlight.register('html', html)
  lowlight.register('css', css)
  lowlight.register('js', js)
  lowlight.register('ts', ts)

  const editor = useEditor({
    immediatelyRender: false,
    onCreate ({ editor }) { setEditor(editor); },
    onDestroy () { setEditor(null) },
    onTransaction ({ editor }) { setEditor(editor) },
    onFocus ({ editor }) { setEditor(editor) },
    onBlur ({ editor }) { setEditor(editor) },
    onUpdate ({ editor }) { setEditor(editor) },
    onContentError ({ editor }) { setEditor(editor) },
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin ?? LEFT_MARGIN}px; padding-right: ${rightMargin ?? RIGHT_MARGIN}px;`,
        class: 'focus:outline-none print:border-0 bg-white border border-s2 flex flex-col min-h-[1000px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false
      }),
      TaskList,
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
      Underline,
      FontFamily,
      TextStyle,
      Color,
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ['paragraph', 'heading'],
        defaultLineHeight: '1.15',
      }),
      Highlight.configure({ multicolor: true }),
      TaskItem.configure({ nested: true }),
      CodeBlockLowlight.configure({ lowlight }),
      Table.configure({ resizable: true }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            // disallowed domains
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            // all checks have passed
            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },
      }),
    ],
    //     content: `
    //             <h1>Hello World! 🌎️</h1>
    //             <blockquote>Nothing is impossible, the word itself says “I’m possible!” </blockquote>
    //             <pre><code class="language-javascript">for (var i=1; i <= 20; i++) {
    //   if (i % 15 == 0)
    //     console.log("FizzBuzz");
    //   else if (i % 3 == 0)
    //     console.log("Fizz");
    //   else if (i % 5 == 0)
    //     console.log("Buzz");
    //   else
    //     console.log(i);
    // }</code>
    //             </pre>
    //             <p>Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.</p>
    //             <table>
    //           <tbody>
    //             <tr>
    //               <th>Name</th>
    //               <th colspan="3">Description</th>
    //             </tr>
    //             <tr>
    //               <td>Cyndi Lauper</td>
    //               <td>Singer</td>
    //               <td>Songwriter</td>
    //               <td>Actress</td>
    //             </tr>
    //           </tbody>
    //         </table>
    //         `,
  })

  return (
    <div className="size-full overflow-x-auto bg-s3 px-4 print:p-0 print:bg-white print:overflow-x-visible">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] print:py-0 py-4 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  )
}

export default Editor;