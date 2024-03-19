import { Do, Ui } from '@/lib'
import React from 'react'
import Image from 'next/image'
import Reval from './reval'
import ChatBox from './chat'

export default async function page({ params }: { params: { slug: string } }) {
  const Lead = await Do.DataBase.Lead.getLead({ leadId: params.slug })
  const Chat = await Do.DataBase.Chat.getChat({ chatId: Lead.data?.chat?.id as string })

  return (
    <Ui.Flex className='w-full h-full' justify={'center'} align={'center'}>
      <Reval
        revalpath={`/dashboard/${Lead.data?.id as string}/${Lead.data?.id as string}`}
        sec={5}
      />
      <div className='w-[418px] h-[800px] px-7 py-12 relative'>
        <Image
          alt='logo'
          width='418'
          height='800'
          src='/images/mb2.png'
          className='absolute left-0 top-0 z-10'
        />
        <div className='px-12 absolute bottom-10 left-0 right-0 w-full z-30'>
          <ChatBox chatId={Chat.data?.id as string} threadId={Chat.data?.threadId as string} />
        </div>
        <Ui.Scroll.Area className='text-black w-full h-full p-5 pb-16 z-20 relative'>
          {Chat.data?.messages.map((msg) => (
            <div key={msg.id} className='flex flex-col gap-10'>
              <div
                className={Do.Util.tm(
                  ' p-5 my-2 shadow-sm w-2/3 text-sm',
                  msg.fromLead && 'ml-auto text-right bg-blue-300 rounded-xl',
                  !msg.fromLead && 'mr-auto text-left bg-green-400 rounded-xl'
                )}
              >
                {msg.content}
                <br />
                <span className='text-xs text-gray-500'>{msg.createdAt.toDateString()}</span>
              </div>
            </div>
          ))}
        </Ui.Scroll.Area>
      </div>
    </Ui.Flex>
  )
}
