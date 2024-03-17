import { LeadBadge as LB } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

type P = {
   leadType: LB
}

export const LeadBadge = ({ leadType }: P) => {
   if (leadType === 'OPEN') {
      return <Badge color='green'>New Lead</Badge>
   }
}
