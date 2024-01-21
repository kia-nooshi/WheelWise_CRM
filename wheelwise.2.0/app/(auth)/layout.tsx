import React, { ReactNode } from 'react'

function AuthLayout({ children }: { children: ReactNode }) {
   return (
      <main
         className=' flex h-full flex-col items-center 
justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 to-zinc-950'
      >
         {children}
      </main>
   )
}

export default AuthLayout
