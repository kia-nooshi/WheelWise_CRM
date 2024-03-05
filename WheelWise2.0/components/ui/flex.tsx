import { Flex as FlexRadix } from '@radix-ui/themes'
import React from 'react'

interface FlexProps extends React.ComponentProps<typeof FlexRadix> {
   children: React.ReactNode
}

export function Flex({ children, ...props }: FlexProps) {
   return <FlexRadix {...props}>{children}</FlexRadix>
}
