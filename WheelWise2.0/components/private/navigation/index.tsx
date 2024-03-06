import { CMP } from '@/lib'

export const Navigation = () => {
   return (
      <CMP.Ui.Flex
         className='w-full max-w-3xl m-3 p-2 rounded-lg'
         justify={'between'}
      >
         <CMP.Shared.Logo />
         <CMP.Auth.UserProfile />
      </CMP.Ui.Flex>
   )
}
