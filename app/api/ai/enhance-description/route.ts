export async function POST(request: Request) {
  try {
    const { jobTitle, company, description } = await request.json()

    const { getGeminiApiKey } = await import("@/lib/ai")
    const apiKey = getGeminiApiKey()

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a professional CV writer. Enhance the following job description to make it more impactful and professional for a South African CV.

Job Title: ${jobTitle}
Company: ${company}
Current Description: ${description || "No description provided"}

Write an enhanced job description that is:
- 1-2 sentences long
- Action-oriented and achievement-focused
- Uses strong action verbs
- Professional and concise
- Suitable for the South African job market

Enhanced Description:`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 100,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Gemini API error:", errorText)
      return Response.json({ error: `Gemini API error: ${errorText || response.statusText}` }, { status: response.status })
    }

    const data = await response.json()
    const enhancedDescription = data.candidates[0].content.parts[0].text.trim()

    return Response.json({ description: enhancedDescription })
  } catch (error) {
    console.error("[v0] Error enhancing description:", error)
    return Response.json({ error: "Failed to enhance description" }, { status: 500 })
  }
}
