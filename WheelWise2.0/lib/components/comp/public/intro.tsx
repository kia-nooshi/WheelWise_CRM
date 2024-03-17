import { Ui } from '@/lib'
import Image from 'next/image'

export default function Intro() {
  return (
    <Ui.Flex
      className='h-full gap-10 text-center'
      direction={'column'}
      justify={'center'}
      align={'center'}
    >
      <Image alt='logo' width='200' height='300' src='/images/logo.png' />
      <Ui.Style font={'Poppins'}>
        <h1 className='text-5xl'>
          <span className='text-blue-700'>Wheel</span>
          <span className='text-violet-700'>Wise</span> CRM is finally here!
        </h1>
        <h2 className='text-3xl'>Revolutionizing Car Sales with Advanced AI</h2>
      </Ui.Style>
      <p className='text-zinc-500'>
        Seamless Integration, Enhanced User Experience: Explore Next-Level Features with WheelWise
        CRM 2.0 <br /> Empowering Smarter, Faster, and More Efficient Car Sales
      </p>
    </Ui.Flex>
  )
}
