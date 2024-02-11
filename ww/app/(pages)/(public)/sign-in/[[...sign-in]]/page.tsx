import { FlexColC } from '@/components/ui'
import { SignIn } from '@clerk/nextjs'

const signInPage = () => {
   return (
      <FlexColC>
         <SignIn />
      </FlexColC>
   )
}

export default signInPage
