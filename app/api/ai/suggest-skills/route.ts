export async function POST(request: Request) {
  try {
    const { jobTitle, industry } = await request.json()

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
                  text: `You are a career advisor for the South African job market. Suggest 8-10 relevant professional skills for someone with the following profile:

Job Title/Role: ${jobTitle || "Professional"}
Industry: ${industry || "General"}

Suggest skills that are:
- Relevant to the role and industry
- Mix of technical and soft skills
- In-demand in the South African job market
- Specific and professional (avoid generic terms like "hard-working")

Provide just the skill names, one per line, no descriptions or numbers:`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150,
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

    const skills = text
      .trim()
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => line.replace(/^[-•*0-9.]\s*/, "").trim())
      .slice(0, 10)

    return Response.json({ skills })
  } catch (error) {
    console.error("[v0] Error suggesting skills:", error)
    return Response.json({ error: "Failed to suggest skills" }, { status: 500 })
  }
}
