import { cn } from '@/lib/utils'
import { FontPoppin } from '@/lib/fonts/'
import { ReactNode } from 'react'

//
// IMPORT END
// -------------------------------------------------------------

interface Props {
   children: ReactNode
}

export const Header = ({ children }: Props) => {
   return (
      <div className='w-fill flex flex-col gap-y-4 items-center justify-center'>
         <h1 className={cn('text-3xl font-semaibold', FontPoppin.className)}>
            🔒 Auth
         </h1>
         <p className='text-muted-foreground text-sm'>{children}</p>
      </div>
   )
}
