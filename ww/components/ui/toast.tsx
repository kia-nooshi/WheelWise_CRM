'use client'

import { Toaster, toast } from 'sonner'
import React, { useEffect } from 'react'

export function Toast({ msg }: { msg: string }) {
   useEffect(() => {
      if (msg) {
         toast(msg)
      }
   }, [msg])

   return <Toaster />
}
