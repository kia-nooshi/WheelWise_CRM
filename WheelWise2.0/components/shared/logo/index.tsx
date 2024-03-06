import { Font } from '@/lib'
import Link from 'next/link'

export const Logo = () => {
   return (
      <Link href='./' className='text-white text-lg'>
         <span className={Font.Poppins.className}>
            <span className='text-blue-700'>Wheel</span>
            <span className='text-violet-700'>Wise</span>
         </span>
      </Link>
   )
}
