'use client'

import React, { useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

export default function Copy({ codeSnippet, isCode }: { codeSnippet: string; isCode?: boolean }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 700) // Reset the copied state after 3 seconds
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <span className='relative w-full'>
      <div className=''>
        {isCode && (
          <pre className='whitespace-pre-wrap'>
            <code>{codeSnippet}</code>
          </pre>
        )}
        {!isCode && <span>{codeSnippet}</span>}
      </div>
      <button onClick={copyToClipboard} className='absolute top-1 right-1'>
        {copied ? <FiCheck className='text-orange-500' /> : <FiCopy />}
      </button>
    </span>
  )
}
