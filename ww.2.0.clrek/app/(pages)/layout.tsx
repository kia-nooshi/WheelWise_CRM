import React, { ReactNode } from 'react'
import Nav from '@/components/pt/nav/nav'
import Footer from '@/components/pt/footer/footer'

interface Props {
   children: ReactNode
}

function layout({ children }: Props) {
   return (
      <div>
         <div className='flex flex-col items-center justify-center relative h-screen'>
            <Nav></Nav>
            <div className='h-full w-full'>{children}</div>
            <Footer />
         </div>
      </div>
   )
}

export default layout
