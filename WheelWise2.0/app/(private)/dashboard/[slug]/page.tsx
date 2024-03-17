import { Do, Ui, Util } from '@/lib'
import { Box, Card, Flex, Heading, ScrollArea, Separator, Text } from '@radix-ui/themes'
import Link from 'next/link'
import LeadRefresh from './leadRefresh'
import sbItem from './sidebar_item'
import SubItem from './sidebar_item'
import { SiVitest } from 'react-icons/si'
import ChatBox from './chatBox'

const LeadPage = async ({ params }: { params: { slug: string } }) => {
  const Lead = await Do.Lead.getLead({ leadId: params.slug })
  const Chat = await Do.Chat.getChat({ leadId: params.slug })

  const codeSnippet = `
{
   "threadId": "${Chat.data?.threadId}",
   "chatId":   "${Chat.data?.id}",
   "content":  "NEW MESSAGE HERE",
   "fromLead": true
}`

  const codeSnippet2 = `http://localhost:3000/api/leadMessage`

  return (
    <div>
      <LeadRefresh />

      <Link href='/dashboard' className='m-5'>
        back
      </Link>
      <div className='mt-5 flex flex-row gap-5'>
        <div className='flex flex-col w-1/2 gap-5'>
          <Card className='w-full py-5'>
            <Text as='div' size='2' className='pb-5 font-thin text-blue-400'>
              Lead Information
            </Text>
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
          </Card>

          <Card className='w-full py-5'>
            <Text as='div' size='2' className='pb-5 flex flex-row gap-2 items-center'>
              <SiVitest className='text-orange-500' /> Test this CHAT
            </Text>
            <Text as='div' color='gray' size='2' className='flex flex-col gap-4'>
              <pre className='mt-1 p-2 bg-gray-950 text-xs opacity-25'>
                <code>{codeSnippet}</code>
              </pre>

              <pre className='mt-1 p-2 bg-gray-950 text-xs opacity-25'>
                <code>{codeSnippet2}</code>
              </pre>
            </Text>
          </Card>
        </div>
        <div className='flex flex-col gap-5'>
          <Card variant='surface' className='py-5'>
            <ScrollArea className='max-h-[700px] p-5'>
              <Text as='div' size='2' weight='bold' className='m-5'>
                Chat History
              </Text>
              <Text as='div' color='gray' size='1'>
                {Chat.data?.messages.map((msg) => (
                  <div key={msg.id} className='flex flex-col gap-10'>
                    <Box
                      className={Util.Other.twMerge(
                        ' p-5 my-2 shadow-sm w-2/3',
                        !msg.fromLead && ' ml-auto text-right border-r-4 border-indigo-600',
                        msg.fromLead && 'mr-auto text-left border-l-4 border-blue-400'
                      )}
                    >
                      {msg.content}
                      <br />
                      <span className='text-xs text-gray-500'>{msg.createdAt.toDateString()}</span>
                    </Box>
                  </div>
                ))}
              </Text>
            </ScrollArea>
          </Card>
          <ChatBox chatId={Chat.data?.id as string} />
        </div>
      </div>
    </div>
  )
}

export default LeadPage
