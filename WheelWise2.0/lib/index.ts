// --------------------------------
// IMPORT CMP
// --------------------------------

//Ui
import { Flex } from '@/components/ui/flex'
import { Scroll } from '@/components/ui/scroll'
//Shared
import { Logo } from '@/components/shared/logo'
// Public
import { Footer } from '@/components/public/footer'
import { Intro } from '@/components/public/intro'
import { Navigation } from '@/components/public/navigation'
//Auth
import { Signin } from '@/components/auth/signin'
import { Signup } from '@/components/auth/signup'

export const CMP = {
   get Ui() {
      return {
         get Flex() {
            return Flex
         },
         get Scroll() {
            return Scroll
         },
      }
   },
   get Shared() {
      return {
         get Logo() {
            return Logo
         },
      }
   },
   get Public() {
      return {
         get Nav() {
            return Navigation
         },
         get Footer() {
            return Footer
         },
         get Intro() {
            return Intro
         },
      }
   },
   get Auth() {
      return {
         get Signin() {
            return Signin
         },
         get Signup() {
            return Signup
         },
      }
   },
}

// --------------------------------
// IMPORT Fonts
// --------------------------------
import { Inter, Poppins } from 'next/font/google'

const FontInter = Inter({ subsets: ['latin'], weight: ['300'] })
const FontPoppins = Poppins({ subsets: ['latin'], weight: ['600'] })

export const Font = {
   get Inter() {
      return FontInter
   },
   get Poppins() {
      return FontPoppins
   },
}

// --------------------------------
// IMPORT Icons
// --------------------------------
import { FaArrowRight } from 'react-icons/fa6'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { LuPencil } from 'react-icons/lu'
import { TbDotsVertical } from 'react-icons/tb'

export const Icon = {
   get ArrowRight() {
      return FaArrowRight
   },
   get Clock() {
      return IoMdTime
   },
   get Trash() {
      return FaRegTrashAlt
   },
   get Pen() {
      return LuPencil
   },
   get DotsVertical() {
      return TbDotsVertical
   },
}

// --------------------------------
// Import Provider
// --------------------------------
import { ClerkProvider } from '@clerk/nextjs'
import { Theme } from '@radix-ui/themes'

export const Provider = {
   get Clerk() {
      return ClerkProvider
   },
   get Radix() {
      return Theme
   },
}
