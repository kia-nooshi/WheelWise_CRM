import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa'
import React from 'react'

const Test_Render = ({
   label,
   data,
   description,
   executionTime,
}: {
   label: string
   data: any
   description: string
   executionTime: string
}) => {
   return (
      <div className='border-b border-gray-800 p-5'>
         <div className='text-sm mb-2 flex items-center'>
            <span className='font-bold'>{label}</span>
            <span className='text-gray-500 ml-2'>- {description}</span>
            {data.success ? (
               <FaCheckCircle className='text-green-500 ml-2' />
            ) : (
               <FaTimesCircle className='text-red-500 ml-2' />
            )}
            <span className='text-gray-500 ml-2 flex flex-row justify-center gap-2 items-center'>
               {executionTime} <FaClock className='text-gray-500' />
            </span>
         </div>
         <div className='text-sm mb-2'>
            <span className='font-bold'>Test Success:</span> {data.success ? 'true' : 'false'}
         </div>
         <div className='text-sm mb-2'>
            <span className='font-bold'>Test Message:</span> {data.message}
         </div>
         <div className='text-sm mb-2'>
            <span className='font-bold'>Test Result:</span>
            <pre className='mt-1 p-2 bg-zinc-950 rounded'>{JSON.stringify(data.data, null, 2)}</pre>
         </div>
      </div>
   )
}

export default Test_Render