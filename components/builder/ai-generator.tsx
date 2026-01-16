"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, RefreshCw } from "lucide-react"
import { useCV } from "@/lib/cv-context"

const southAfricanExamples = [
  {
    title: "Retail Store Manager",
    text: "I'm a retail store manager with 8 years of experience managing Woolworths and Pick n Pay stores in Gauteng. I've led teams of up to 25 staff members and consistently exceeded sales targets by implementing customer service training programs.",
  },
  {
    title: "Accountant",
    text: "I'm a qualified CA(SA) with 6 years of experience in audit and tax compliance for SMEs. I've worked at KPMG and now want to move into industry. My strengths include financial reporting, VAT returns, and SARS compliance.",
  },
  {
    title: "Software Developer",
    text: "I'm a full-stack developer with 4 years building web applications for South African fintechs. I'm skilled in React, Node.js, and PostgreSQL, and have experience integrating payment gateways like PayFast and Ozow.",
  },
  {
    title: "Teaching Professional",
    text: "I'm a qualified teacher with 10 years of experience teaching Grade 10-12 Mathematics and Physical Sciences at public schools in KwaZulu-Natal. I have a strong record of improving matric pass rates and mentoring struggling learners.",
  },
  {
    title: "HR Manager",
    text: "I'm an HR Manager with 7 years managing recruitment, employee relations, and compliance with SA labour law including BBBEE, Employment Equity, and Skills Development. I've worked for corporates in mining and financial services.",
  },
  {
    title: "Logistics Coordinator",
    text: "I'm a logistics coordinator with 5 years managing distribution for Shoprite and Massmart across Johannesburg. I specialize in fleet management, warehouse operations, and optimizing delivery routes to reduce costs.",
  },
]

const getRandomExamples = () => {
  const shuffled = [...southAfricanExamples].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 4)
}

export function AIGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [examples, setExamples] = useState(southAfricanExamples.slice(0, 4))
  useEffect(() => {
    setExamples(getRandomExamples())
  }, [])
  const { updateCVData } = useCV()

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/ai/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (data.error) {
        console.error("[v0] API returned error:", data.error)
        alert("Failed to generate CV. Please try again.")
        return
      }

      if (data.cvData) {
        updateCVData(data.cvData)
      }
    } catch (error) {
      console.error("[v0] Error generating CV:", error)
      alert("Failed to generate CV. Please check your connection and try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI Resume Generator
        </h2>
        <p className="text-gray-400">Powered by Google Gemini AI. Tailored for the South African job market.</p>
      </div>

      <div className="space-y-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Tell us about yourself... Include your job title, years of experience, key skills, companies you've worked for in South Africa, education, and career achievements. The more detail you provide, the better your CV will be!"
          className="min-h-[200px] bg-card border-primary/30 text-white placeholder:text-gray-500 resize-none focus:border-primary"
        />

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Tip: Mention specific technologies, achievements, and quantifiable results</span>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-primary hover:bg-primary/90 text-white h-12 shadow-lg shadow-primary/20"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating with AI...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate CV with AI
            </>
          )}
        </Button>
      </div>

      <div className="border-t border-primary/20 pt-6">
        <h3 className="text-sm font-medium text-gray-400 mb-4">Try an example:</h3>
        <div className="grid grid-cols-2 gap-3">
          {examples.map((example) => (
            <button
              key={example.title}
              onClick={() => setPrompt(example.text)}
              className="text-left p-4 rounded-lg bg-card border border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <p className="text-sm font-medium text-white mb-1">{example.title}</p>
              <p className="text-xs text-gray-500 line-clamp-2">{example.text}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
