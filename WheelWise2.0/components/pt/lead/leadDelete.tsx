'use client'

import { IconTrash } from '@/lib/theme/icon'

interface LeradDelete {
   RemoveId: string
}

export const LeadDelete = ({ RemoveId }: LeradDelete) => {
   const handleDelete = async () => {
      try {
      } catch (error) {
         console.error(error)
         // Handle error
      }
   }

   return (
      <form className='hover:text-rose-300'>
         <IconTrash />
      </form>
   )
}
