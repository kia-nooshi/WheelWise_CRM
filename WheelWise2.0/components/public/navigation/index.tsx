import { C, Ui } from '@/components'
import { Controler } from './controler'

export default function Navigation() {
   return (
      <nav className='fixed w-full max-w-3xl flex flex-row items-center justify-between top-10 z-50'>
         <div className='flex flex-row items-center justify-between gap-5 '>
            <C.Shared.Logo />
            <Ui.Icon name='Arrow_Right' />
            <Controler />
         </div>
         <div></div>
      </nav>
   )
}
