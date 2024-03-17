import { Comp, Ui } from '@/lib'

export default function Navigation() {
  return (
    <Ui.Flex className='w-full max-w-3xl m-3 p-2 rounded-lg' justify={'between'}>
      <Ui.Logo />
      <Comp.Auth.UserProfile />
    </Ui.Flex>
  )
}
