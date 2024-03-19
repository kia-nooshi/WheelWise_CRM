'use client'

import { useEffect } from 'react'
import { leadRevalidate } from './leadRevalidate'

const LeadRefresh = ({ revalpath }: { revalpath: string }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      leadRevalidate({ revalpath })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return <></>
}

export default LeadRefresh
