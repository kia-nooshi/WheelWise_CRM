import React, { ReactNode } from 'react'

interface Props {
   children: ReactNode
}

function layout({ children }: Props) {
   return (
      <div>
         <div className='flex flex-col items-center justify-center relative h-screen'>
            {children}
         </div>
      </div>
   )
}

export default layout