import { Do } from '@/lib'
import { revalidatePath } from 'next/cache'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    const Chat = await Do.Service.API.pushChat({
      chatId: body.chatId,
      content: body.content,
      fromLead: true,
      threadId: body.threadId,
    })

    console.log(Chat.data?.AiResponse.message)
    console.log(Chat.data?.Message.message)

    if (!Chat.data) throw new Error(Chat.message)

    return NextResponse.json(Chat.message, { status: 200 })
  } catch (error) {
    return NextResponse.json(error instanceof Error ? error.message : 'Internal Server Error', {
      status: 407,
    })
  }
}
