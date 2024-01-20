'use client'

import { Button } from '@/import/comps-ui'
import { FaGithub, FcGoogle } from '@/import/icons'

//
// IMPORT END
// -------------------------------------------------------------

export const Social = () => {
   return (
      <div className='flex items-center justify-center w-full gap-x-2'>
         <Button
            size='lg'
            className='w-full'
            variant='outline'
            onClick={() => {}}
         >
            <FcGoogle className='h-5 w-5' />
         </Button>
         <Button
            size='lg'
            className='w-full'
            variant='outline'
            onClick={() => {}}
         >
            <FaGithub className='h-5 w-5' />
         </Button>
      </div>
   )
}
