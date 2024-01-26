'use server'

import { auth } from '@clerk/nextjs'
import React from 'react'

function page() {
   const user = auth()
   console.log('😂', user.getToken)
   return <div>page</div>
}

export default page
