import { OpenAI } from "openai"

// Create a single OpenAI client for the entire server-side application
export const createOpenAIClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

export async function generateRecommendations(responses: Record<string, string>) {
  const openai = createOpenAIClient()

  const prompt = `
    Based on the following business owner's responses, identify 1-3 key areas where AI could help their business and provide a brief summary of recommendations.
    
    Business type: ${responses.question_1}
    Time-consuming task: ${responses.question_2}
    Content creation/email marketing: ${responses.question_3}
    Client acquisition method: ${responses.question_4}
    Automation interest: ${responses.question_5}
    Desired AI solution: ${responses.question_6}
    
    Format your response as JSON with the following structure:
    {
      "summary": "A brief 2-3 sentence summary of how AI can help this business",
      "areas": [
        {
          "title": "Area 1 Title",
          "description": "Detailed explanation of how AI can help in this area"
        },
        {
          "title": "Area 2 Title",
          "description": "Detailed explanation of how AI can help in this area"
        },
        {
          "title": "Area 3 Title",
          "description": "Detailed explanation of how AI can help in this area"
        }
      ]
    }
    
    Note: Include only 1-3 areas based on the most relevant opportunities. Each area should be specific and actionable.
  `

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an AI consultant specializing in business process optimization and AI implementation strategies.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    })

    const responseText = completion.choices[0].message.content
    if (!responseText) {
      throw new Error("Failed to generate recommendations")
    }

    return JSON.parse(responseText)
  } catch (error) {
    console.error("Error generating recommendations:", error)
    throw error
  }
}
