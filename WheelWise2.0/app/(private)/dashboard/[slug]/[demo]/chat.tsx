import { Do } from '@/lib'
import { FiSend } from 'react-icons/fi'

export default async function ChatBox({ chatId, threadId }: { chatId: string; threadId: string }) {
  const addMessage = async (formData: FormData) => {
    'use server'

    const Chat = await Do.Service.API.pushChat({
      chatId,
      content: formData.get('message') as string,
      fromLead: true,
      threadId,
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
      <button className='py-2 px-5 w-[50px] h-[50px] bg-blue-600 rounded-full'>
        <FiSend />
      </button>
    </form>
  )
}
