import { Ui } from '@/lib'
import { SignIn } from '@clerk/nextjs'

export default function Signin() {
  return (
    <Ui.Flex className='w-full h-full' align={'center'} justify={'center'}>
      <SignIn />
    </Ui.Flex>
  )
}
