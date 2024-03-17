import { Ui } from '@/lib'
import { Controler } from './nav_control'

export default function Navigation() {
  return (
    <nav className='w-full max-w-3xl py-10'>
      <Ui.Flex align={'center'} justify={'center'} gap={'medium'}>
        <Ui.Logo />
        <Ui.Icon name='Arrow_Right' />
        <Controler />
      </Ui.Flex>
      <div></div>
    </nav>
  )
}
