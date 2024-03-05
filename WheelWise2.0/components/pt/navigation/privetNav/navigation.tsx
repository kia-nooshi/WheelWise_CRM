import { UserButton } from '@clerk/nextjs'
import { NavLogo } from './navLogo'

export const PrivateNav = () => {
   return (
      <nav className='fixed w-full max-w-3xl flex flex-row items-center justify-between top-10 z-50'>
         <div className='flex flex-row items-center justify-between gap-5 '>
            <NavLogo></NavLogo>
         </div>
         <div>
            <UserButton afterSignOutUrl='/' />
         </div>
      </nav>
   )
}
