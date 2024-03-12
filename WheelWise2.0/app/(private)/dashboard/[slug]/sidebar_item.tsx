import { Flex, Strong, Text } from '@radix-ui/themes'
import React, { ReactNode } from 'react'

export default function SubItem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Flex direction='row' gap='2'>
      <Text as='label' color='indigo'>
        <Strong>{title}:</Strong>
      </Text>
      <Text as='span'>{children}</Text>
    </Flex>
  )
}
