import { Util } from '@/components'
import React from 'react'

export default async function ChatBox({ chatId }: { chatId: string }) {
  const addMessage = async (formData: FormData) => {
    'use server'

    Util.DataBase.Message.pushMessage({
      chatId,
      content: formData.get('message') as string,
      fromLead: false,
    })
  }

  return (
    <form action={addMessage} className='flex flex-row items-center justify-center gap-5 w-full'>
      <input
        name='message'
        required
        placeholder='Type your message here ...'
        className='py-2 px-5 w-full rounded-full '
      />
      <button className='py-2 px-5 bg-blue-600 rounded-full'>Send</button>
    </form>
  )
}