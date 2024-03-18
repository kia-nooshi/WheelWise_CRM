import { Comp, Ui } from '@/lib'

export default function Navigation() {
  return (
    <nav className='w-full max-w-3xl py-10'>
      <Ui.Flex align={'center'} justify={'between'} gap={'medium'}>
        <Ui.Logo />
        <div>
          <Comp.Auth.UserProfile />
        </div>
      </Ui.Flex>
    </nav>
  )
}
