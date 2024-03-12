import { Do } from '@/components'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   /*

   http://localhost:3004/api/leadReceiverTest

   {
      "organId":"65efab9413dc990eb182bf08",
      "firstName":"Danin",
      "lastName":"Namiri",
      "phone":"9493573929",
      "email":"danin@gmail.com"
   }

   {
   "organId":"65f0090e13dc990eb182c083",
   "firstName":"Jessica",
   "lastName":"Gonzalez",
   "phone":"2125550198",
   "email":"jessica.gonzalez@example.com",
   "message":"Interested in leasing a BMW 3 Series."
   }

   {
   "organId":"65f0090e13dc990eb182c083",
   "firstName":"Michael",
   "lastName":"Johnson",
   "phone":"7183336721",
   "email":"michael.johnson@example.com",
   "message":"Looking for financing options for a BMW M4."
   }

   {
   "organId":"65f0090e13dc990eb182c083",
   "firstName":"Emily",
   "lastName":"Anderson",
   "phone":"6467778345",
   "email":"emily.anderson@example.com",
   "message":"Interested in learning about BMW X7 safety features."
   }

   */

   const body = await request.json()

   try {
      const lead = await Do.Lead.pushLeadsApi({
         organId: body.organId,
         firstName: body.firstName,
         lastName: body.lastName,
         phone: body.phone,
         email: body.email,
         message: body.message,
      })

      if (!lead.data) throw new Error(lead.message)

      return NextResponse.json(lead.message, { status: 200 })
   } catch (error) {
      return NextResponse.json(error instanceof Error ? error.message : 'Internal Server Error', {
         status: 407,
      })
   }
}
