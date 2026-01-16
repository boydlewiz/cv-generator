export async function POST(request: Request) {
  try {
    const { workExperience, education, skills } = await request.json()

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
                  text: `You are a professional CV writer for the South African job market. Based on the following information, write a compelling professional summary (2-3 sentences) that highlights the candidate's key strengths and career objectives.

Work Experience:
${workExperience
  .map(
    (exp: any) => `- ${exp.jobTitle} at ${exp.company} (${exp.startDate} - ${exp.current ? "Present" : exp.endDate})`,
  )
  .join("\n")}

Education:
${education.map((edu: any) => `- ${edu.degree} from ${edu.institution}`).join("\n")}

Skills:
${skills.map((skill: any) => skill.name).join(", ")}

Write a professional summary that is:
- 2-3 sentences long
- Highlights key strengths and experience
- Mentions career level (junior, mid-level, senior, etc.)
- Tailored for South African employers
- Professional and confident tone

Professional Summary:`,
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
    const summary = data.candidates[0].content.parts[0].text.trim()

    return Response.json({ summary })
  } catch (error) {
    console.error("[v0] Error generating summary:", error)
    return Response.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}
