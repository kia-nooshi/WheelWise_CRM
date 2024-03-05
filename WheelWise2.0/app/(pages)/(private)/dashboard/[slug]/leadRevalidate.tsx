'use server'

import { revalidatePath } from 'next/cache'

export async function leadRevalidate() {
   console.log('🔃 Fetching Data')
   return revalidatePath('/dashboard/[slug]')
}
