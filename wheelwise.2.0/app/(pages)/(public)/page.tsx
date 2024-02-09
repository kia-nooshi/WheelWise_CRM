'use client'

import FlexCenter from '@/components/ui/flex-center'
import { FontPoppin } from '@/lib/style/font'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Home() {
   return (
      <FlexCenter>
         <Image alt='logo' width='200' height='300' src='/images/logo.png' />
         <span className='m-10'>
            <h1 className={cn('text-5xl mb-5', FontPoppin.className)}>
               <span className='text-blue-700'>Wheel</span>
               <span className='text-violet-700'>Wise</span> CRM is finally
               here!
            </h1>
            <h2 className={cn('text-3xl', FontPoppin.className)}>
               Revolutionizing Car Sales with Advanced AI
            </h2>
         </span>

         <p className='text-zinc-500'>
            Seamless Integration, Enhanced User Experience: Explore Next-Level
            Features with WheelWise CRM 2.0 <br /> Empowering Smarter, Faster,
            and More Efficient Car Sales
         </p>
      </FlexCenter>
   )
}
