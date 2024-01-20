'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

//
// IMPORT END
// -------------------------------------------------------------

interface Props {
   children: ReactNode
   mode?: 'modal' | 'redirect'
   asChild?: boolean
}

export function LoginButton({ children, mode = 'redirect', asChild }: Props) {
   const router = useRouter()

   const onClick = () => {
      router.push('/sign-in')
   }

   return (
      <div onClick={onClick} className='cursor-pointer'>
         {children}
      </div>
   )
}
