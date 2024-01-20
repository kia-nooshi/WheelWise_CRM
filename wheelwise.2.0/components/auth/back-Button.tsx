import { Button } from '@/import/comps-ui'
import Link from 'next/link'
import { ReactNode } from 'react'

//
// IMPORT END
// -------------------------------------------------------------

interface Props {
   children: ReactNode
   href: string
}

export const BackButton = ({ children, href }: Props) => {
   return (
      <Button variant='link' className='font-normal w-full' size='sm' asChild>
         <Link href={href}>{children}</Link>
      </Button>
   )
}
