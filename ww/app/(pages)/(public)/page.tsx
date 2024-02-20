import { FlexColC } from '@/components/'
import { Toast } from '@/components/ui/toast'
import { FontPoppin } from '@/lib/style/font'
import { tm } from '@/lib/utils'
import Image from 'next/image'

export default async function Home() {
   return (
      <FlexColC className='text-center'>
         <Image alt='logo' width='200' height='300' src='/images/logo.png' />
         <span className='m-10'>
            <h1 className={tm('text-5xl', FontPoppin.className)}>
               <span className='text-blue-700'>Wheel</span>
               <span className='text-violet-700'>Wise</span> CRM is finally
               here!
            </h1>
            <h2 className={tm('text-3xl', FontPoppin.className)}>
               Revolutionizing Car Sales with Advanced AI
            </h2>
         </span>

         <p className='text-zinc-500'>
            Seamless Integration, Enhanced User Experience: Explore Next-Level
            Features with WheelWise CRM 2.0 <br /> Empowering Smarter, Faster,
            and More Efficient Car Sales
         </p>
      </FlexColC>
   )
}
