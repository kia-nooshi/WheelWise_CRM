import { Util } from '@/components'
import React from 'react'

export default async function ChatBox() {
  const addMessage = async (formData: FormData) => {
    'use server'

    Util.DataBase.Message.pushMessage({
      chatId: '65f622e683822359eec5965a',
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
        className='w-full rounded-lg p-2'
      />
      <button>Send</button>
    </form>
  )
}