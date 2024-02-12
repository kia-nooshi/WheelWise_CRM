import { FaArrowRight } from '@/lib/style/icon'
import { NavLogo } from './navLogo'
import { NavControl } from './navControl'

export const HomeNav = () => {
   return (
      <nav className='fixed w-full max-w-3xl flex flex-row items-center justify-between top-10 z-50'>
         <div className='flex flex-row items-center justify-between gap-5 '>
            <NavLogo></NavLogo>
            <FaArrowRight />
            <NavControl />
         </div>
         <div></div>
      </nav>
   )
}
