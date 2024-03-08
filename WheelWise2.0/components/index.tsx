// --------------------------------
// Provider
// --------------------------------

import { ClerkProvider as Clerk } from '@clerk/nextjs'
import { Theme as Radix } from '@radix-ui/themes'

export const Provider = { Clerk, Radix }

// --------------------------------
// Auth
// --------------------------------
import { default as Signin } from '@/components/auth/signin'
import { default as Signup } from '@/components/auth/signup'
import { default as UserProfile } from '@/components/auth/userProfile'

export const Auth = { Signin, Signup, UserProfile }

// --------------------------------
// UI
// --------------------------------

import { default as Flex } from '@/components/ui/flex'
import { default as Scroll } from '@/components/ui/scroll'
import { default as Icon } from '@/components/ui/icon'
import { default as Font } from '@/components/ui/font'

export const Ui = { Flex, Scroll, Icon, Font }

// --------------------------------
// Do
// --------------------------------

import { twJoin, twMerge } from 'tailwind-merge'
const Util = { twJoin, twMerge }

import { default as Authen } from '@/components/function/auth'
import { default as Organ } from '@/components/function/organ'
import { default as user } from '@/components/function/user'
import { default as Lead } from '@/components/function/lead'

export const Do = { Auth: Authen, Organ, user, Lead, Util }

// --------------------------------
// IMPORT CMP
// --------------------------------

// Private
import { default as Nav } from '@/components/private/navigation'
import { default as Footer } from '@/components/private/footer'
import { default as Leads } from '@/components/private/lead'
// Public
import { default as Navigation_Pub } from '@/components/public/navigation'
import { default as Intro_Pub } from '@/components/public/intro'
import { default as Footer_Pub } from '@/components/public/footer'
// Shared
import { default as Logo } from '@/components/shared/logo'

export const C = {
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
   Shared: {
      Logo,
   },
}
