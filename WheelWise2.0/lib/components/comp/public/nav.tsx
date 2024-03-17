import { Ui } from '@/lib'
import { Controler } from './nav_control'

export default function Navigation() {
  return (
    <nav className='fixed w-full max-w-3xl top-10 z-50'>
      <Ui.Flex>
        <Ui.Flex align={'center'} justify={'center'} gap={'medium'}>
          <Ui.Logo />
          <Ui.Icon name='Arrow_Right' />
          <Controler />
        </Ui.Flex>
        <div></div>
      </Ui.Flex>
    </nav>
  )
}
