import { CMP } from '@/lib'
import { SignIn } from '@clerk/nextjs'

export function Signin() {
   return (
      <CMP.Ui.Flex className='h-full ' direction={'column'} justify={'center'}>
         <SignIn />
      </CMP.Ui.Flex>
   )
}
