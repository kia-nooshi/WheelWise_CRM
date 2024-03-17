import { RiLoader4Line } from 'react-icons/ri'
import React from 'react'
import { Ui } from '@/lib'

const loading = ({ title }: { title: string }) => {
  return (
    <Ui.Flex className='w-full h-screen flex flex-row gap-2' justify={'center'} align={'center'}>
      <RiLoader4Line className='animate-spin h-5 w-5 mr-3 ...' />
      {title}
    </Ui.Flex>
  )
}

export default loading
