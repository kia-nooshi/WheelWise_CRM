import Debugging from '@/components/debugging/debugging'
import '@/lib/style/css/globals.css'
import { ClerkProvider, ThemeProvider } from '@/lib/provider/'
import type { Metadata } from 'next'
import { Toaster, toast } from 'sonner'

export const metadata: Metadata = {
   title: 'WheelWise AI',
   description: 'Generated by create next app',
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang='en'>
         <body>
            <ClerkProvider>
               <ThemeProvider>
                  {children}
                  <Toaster />
                  <Debugging />
               </ThemeProvider>
            </ClerkProvider>
         </body>
      </html>
   )
}