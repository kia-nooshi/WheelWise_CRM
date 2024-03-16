import React from 'react'

export default function ChatBox() {
  return (
    <form className='flex flex-row items-center justify-center gap-5 w-full'>
      <input className='w-full rounded-lg p-2' />
      <button>Send</button>
    </form>
  )
}