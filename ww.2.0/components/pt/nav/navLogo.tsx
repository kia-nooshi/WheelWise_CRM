import React from 'react'
import { FontPoppin } from '@/lib/font'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export const NavLogo = () => {
   return (
      <Link
         href='./'
         className={cn('text-5xl text-white text-lg', FontPoppin.className)}
      >
         <span className='text-blue-700'>Wheel</span>
         <span className='text-violet-700'>Wise</span>
         <br />
      </Link>
   )
}
