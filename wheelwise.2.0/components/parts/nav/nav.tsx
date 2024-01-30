import { UserButton, auth } from '@clerk/nextjs'
import { NavControlHome } from './navControlHome'
import { NavControlUser } from './navControlUser'

import { FaArrowRight } from '@/lib/icon'
import { NavLogo } from './navLogo'
import { NavTheme } from './navTheme'

const nav = () => {
   const { userId } = auth()

   return (
      <nav className='fixed w-full max-w-3xl flex flex-row items-center justify-between top-10 z-50'>
         <div className='  flex flex-row items-center justify-between gap-1 '>
            <NavLogo></NavLogo>
            <FaArrowRight className='mx-5'></FaArrowRight>

            {/*User -> Loged in*/}
            {userId && <NavControlUser></NavControlUser>}
            {userId && <NavTheme></NavTheme>}

            {/*User -> NOT Loged in*/}
            {!userId && <NavControlHome></NavControlHome>}
         </div>
         <div>
            {/*User -> Loged in*/}
            {userId && <UserButton afterSignOutUrl='/' />}

            {/*User -> NOT Loged in*/}
            {!userId && <NavTheme></NavTheme>}
         </div>
      </nav>
   )
}

export default nav
