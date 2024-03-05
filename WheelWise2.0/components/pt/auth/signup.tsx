import { Flex } from '@/lib/components'
import { SignUp } from '@clerk/nextjs'

export function Signup() {
   return (
      <Flex className='h-full ' direction={'column'} justify={'center'}>
         <SignUp />
      </Flex>
   )
}
