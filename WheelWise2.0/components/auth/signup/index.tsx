import { Ui } from '@/components'
import { SignUp } from '@clerk/nextjs'

export default function Signup() {
   return (
      <Ui.Flex className='h-full ' direction={'column'} justify={'center'}>
         <SignUp />
      </Ui.Flex>
   )
}
