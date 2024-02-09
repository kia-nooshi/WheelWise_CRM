'use client'

import Footer from '@/components/parts/footer/footer'
import Nav from '@/components/parts/nav/nav'
import FlexCenter from '@/components/ui/flex-center'
import { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
   // TODO - If User Login -> Redirect to Dashboard always

   return (
      <FlexCenter className='w-full h-screen'>
         <Nav></Nav>
         PUBLIC
         {children}
         <Footer />
      </FlexCenter>
   )
}

export default layout
