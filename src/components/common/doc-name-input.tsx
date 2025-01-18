"use client"

import { docStore } from '@/hooks/store'
import { CloudUpload, Star } from 'lucide-react'
import React, { useRef } from 'react'

type Props = {}

export default function DocNameInput ({ }: Props) {
	const { docName, setDocName } = docStore()
	const spanRef = useRef<HTMLSpanElement>(null)

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
		console.log('Name change:', value)
	}

	return (
		<div className='flex gap-3 items-center'>
			<div>
				<span
					role="textbox"
					contentEditable
					className='outline-none border-none focus:outline-2 focus:outline-p1 hover:outline-1 outline-0 hover:outline-s2 bg-white px-1 cursor-text rounded text-md py-0 shadow-none min-w-1 block text-base'
					ref={spanRef}
					onKeyDown={handleEnterPress}
					suppressContentEditableWarning
				>
					{docName}
				</span>
			</div>
			<div className='flex gap-2'>
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