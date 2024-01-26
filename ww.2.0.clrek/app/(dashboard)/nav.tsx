import Logo from '@/components/logo'
import { ModeToggle } from '@/components/modeToggle'
import { FaArrowRight } from '@/lib/icon'
import { UserButton } from '@clerk/nextjs'
import { NavControl } from './navControl'

function Nav() {
   return (
      <nav className='fixed w-full max-w-3xl flex flex-row items-center justify-between top-10 z-50'>
         <div className='  flex flex-row items-center justify-between gap-2'>
            <Logo></Logo>
            <FaArrowRight></FaArrowRight>
            <NavControl></NavControl>
            <ModeToggle></ModeToggle>
         </div>
         <div className='  flex flex-row items-center justify-between gap-2'>
            <UserButton afterSignOutUrl='/' />
         </div>
      </nav>
   )
}

export default Nav
