'use client'

import { Button, DropdownMenu } from '@radix-ui/themes'
import Link from 'next/link'

export const Controler = () => {
   return (
      <DropdownMenu.Root>
         <DropdownMenu.Trigger>
            <Button variant='soft'>Get Started Here!</Button>
         </DropdownMenu.Trigger>
         <DropdownMenu.Content>
            <DropdownMenu.Item shortcut='⌘ E'>
               <Link href='/sign-in'>Login to account</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item shortcut='⌘ D'>
               <Link href='/sign-up'>Register an account</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
               shortcut='⌘ N'
               disabled
            >
               Archive
            </DropdownMenu.Item>

            <DropdownMenu.Item color='red'>
               <Link href='https://github.com/UCR-Senior-Design/WheelWise_CRM'>Our Github</Link>
            </DropdownMenu.Item>
         </DropdownMenu.Content>
      </DropdownMenu.Root>
   )
}
