export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const { getGeminiApiKey } = await import("@/lib/ai")
    const apiKey = getGeminiApiKey()

    console.log("[v0] Generating CV with Gemini API...")

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
                  text: `You are a professional CV writer specializing in South African CVs. Based on the following description, generate a complete CV data structure.

User description: ${prompt}

Make the content professional, achievement-focused, and tailored for the South African job market. Use realistic South African details (cities like Johannesburg, Cape Town, Durban, Pretoria). Include local context where relevant. Generate 2-3 work experiences, 1-2 education entries, 5-8 skills, and 2-3 languages.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
            responseMimeType: "application/json",
            responseSchema: {
              type: "object",
              properties: {
                personalDetails: {
                  type: "object",
                  properties: {
                    fullName: { type: "string" },
                    email: { type: "string" },
                    phone: { type: "string" },
                    location: { type: "string" },
                    linkedin: { type: "string" },
                    website: { type: "string" },
                    summary: { type: "string" },
                  },
                  required: ["fullName", "email", "phone", "location", "summary"],
                },
                workExperience: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      jobTitle: { type: "string" },
                      company: { type: "string" },
                      location: { type: "string" },
                      startDate: { type: "string" },
                      endDate: { type: "string" },
                      current: { type: "boolean" },
                      description: { type: "string" },
                      achievements: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                    required: [
                      "jobTitle",
                      "company",
                      "location",
                      "startDate",
                      "endDate",
                      "current",
                      "description",
                      "achievements",
                    ],
                  },
                },
                education: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      degree: { type: "string" },
                      institution: { type: "string" },
                      location: { type: "string" },
                      startDate: { type: "string" },
                      endDate: { type: "string" },
                      grade: { type: "string" },
                      achievements: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                    required: ["degree", "institution", "location", "startDate", "endDate"],
                  },
                },
                skills: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      level: { type: "string" },
                      category: { type: "string" },
                    },
                    required: ["name", "level", "category"],
                  },
                },
                languages: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      proficiency: { type: "string" },
                    },
                    required: ["name", "proficiency"],
                  },
                },
              },
              required: ["personalDetails", "workExperience", "education", "skills", "languages"],
            },
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
    console.log("[v0] Gemini response received")

    const generatedText = data.candidates[0].content.parts[0].text

    console.log("[v0] Attempting to parse CV data...")

    let cvData
    try {
      cvData = JSON.parse(generatedText)
    } catch (parseError) {
      console.error("[v0] JSON parse error:", parseError)
      console.error("[v0] Response text:", generatedText)
      throw new Error("Failed to parse CV data. The AI response was not valid JSON.")
    }

    console.log("[v0] CV data parsed successfully")

    return Response.json({ cvData })
  } catch (error) {
    console.error("[v0] Error generating CV:", error)
    return Response.json({ error: "Failed to generate CV. Please try again." }, { status: 500 })
  }
}
