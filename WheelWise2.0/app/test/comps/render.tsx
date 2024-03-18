import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa'
import { MdQuestionMark } from 'react-icons/md'
import { TbMathFunction } from 'react-icons/tb'
import { LuMessageSquare } from 'react-icons/lu'
import { VscJson } from 'react-icons/vsc'

import { GrTest } from 'react-icons/gr'

const Test_Render = ({
  data,
  description,
  executionTime,
}: {
  data: any
  description: string
  executionTime: string
}) => {
  return (
    <div className='border-b border-gray-800 px-5 py-10'>
      <div className='text-sm mb-2 flex items-center gap-2 justify-start text-gray-500'>
        <GrTest className='text-green-500' />
        <span className='font-bold text-white'>Test:</span>
        <span>- {description}</span>
      </div>

      <div className='text-sm mb-2 flex items-center gap-2 justify-start text-gray-500'>
        <TbMathFunction />
        <span className='font-bold text-white'>Test Function:</span>
        <span>{data.message.split('→')[0].trim()}</span>
        {data.success ? (
          <FaCheckCircle className='text-green-500' />
        ) : (
          <FaTimesCircle className='text-red-500' />
        )}
        <span>{executionTime}</span>
        <FaClock />
      </div>

      <div className='text-sm mb-2 flex items-center gap-2 justify-start text-gray-500'>
        <MdQuestionMark />
        <span className='font-bold text-white'>Test Success:</span>{' '}
        {data.success ? 'true' : 'false'}
      </div>

      <div className='text-sm mb-2 flex items-center gap-2 justify-start text-gray-500'>
        <LuMessageSquare />
        <span className='font-bold text-white'>Test Message:</span> {data.message}
      </div>

      <div className='text-sm mb-2 flex items-center gap-2 justify-start text-gray-500'>
        <VscJson />
        <span className='font-bold text-white'>Test Result:</span>
      </div>

      <pre className='mt-1 p-2 bg-zinc-950 rounded opacity-50'>
        {JSON.stringify(data.data, null, 2)}
      </pre>
    </div>
  )
}

export default Test_Render
