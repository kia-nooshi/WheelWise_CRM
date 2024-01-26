import Logo from '@/components/logo'
import React from 'react'
import { FaArrowRight } from '@/lib/icon'
import { NavControl } from './navControl'
import { ModeToggle } from '@/components/modeToggle'
import { UserButton } from '@clerk/nextjs'

function Nav() {
   return (
      <nav className='fixed w-full max-w-3xl flex flex-row items-center justify-between top-10'>
         <div className='  flex flex-row items-center justify-between gap-2'>
            <Logo></Logo>
            <FaArrowRight></FaArrowRight>
            <NavControl></NavControl>
            <ModeToggle></ModeToggle>
         </div>
         <div>
            <UserButton afterSignOutUrl='/' />
         </div>
      </nav>
   )
}

export default Nav
