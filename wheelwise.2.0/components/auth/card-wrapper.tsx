import { Header } from '@/components/auth/header'
import { BackButton } from '@/components/auth/back-Button'
import { Social } from '@/components/auth/social'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ReactNode } from 'react'

//
// IMPORT END
// -------------------------------------------------------------

interface Props {
   children: ReactNode
   headerLable?: string
   backButtonLable: string
   backButtonHref: string
   showSocial?: boolean
}

export const CardWrapper = ({
   children,
   headerLable,
   backButtonHref,
   backButtonLable,
   showSocial,
}: Props) => {
   return (
      <>
         <Card className='w-[400px] shadow-md'>
            <CardHeader>
               <Header>{headerLable}</Header>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
               <CardFooter>
                  <Social></Social>
               </CardFooter>
            )}
            <CardFooter>
               <BackButton href={backButtonHref}>{backButtonLable}</BackButton>
            </CardFooter>
         </Card>
      </>
   )
}
