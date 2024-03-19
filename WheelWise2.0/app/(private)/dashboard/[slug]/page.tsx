import { Do, Ui } from '@/lib'
import { Separator, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { SiVitest } from 'react-icons/si'
import ChatBox from './chatBox'
import SubItem from './sidebar_item'
import Reval from './reval'

const LeadPage = async ({ params }: { params: { slug: string } }) => {
  const Lead = await Do.DataBase.Lead.getLead({ leadId: params.slug })
  const Chat = await Do.DataBase.Chat.getChat({ chatId: Lead.data?.chat?.id as string })

  const codeSnippet = `
{
   "threadId": "${Chat.data?.threadId}",
   "chatId":   "${Chat.data?.id}",
   "content":  "NEW MESSAGE HERE",
   "fromLead": true
}`

  return (
    <div>
      <Reval revalpath={`/dashboard/${Lead.data?.id as string}`} sec={5} />

      <Link href='/dashboard' className='m-5'>
        back
      </Link>
      <div className='mt-5 flex flex-row gap-5'>
        <div className='flex flex-col w-1/2 gap-5'>
          <Ui.Card.main className='w-full'>
            <Ui.Card.Header>
              <Ui.Card.Title>Lead Information</Ui.Card.Title>
            </Ui.Card.Header>
            <Ui.Card.Content>
              <Text as='div' color='gray' size='2' className='flex flex-col gap-4'>
                <Separator my='1' size='4' color='blue' />
                <SubItem title='First Name'>{Lead.data?.firstName}</SubItem>
                <SubItem title='Last Name'>{Lead.data?.lastName}</SubItem>
                <Separator my='1' size='4' />
                <SubItem title='Email'>{Lead.data?.email}</SubItem>
                <SubItem title='Phone'>{Lead.data?.phone}</SubItem>
                <Separator my='1' size='4' />
                <SubItem title='Created at'>{Lead.data?.createdAt.toDateString()}</SubItem>
              </Text>
            </Ui.Card.Content>
          </Ui.Card.main>

          <Ui.Card.main className='w-full'>
            <Ui.Card.Header>
              <Ui.Card.Title>
                <Text as='div' size='2' className='pb-5 flex flex-row gap-2 items-center'>
                  <SiVitest className='text-orange-500' /> Test this CHAT
                </Text>
              </Ui.Card.Title>
            </Ui.Card.Header>
            <Ui.Card.Content>
              <Text as='div' color='gray' size='2' className='flex flex-col gap-4'>
                <pre className='mt-1 p-2 bg-gray-950 text-xs opacity-25'>
                  <code>{codeSnippet}</code>
                </pre>
              </Text>
            </Ui.Card.Content>
          </Ui.Card.main>
        </div>
        <div className='flex flex-col gap-5'>
          <Ui.Card.main className='w-full'>
            <Ui.Card.Header>
              <Ui.Card.Title>Chat History</Ui.Card.Title>
            </Ui.Card.Header>
            <Ui.Card.Content>
              {Chat.data?.messages.map((msg) => (
                <div key={msg.id} className='flex flex-col gap-10'>
                  <div
                    className={Do.Util.tm(
                      ' p-5 my-2 shadow-sm w-2/3 text-sm',
                      !msg.fromLead && 'ml-auto text-right border-r-4 border-indigo-600',
                      msg.fromLead && 'mr-auto text-left border-l-4 border-blue-400'
                    )}
                  >
                    {msg.content}
                    <br />
                    <span className='text-xs text-gray-500'>{msg.createdAt.toDateString()}</span>
                  </div>
                </div>
              ))}
            </Ui.Card.Content>
          </Ui.Card.main>

          <ChatBox chatId={Chat.data?.id as string} />
        </div>
      </div>
    </div>
  )
}

export default LeadPage
