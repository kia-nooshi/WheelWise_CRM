interface MessageDetails {
   organizationID: string
   leadID: string
   newMessage: string
}

interface ApiResponse {
   respond: string
   ThreadId: string
}

export async function GenerateAiResponse({
   organizationID,
   leadID,
   newMessage,
}: MessageDetails): Promise<ApiResponse> {
   const apiUrl = 'https://hook.us1.make.com/6pd9m39lt001ywmjcg5qyew0av1364ed'
   const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         organizationID,
         leadID,
         newMessage,
      }),
   })

   // Assuming the API returns JSON. Adjust according to actual response format.

   const data: ApiResponse = await response.json()
   return data
}
