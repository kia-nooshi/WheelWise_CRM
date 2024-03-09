import { Do } from '@/components'
import prisma from '@/prisma/client'

// Interfaces
interface CommonProps {
   id: string
}

interface pushOrganProps extends Pick<CommonProps, 'id'> {}
interface popOrganProps extends Pick<CommonProps, 'id'> {}

interface ReturnData<T> {
   data: T | null
   success: boolean
   message: string
}

async function pushOrgan(): Promise<ReturnData<pushOrganProps>> {
   try {
      const data = await prisma.organ.create({ data: {} })

      if (!data) throw new Error('Failed to push organ')

      return Do.Util.ReturnData(data, true, 'Organ successfully pushed', '🆗 pushOrgan')
   } catch (e) {
      return Do.Util.ReturnData(null, false, e, '⛔ pushOrgan')
   }
}

async function popOrgan({ id }: popOrganProps): Promise<ReturnData<popOrganProps>> {
   try {
      const organ = await prisma.organ.delete({
         where: { id: id },
      })

      if (!organ) throw new Error('Failed to pop organ')

      return Do.Util.ReturnData(organ, true, 'Organ successfully popped', '🆗 popOrgan')
   } catch (e) {
      return Do.Util.ReturnData(null, false, e, '⛔ popOrgan')
   }
}

const Organ = { pushOrgan, popOrgan }
export default Organ
