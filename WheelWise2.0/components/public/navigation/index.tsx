import { CMP, Icon } from '@/lib'
import { Controler } from './controler'

export const Navigation = () => {
   return (
      <nav className='fixed w-full max-w-3xl flex flex-row items-center justify-between top-10 z-50'>
         <div className='flex flex-row items-center justify-between gap-5 '>
            <CMP.Shared.Logo />
            <Icon.ArrowRight />
            <Controler />
         </div>
         <div></div>
      </nav>
   )
}
