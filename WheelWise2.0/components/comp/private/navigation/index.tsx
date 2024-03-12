import { Auth, Ui } from '@/components'

export default function Navigation() {
   return (
      <Ui.Flex
         className='w-full max-w-3xl m-3 p-2 rounded-lg'
         justify={'between'}
      >
         <Ui.Logo />
         <Auth.UserProfile />
      </Ui.Flex>
   )
}
