'use client'
import React, { useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

interface CodeBlockWithCopyButtonProps {
  codeSnippet: string
}

const CodeBlockWithCopyButton: React.FC<CodeBlockWithCopyButtonProps> = ({ codeSnippet }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        // Optionally, reset the copied state after a few seconds
        setTimeout(() => setCopied(false), 3000)
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }

  return (
    <div className='code-block-with-copy relative'>
      <pre className='bg-gray-950 text-xs opacity-75 rounded-lg p-2 whitespace-pre-wrap'>
        <code>{codeSnippet}</code>
      </pre>
      <button onClick={() => copyToClipboard(codeSnippet)} className='absolute top-0 right-0 m-2'>
        {copied ? <FiCheck className='text-green-500' size='20px' /> : <FiCopy size='20px' />}
      </button>
    </div>
  )
}

export default CodeBlockWithCopyButton
