import { Ui } from '@/components'
import { SignIn } from '@clerk/nextjs'

export default function Signin() {
   return (
      <Ui.Flex className='h-full ' direction={'column'} justify={'center'}>
         <SignIn />
      </Ui.Flex>
   )
}
