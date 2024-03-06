import { C, Ui } from '@/components'
import Link from 'next/link'

export default function Logo() {
   return (
      <Link href='./' className='text-white text-lg'>
         <Ui.Font name='Poppins'>
            <span className='text-blue-700'>Wheel</span>
            <span className='text-violet-700'>Wise</span>
         </Ui.Font>
      </Link>
   )
}
