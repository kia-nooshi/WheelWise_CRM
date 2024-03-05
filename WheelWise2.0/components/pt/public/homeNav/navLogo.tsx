import React from 'react'
import { FontPoppin } from '@/lib/theme'
import { tm } from '@/lib/utils'
import Link from 'next/link'

export const NavLogo = () => {
   return (
      <Link
         href='./'
         className={tm(' text-white text-lg', FontPoppin.className)}
      >
         <span className='text-blue-700'>Wheel</span>
         <span className='text-violet-700'>Wise</span>
         <br />
      </Link>
   )
}
