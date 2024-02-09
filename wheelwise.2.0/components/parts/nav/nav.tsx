import { NavControlHome } from './navControlHome'

import { FaArrowRight } from '@/lib/style/icon'
import { NavLogo } from './navLogo'
import { NavTheme } from './navTheme'

const nav = () => {
   return (
      <nav className='fixed w-full max-w-3xl flex flex-row items-center justify-between top-10 z-50'>
         <div className='  flex flex-row items-center justify-between gap-1 '>
            <NavLogo></NavLogo>
            <FaArrowRight className='mx-5'></FaArrowRight>
            <NavControlHome></NavControlHome>
         </div>
         <div>
            <NavTheme></NavTheme>
         </div>
      </nav>
   )
}

export default nav
