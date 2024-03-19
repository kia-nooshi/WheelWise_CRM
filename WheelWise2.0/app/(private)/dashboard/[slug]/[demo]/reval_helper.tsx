'use server'

import { revalidatePath } from 'next/cache'

export async function RevalHelper({ revalpath }: { revalpath: string }) {
  console.log('🔃 Fetching Data :', `'${revalpath}'`)
  return revalidatePath(`'${revalpath}'`)
}
