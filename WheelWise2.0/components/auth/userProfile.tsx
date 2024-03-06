import { SignedIn, UserButton } from '@clerk/nextjs'

export const UserProfile = () => {
   return (
      <SignedIn>
         <UserButton afterSignOutUrl='/' />
      </SignedIn>
   )
}
