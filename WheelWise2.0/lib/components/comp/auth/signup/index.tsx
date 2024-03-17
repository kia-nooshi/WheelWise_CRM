import { Ui } from '@/lib'
import { SignUp } from '@clerk/nextjs'

export default function Signup() {
  return (
    <Ui.Flex className='w-full h-full'>
      <SignUp />
    </Ui.Flex>
  )
}
