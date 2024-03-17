'use server'

import { revalidatePath } from 'next/cache'

export async function leadRevalidate() {
   //console.log('ReFetching Data 🔃')
   return revalidatePath('/dashboard')
}
