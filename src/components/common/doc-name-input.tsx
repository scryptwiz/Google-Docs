"use client"

import { preloadedDocProps } from '@/constants/types'
import { docStore } from '@/hooks/store'
import { useMutation, usePreloadedQuery } from 'convex/react'
import { CloudUpload, Loader2, Star } from 'lucide-react'
import React, { useRef } from 'react'
import { api } from '../../../convex/_generated/api'
import { toast } from 'sonner'

export default function DocNameInput ({ preloadedDoc }: preloadedDocProps) {
	const spanRef = useRef<HTMLSpanElement>(null)
	const update = useMutation(api.documents.updateById);
	const document = usePreloadedQuery(preloadedDoc)

	const { docName, setDocName } = docStore()
	const [isUpdating, setIsUpdating] = React.useState(false);

	React.useEffect(() => {
		if (document?.title) setDocName(document.title);
	}, [document?.title]);

	const handleEnterPress = (event: React.KeyboardEvent<HTMLSpanElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			if (spanRef.current) {
				const value = spanRef.current.innerText
				sendValueToFunction(value)
			}
		}
	}

	const sendValueToFunction = (value: string) => {
		setDocName(value)
		setIsUpdating(true);
		update({ id: document._id, title: value.trim() || "Untitled" })
			.catch(() => toast.error("Failed to rename document"))
			.then(() => toast.success("Document renamed successfully"))
			.finally(() => {
				setIsUpdating(false);
			});
		console.log('Name change:', value)
	}

	return (
		<div className='flex gap-2 items-center'>
			<div className="relative">
				<span
					role="textbox"
					contentEditable={!isUpdating}
					className={`outline-none border-none focus:outline-2 focus:outline-p1 hover:outline-1 outline-0 hover:outline-s2 bg-white px-1 cursor-text rounded text-md py-0 shadow-none min-w-1 block text-base 
                        ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''} `}
					ref={spanRef}
					onKeyDown={handleEnterPress}
					suppressContentEditableWarning
				>
					{docName}
				</span>
			</div>
			<div className='flex gap-1'>
				{isUpdating && (
					<span className='p-1.5'>
						<Loader2 className="size-4 animate-spin text-gray-500" />
					</span>
				)}
				<span className='transition-all duration-300 cursor-pointer rounded-full p-1.5 hover:bg-s1/15'>
					<Star className='size-4' />
				</span>
				<span className='transition-all duration-300 cursor-pointer rounded-full p-1.5 hover:bg-s1/15'>
					<CloudUpload className='size-4' />
				</span>
			</div>
		</div>
	)
}