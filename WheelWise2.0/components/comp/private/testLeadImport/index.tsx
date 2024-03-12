import { Ui, Util } from '@/components'
import { Text } from '@radix-ui/themes'
import { SiVitest } from 'react-icons/si'
import CodeBlockWithCopyButton from './sss'

export default async function TestLeadImport() {
  const clerkId = await Util.Clerk.getClerkId()
  if (!clerkId.data) throw new Error('not loged in')
  const idd = await Util.DataBase.User.getUser({ clerkId: clerkId.data })

  const dataSamples = [
    {
      organId: `${idd.data?.organId}`,
      firstName: 'Liam',
      lastName: 'Smith',
      phone: '3031234567',
      email: 'liam.smith@example.com',
      message:
        'Inquiring about the availability and pricing for a Tesla Model Y. Interested in autopilot features.',
    },
    {
      organId: `${idd.data?.organId}`,
      firstName: 'Sophia',
      lastName: 'Miller',
      phone: '7209876543',
      email: 'sophia.miller@example.com',
      message:
        'Looking for the latest deals on the Audi Q5. Would appreciate information on financing options.',
    },
    {
      organId: `${idd.data?.organId}`,
      firstName: 'Ethan',
      lastName: 'Davis',
      phone: '4157654321',
      email: 'ethan.davis@example.com',
      message:
        'Interested in a Ford F-150 with eco-boost. Seeking details on towing capacity and fuel efficiency.',
    },
    {
      organId: `${idd.data?.organId}`,
      firstName: 'Olivia',
      lastName: 'Garcia',
      phone: '6191237890',
      email: 'olivia.garcia@example.com',
      message:
        'Exploring options for a Honda Civic with advanced safety features. Curious about lease specials.',
    },
    {
      organId: `${idd.data?.organId}`,
      firstName: 'Noah',
      lastName: 'Wilson',
      phone: '3034567890',
      email: 'noah.wilson@example.com',
      message:
        'Looking to test drive a Mercedes-Benz C-Class. Interested in performance packages and interior options.',
    },
  ]

  return (
    <Ui.Flex className='mt-5' direction={'column'} gap={'2'}>
      <Text as='div' size='2' className='flex flex-row gap-2 items-center'>
        <SiVitest className='text-orange-500' /> Test this CHAT
      </Text>
      <div className='grid grid-cols-2 gap-2'>
        {dataSamples.map((sample, index) => (
          <CodeBlockWithCopyButton key={index} codeSnippet={JSON.stringify(sample, null, 2)} />
        ))}
      </div>
    </Ui.Flex>
  )
}
