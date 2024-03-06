import { CMP } from '@/lib'
import { SignUp } from '@clerk/nextjs'

export function Signup() {
   return (
      <CMP.Ui.Flex className='h-full ' direction={'column'} justify={'center'}>
         <SignUp />
      </CMP.Ui.Flex>
   )
}
