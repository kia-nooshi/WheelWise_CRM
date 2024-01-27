import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuPortal,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export const NavControlHome = () => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant='outline'>Get Started Here</Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <Link href='./sign-in'>Login to account</Link>
                  <DropdownMenuShortcut>⌘ L</DropdownMenuShortcut>
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <Link href='./sign-up'>Register an account</Link>
                  <DropdownMenuShortcut>⌘ R</DropdownMenuShortcut>
               </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                     Need Support ?
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                     <DropdownMenuSubContent>
                        <DropdownMenuItem disabled>Contact Us</DropdownMenuItem>
                        <DropdownMenuItem disabled>
                           Help Center
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled>
                           Chat With Us
                        </DropdownMenuItem>
                     </DropdownMenuSubContent>
                  </DropdownMenuPortal>
               </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuItem disabled>Pricing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
               <Link href='https://github.com/UCR-Senior-Design/WheelWise_CRM/'>
                  GitHub
               </Link>
               <DropdownMenuShortcut>⌘ G</DropdownMenuShortcut>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
