import { Do } from '@/components'
import prisma from '@/prisma/client'

type ReturnData<T> = {
   data: T | null
   success: boolean
   message: string
}

interface CommonLeadProps {
   id: string
   firstName: string
   lastName: string
   phone: string | null
   email: string | null
}

interface PushLeadProps extends CommonLeadProps {}
interface PopLeadProps extends Pick<CommonLeadProps, 'id'> {}
interface GetLeadProps extends Pick<CommonLeadProps, 'id'> {}
interface GetLeadsProps extends Pick<CommonLeadProps, 'id'> {}
// -------------------------------
// -------------------------------
// START HERE
// -------------------------------
// -------------------------------

async function pushLead({
   id,
   firstName,
   lastName,
   phone,
   email,
}: PushLeadProps): Promise<ReturnData<PushLeadProps>> {
   try {
      const newData: any = {
         organ: { connect: { id } },
         firstName,
         lastName,
         chat: {
            create: {},
         },
      }

      if (phone) newData.phone = phone
      if (email) newData.email = email

      const data = await prisma.lead.create({
         data: newData,
         include: { chat: true },
      })

      if (!data) throw new Error('Failed to push lead')

      return Do.Util.ReturnData(data, true, 'Lead successfully pushed', '🆗 pushLead')
   } catch (e) {
      return Do.Util.ReturnData(null, false, e, '⛔ pushLead')
   }
}

async function popLead({ id }: PopLeadProps): Promise<ReturnData<PopLeadProps>> {
   try {
      const data = await prisma.lead.delete({ where: { id } })

      if (!data) throw new Error('Failed to pop lead')

      return Do.Util.ReturnData(data, true, 'Lead successfully popped', '🆗 popLead')
   } catch (e) {
      return Do.Util.ReturnData(null, false, e, '⛔ popLead')
   }
}

async function getLead({ id }: GetLeadProps): Promise<ReturnData<CommonLeadProps>> {
   try {
      const data = await prisma.lead.findUnique({ where: { id } })

      if (!data) throw new Error('Lead not found')

      return Do.Util.ReturnData(data, true, 'Lead found', '🆗 getLead')
   } catch (e) {
      return Do.Util.ReturnData(null, false, e, '⛔ getLead')
   }
}

async function getLeads({ id }: GetLeadsProps): Promise<ReturnData<GetLeadsProps[]>> {
   try {
      const leads = await prisma.lead.findMany({ where: { organId: id } })

      return Do.Util.ReturnData(leads, true, 'Leads retrieved successfully', '🆗 getLeads')
   } catch (e) {
      return Do.Util.ReturnData(null, false, e, '⛔ getLeads')
   }
}

/*


*/

const Lead = { pushLead }
export default Lead
