'use client'

import { useEffect } from 'react'
import { RevalHelper } from './reval_helper'

const Reval = ({ revalpath, sec }: { revalpath: string; sec: number }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      RevalHelper({ revalpath })
    }, sec * 1000)

    return () => clearInterval(interval)
  }, [])

  return <></>
}

export default Reval
