import Logo from '@/components/logo'
import React from 'react'
import { FaArrowRight } from '@/lib/icon'
import { NavControl } from './navControl'
import { ModeToggle } from '@/components/modeToggle'

function Nav() {
   return (
      <nav className='fixed w-full max-w-3xl flex flex-row items-center justify-between top-40'>
         <div className='  flex flex-row items-center justify-between gap-5'>
            <Logo></Logo>
            <FaArrowRight></FaArrowRight>
            <NavControl></NavControl>
         </div>
         <div>
            <ModeToggle></ModeToggle>
         </div>
      </nav>
   )
}

export default Nav
