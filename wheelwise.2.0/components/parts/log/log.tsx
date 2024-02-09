'use client'

import { Toaster, toast } from 'sonner'

import React from 'react'

const Logg = () => {
   toast.message('Event has been created', {
      description: 'Monday, January 3rd at 6:00pm',
   })

   return <div>log</div>
}

export default Logg
