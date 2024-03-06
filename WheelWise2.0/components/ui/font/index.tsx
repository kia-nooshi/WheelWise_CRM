import { Inter, Poppins } from 'next/font/google'
import React from 'react'

const FontInter = Inter({ subsets: ['latin'], weight: ['300'] })
const FontPoppins = Poppins({ subsets: ['latin'], weight: ['600'] })

interface FontProps {
   name: 'Inter' | 'Poppins'
   children: React.ReactNode
}

export default function Font({ name, children }: FontProps) {
   switch (name) {
      case 'Inter':
         return <span className={FontInter.className}>{children}</span>

      case 'Poppins':
         return <span className={FontPoppins.className}>{children}</span>
   }
}
