import React from 'react'

const LeadPage = ({ params }: { params: { slug: string } }) => {
   return <div>LeadPage : {params.slug}</div>
}

export default LeadPage
