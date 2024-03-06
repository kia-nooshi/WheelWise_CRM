import { ScrollArea } from '@radix-ui/themes'
import React from 'react'

interface ScrollArea extends React.ComponentProps<typeof ScrollArea> {
   children: React.ReactNode
}

export default function Scroll({ children, ...props }: ScrollArea) {
   return <ScrollArea {...props}>{children}</ScrollArea>
}
