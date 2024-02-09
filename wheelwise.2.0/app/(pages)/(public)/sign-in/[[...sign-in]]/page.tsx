import FlexCenter from '@/components/ui/flex-center'
import { SignIn } from '@clerk/nextjs'

const signInPage = () => {
   return (
      <FlexCenter>
         <SignIn />
      </FlexCenter>
   )
}

export default signInPage
