import { Do } from '@/lib'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    const res = await Do.Service.API.pushLead({
      organId: body.organId,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email,
      message: body.message,
    })

    console.log(res.data?.lead.message)
    console.log(res.data?.chat.message)
    console.log(res.data?.Message.message)
    console.log(res.data?.AiResponse.message)

    if (!res.data) throw new Error(res.message)

    return NextResponse.json(res.message, { status: 200 })
  } catch (error) {
    return NextResponse.json(error instanceof Error ? error.message : 'Internal Server Error', {
      status: 407,
    })
  }
}
