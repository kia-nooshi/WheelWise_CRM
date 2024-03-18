import React from 'react'

export default async function timer(func: any) {
  const start = performance.now()
  const result = await func()
  const end = performance.now()
  const executionTime = (end - start).toFixed(2) + ' ms'
  return { result, executionTime }
}
