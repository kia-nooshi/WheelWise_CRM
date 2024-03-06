import { C } from '@/components'

export default function Navigation() {
   return (
      <C.UI.Flex
         className='w-full max-w-3xl m-3 p-2 rounded-lg'
         justify={'between'}
      >
         <C.Shared.Logo />
         <C.Auth.UserProfile />
      </C.UI.Flex>
   )
}
