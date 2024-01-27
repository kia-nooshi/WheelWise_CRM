import React, { ReactNode } from 'react'

interface Props {
   children: ReactNode
}

function layout({ children }: Props) {
   return (
      <div>
         <div className='p-56 flex flex-col items-center justify-center relative h-screen w-full'>
            {children}
         </div>
      </div>
   )
}

export default layout
