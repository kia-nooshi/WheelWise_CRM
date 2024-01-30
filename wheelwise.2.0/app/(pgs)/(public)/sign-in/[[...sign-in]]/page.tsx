import FlexCenter from '@/components/ui/flex-center'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
   return (
      <FlexCenter>
         <SignIn />
      </FlexCenter>
   )
}
