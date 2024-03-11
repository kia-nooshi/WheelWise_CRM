// --------------------
// Tailwind Merge
// --------------------

import { twJoin, twMerge } from 'tailwind-merge'

// --------------------
// Tailwind Merge
// --------------------

// export type ReturnData<T>
export type ReturnData<T> = {
   data: T | null
   success: boolean
   message: string
}

async function returnHandeler<T>(
   operation: () => Promise<T>,
   successMessage: string,
   errorMessage: string,
   functionName: string
): Promise<ReturnData<T>> {
   try {
      const data = await operation()
      if (!data) throw new Error(errorMessage)
      const message = `${functionName} → ${successMessage}`
      return { data, success: true, message }
   } catch (error) {
      const message = `${functionName} → ${error instanceof Error ? error.message : errorMessage}`
      return { data: null, success: false, message }
   }
}

const Other = { twJoin, twMerge, returnHandeler }
export default Other
