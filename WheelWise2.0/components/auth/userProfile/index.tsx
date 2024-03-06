import { SignedIn, UserButton } from '@clerk/nextjs'

export default function UserProfile() {
   return (
      <SignedIn>
         <UserButton afterSignOutUrl='/' />
      </SignedIn>
   )
}
