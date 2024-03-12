'use client'

import { useEffect } from 'react'
import { leadRevalidate } from './leadRevalidate'

const LeadRefresh = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      leadRevalidate()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return <></>
}

export default LeadRefresh
