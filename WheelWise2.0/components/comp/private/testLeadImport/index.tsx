import React from 'react'

export default function TestLeadImport() {
  const codeSnippets = [
    {
      organId: '65efab9413dc990eb182bf08',
      firstName: 'Danin',
      lastName: 'Namiri',
      phone: '9493573929',
      email: 'danin@gmail.com',
    },
    {
      organId: '65f0090e13dc990eb182c083',
      firstName: 'Jessica',
      lastName: 'Gonzalez',
      phone: '2125550198',
      email: 'jessica.gonzalez@example.com',
      message: 'Interested in leasing a BMW 3 Series.',
    },
    {
      organId: '65f0090e13dc990eb182c083',
      firstName: 'Michael',
      lastName: 'Johnson',
      phone: '7183336721',
      email: 'michael.johnson@example.com',
      message: 'Looking for financing options for a BMW M4.',
    },
    {
      organId: '65f0090e13dc990eb182c083',
      firstName: 'Emily',
      lastName: 'Anderson',
      phone: '6467778345',
      email: 'emily.anderson@example.com',
      message: 'Interested in learning about BMW X7 safety features.',
    },
  ]

  return (
    <div>
      <h2>Code Snippets</h2>
      {codeSnippets.map((snippet, index) => (
        <pre key={index}>
          <code>{JSON.stringify(snippet, null, 2)}</code>
        </pre>
      ))}
    </div>
  )
}
