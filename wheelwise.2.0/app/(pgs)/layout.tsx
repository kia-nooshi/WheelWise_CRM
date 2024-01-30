import React, { ReactNode } from 'react'
import Nav from '@/components/parts/nav/nav'
import Footer from '@/components/parts/footer/footer'
import FlexCenter from '@/components/ui/flex-center'

function layout({ children }: { children: ReactNode }) {
   return (
      <div>
         <FlexCenter className='w-full h-screen'>
            <Nav></Nav>
            <div className='h-full w-full overflow-hidden pt-32 pb-10 '>
               {children}
            </div>
            <Footer />
         </FlexCenter>
      </div>
   )
}

export default layout
