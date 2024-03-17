import { Ui } from '@/lib'
import Link from 'next/link'

export function Controler() {
  return (
    <Ui.Dropd.Menu>
      <Ui.Dropd.Trigger asChild>
        <Ui.Button variant={'outline'}>Get Started Here</Ui.Button>
      </Ui.Dropd.Trigger>
      <Ui.Dropd.Content className='w-56'>
        <Ui.Dropd.Label>My Account</Ui.Dropd.Label>
        <Ui.Dropd.Separator />
        <Ui.Dropd.Group>
          <Link href={'./signin'}>
            <Ui.Dropd.Item>Sign In</Ui.Dropd.Item>
          </Link>
          <Link href={'./signup'}>
            <Ui.Dropd.Item>Sign Up</Ui.Dropd.Item>
          </Link>
        </Ui.Dropd.Group>
        <Ui.Dropd.Separator />
        <Ui.Dropd.Group>
          <Link href={'./test'}>
            <Ui.Dropd.Item>Run Test</Ui.Dropd.Item>
          </Link>
        </Ui.Dropd.Group>
        <Ui.Dropd.Separator />
        <Ui.Dropd.Item disabled>API</Ui.Dropd.Item>
        <Ui.Dropd.Separator />
        <Link href={'https://github.com/UCR-Senior-Design/WheelWise_CRM'} className='w-full'>
          <Ui.Dropd.Item className='bg-red-600 text-zinc-100'>Github</Ui.Dropd.Item>
        </Link>
      </Ui.Dropd.Content>
    </Ui.Dropd.Menu>
  )
}
