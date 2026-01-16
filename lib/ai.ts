export function getGeminiApiKey() {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY
  if (!key) {
    console.error("[ai] Missing API key. Set GOOGLE_GENERATIVE_AI_API_KEY (preferred) or GEMINI_API_KEY in .env.local")
    throw new Error("AI API key not configured on the server")
  }
  return key
}
