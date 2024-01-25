import React, { ReactNode } from 'react'
import Nav from './nav'

interface Props {
   children: ReactNode
}

function layout({ children }: Props) {
   return (
      <div>
         <div className='flex flex-col items-center justify-center relative h-screen'>
            <Nav></Nav>
            {children}
         </div>
      </div>
   )
}

export default layout
