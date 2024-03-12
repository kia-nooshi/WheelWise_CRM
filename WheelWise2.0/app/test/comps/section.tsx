import React from 'react'

export default function Test_Section({
   children,
   title,
}: {
   children: React.ReactNode
   title: string
}) {
   return (
      <div className='m-10 p-5 bg-gray-900'>
         <h2 className='text-gray-600 text-xl underline'>{title}</h2>
         {children}
      </div>
   )
}