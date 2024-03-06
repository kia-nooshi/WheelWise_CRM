import { UserButton } from '@clerk/nextjs'
import { Logo } from '@/lib/components'

export const NavTop = () => {
   return (
      <nav className='w-full max-w-3xl flex flex-row items-center justify-between m-3 p-2 rounded-lg'>
         <Logo></Logo>
         <UserButton afterSignOutUrl='/' />
      </nav>
   )
}
