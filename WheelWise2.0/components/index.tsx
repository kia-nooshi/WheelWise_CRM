// ----------
// ----------
// Provider
// ----------
// ----------

import { ClerkProvider } from '@clerk/nextjs'
import { Theme as Radix } from '@radix-ui/themes'

export const Provider = { Clerk: ClerkProvider, Radix }

// ----------
// ----------
// Functions
// ----------
// ----------

// #1 - Util
export { Util, Do } from '@/components/do'
// #2 - Do

// ----------
// ----------
// Components
// ----------
// ----------

// #1 - Ui

import { default as Flex } from '@/components/ui/flex'
import { default as Scroll } from '@/components/ui/scroll'
import { default as Icon } from '@/components/ui/icon'
import { default as Font } from '@/components/ui/font'
import { default as Logo } from '@/components/ui/logo'
import { default as Loading } from '@/components/ui/loading'
import { default as Copy } from '@/components/ui/copy'

export const Ui = { Flex, Scroll, Icon, Font, Logo, Loading, Copy }

// #2 - Comp

// #2.1 Auth
import { default as Signin } from '@/components/comp/auth/signin'
import { default as Signup } from '@/components/comp/auth/signup'
import { default as UserProfile } from '@/components/comp/auth/userProfile'

// #2.2 Private
import { default as Nav } from '@/components/comp/private/navigation'
import { default as Footer } from '@/components/comp/private/footer'
import { default as Leads } from '@/components/comp/private/lead/table'

// #2.3 Public
import { default as Navigation_Pub } from '@/components/comp/public/navigation'
import { default as Intro_Pub } from '@/components/comp/public/intro'
import { default as Footer_Pub } from '@/components/comp/public/footer'

export const Comp = {
  Auth: {
    Signin,
    Signup,
    UserProfile,
  },
  Public: {
    Nav: Navigation_Pub,
    Intro: Intro_Pub,
    Footer: Footer_Pub,
  },
  Private: {
    Nav,
    Footer,
    Leads,
  },
}
