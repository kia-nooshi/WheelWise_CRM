import { CMP, Icon } from '@/lib'
import { NavControl } from './navControl'

export const Navigation = () => {
   return (
      <nav className='fixed w-full max-w-3xl flex flex-row items-center justify-between top-10 z-50'>
         <div className='flex flex-row items-center justify-between gap-5 '>
            <CMP.Shared.Logo />
            <Icon.ArrowRight />
            <NavControl />
         </div>
         <div></div>
      </nav>
   )
}
