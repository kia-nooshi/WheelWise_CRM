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

type ReturnData<T> = {
   data: T | null
   success: boolean
   message: string
}

function ReturnData<T>(
   data: T | null,
   success: boolean,
   messageOrError: any,
   functionName: string // Include the function name in the parameter
): ReturnData<T> {
   let message: string

   if (messageOrError instanceof Error) {
      message = `${functionName} → ${messageOrError.message}`
   } else if (typeof messageOrError === 'string') {
      message = `${functionName} → ${messageOrError}`
   } else {
      message = `${functionName} → Unknown error`
   }

   return { data, success, message }
}

const Util = { twJoin, twMerge, ReturnData }

import { Lead, Organ, Clerk as CC } from '@/components/function/database'

export const Do = { Clerk: CC, Organ, Lead }

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
