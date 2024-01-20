import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'

//
// IMPORT END
// -------------------------------------------------------------

const font = Poppins({
   subsets: ['latin'],
   weight: ['600'],
})

interface Props {
   children: ReactNode
}

export const Header = ({ children }: Props) => {
   return (
      <div className='w-fill flex flex-col gap-y-4 items-center justify-center'>
         <h1 className={cn('text-3xl font-semaibold', font.className)}>
            🔒 Auth
         </h1>
         <p className='text-muted-foreground text-sm'>{children}</p>
      </div>
   )
}
