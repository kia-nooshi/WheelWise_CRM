import { Ui } from '@/lib'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href='./' className='text-white text-lg'>
      <Ui.Style font='Poppins'>
        <span className='text-blue-700'>Wheel</span>
        <span className='text-violet-700'>Wise</span>
      </Ui.Style>
    </Link>
  )
}
