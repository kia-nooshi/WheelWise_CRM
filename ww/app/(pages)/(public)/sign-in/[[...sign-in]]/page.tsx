import { FlexColC } from '@/components/ui'
import { SignIn } from '@clerk/nextjs'

export default function signInPage() {
   return (
      <FlexColC>
         <SignIn />
      </FlexColC>
   )
}
