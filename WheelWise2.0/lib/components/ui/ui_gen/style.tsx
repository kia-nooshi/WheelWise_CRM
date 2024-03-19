import { Do } from '@/lib'
import { cva, type VariantProps } from 'class-variance-authority'
import { Inter, Poppins } from 'next/font/google'
import * as React from 'react'

const FontInter = Inter({ subsets: ['latin'], weight: ['300'] })
const FontPoppins = Poppins({ subsets: ['latin'], weight: ['600'] })

const fontVariants = cva('', {
  variants: {
    font: {
      Inter: FontInter.className,
      Poppins: FontPoppins.className,
    },
  },
})

interface FontProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof fontVariants> {
  asDiv?: boolean
}

const Style = ({ font, children, className, asDiv = false, ...props }: FontProps) => {
  const Comp = asDiv ? 'div' : 'span'

  return (
    <Comp className={Do.Util.cn(fontVariants({ font, className }))} {...props}>
      {children}
    </Comp>
  )
}

export default Style
