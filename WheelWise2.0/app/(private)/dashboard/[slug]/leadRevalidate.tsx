'use server'

import { revalidatePath } from 'next/cache'

export async function leadRevalidate({ revalpath }: { revalpath: string }) {
  console.log('🔃 Fetching Data :', `'/dashboard/${revalpath}'`)
  return revalidatePath(`'/dashboard/${revalpath}'`)
}
