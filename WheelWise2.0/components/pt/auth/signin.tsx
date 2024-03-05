import { Flex } from '@/lib/components'
import { SignIn } from '@clerk/nextjs'

export function Signin() {
   return (
      <Flex className='h-full ' direction={'column'} justify={'center'}>
         <SignIn />
      </Flex>
   )
}
