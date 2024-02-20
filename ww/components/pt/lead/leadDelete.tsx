'use client'

import { deleteLead } from '@/lib/function/leadManagmentss/ttttt'
import { IconTrash } from '@/lib/style/icon'

interface LeradDelete {
   RemoveId: string
}

export const LeadDelete = ({ RemoveId }: LeradDelete) => {
   const handleDelete = async () => {
      try {
         const response = await deleteLead(RemoveId)

         if (response.data) {
            console.log(response.data)
         }
      } catch (error) {
         console.error(error)
         // Handle error
      }
   }

   return (
      <form onClick={handleDelete} className='hover:text-rose-300'>
         <IconTrash />
      </form>
   )
}
