import Footer from '@/components/parts/footer/footer'
import FlexCenter from '@/components/ui/flex-center'
import { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {
   return (
      <FlexCenter className='w-full h-screen'>
         Private
         <FlexCenter>{children}</FlexCenter>
         <Footer />
      </FlexCenter>
   )
}

export default layout
