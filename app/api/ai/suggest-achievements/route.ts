export async function POST(request: Request) {
  try {
    const { jobTitle, company, description } = await request.json()

    const { getGeminiApiKey } = await import("@/lib/ai")
    const apiKey = getGeminiApiKey()

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
                  text: `You are a professional CV writer. Generate 3-4 achievement bullet points for the following role that would be impressive on a South African CV.

Job Title: ${jobTitle}
Company: ${company}
Description: ${description || "No description provided"}

Generate achievement bullet points that:
- Start with strong action verbs
- Include quantifiable metrics where possible (percentages, numbers, etc.)
- Demonstrate impact and results
- Are specific and credible
- Follow this format: "Action verb + what you did + impact/result"

Example formats:
- "Increased sales by 25% through implementation of new CRM system"
- "Led a team of 5 developers to deliver 10+ projects on time"
- "Reduced operational costs by R500,000 annually through process optimization"

Generate 3-4 achievement bullet points (just the bullets, no numbering):`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 200,
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
    const text = data.candidates[0].content.parts[0].text

    const achievements = text
      .trim()
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => line.replace(/^[-•*]\s*/, "").trim())
      .slice(0, 4)

    return Response.json({ achievements })
  } catch (error) {
    console.error("[v0] Error suggesting achievements:", error)
    return Response.json({ error: "Failed to suggest achievements" }, { status: 500 })
  }
}
