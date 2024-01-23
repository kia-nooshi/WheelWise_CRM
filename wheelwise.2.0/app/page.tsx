import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LoginButton } from '@/components/auth/login-button'
import { FontPoppin } from '@/lib/fonts'
import Image from 'next/image'

export default function Home() {
   return (
      <main
         className=' flex h-full flex-col items-center 
      justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 to-zinc-950'
      >
         <Image alt='logo' width='200' height='300' src='/images/logo.png' />
         <h1 className={cn('text-5xl text-white mt-10', FontPoppin.className)}>
            <span className='text-blue-700'>Wheel</span>
            <span className='text-violet-700'>Wise</span> CRM is finally here!{' '}
            <br />
            let's get you started!
         </h1>
         <p className='text-zinc-500 pt-5'>
            Sign-in / Sign-up to access your dashboard
         </p>
         <div className='pt-5'>
            <LoginButton>
               <Button variant={'secondary'}>Click here</Button>
            </LoginButton>
         </div>
      </main>
   )
}
