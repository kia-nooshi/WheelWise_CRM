import React from 'react'

export default async function ChatBox() {
  const addMessage = async (formData: FormData) => {
    'use server'

    const ss = formData.get('message')

    console.log(ss)
  }

  return (
    <form action={addMessage} className='flex flex-row items-center justify-center gap-5 w-full'>
      <input
        name='message'
        required
        placeholder='Type your message here ...'
        className='w-full rounded-lg p-2'
      />
      <button>Send</button>
    </form>
  )
}