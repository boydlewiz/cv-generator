"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { ExecutiveTemplate } from "@/components/templates/executive-template"
import { createEmptyCV } from "@/lib/cv-storage"

const sampleCV = {
  ...createEmptyCV(),
  personalDetails: {
    fullName: "Thabo Mabena",
    email: "thabo.mabena@email.com",
    phone: "+27 82 123 4567",
    location: "Johannesburg, Gauteng",
    linkedIn: "linkedin.com/in/thabo-mabena",
    portfolio: "www.thabo-mabena.com",
    summary:
      "Results-driven Software Developer with 5+ years of experience building scalable web applications. Passionate about creating elegant solutions to complex problems and mentoring junior developers.",
  },
  workExperience: [
    {
      id: "1",
      jobTitle: "Senior Software Developer",
      company: "Tech Solutions SA",
      location: "Johannesburg, Gauteng",
      startDate: "2021-03",
      endDate: "",
      current: true,
      description: "Lead developer for enterprise web applications serving 50,000+ users.",
      achievements: [
        "Reduced application load time by 60% through performance optimization",
        "Mentored 5 junior developers and conducted code reviews",
      ],
    },
    {
      id: "2",
      jobTitle: "Software Developer",
      company: "Digital Innovations",
      location: "Cape Town, Western Cape",
      startDate: "2019-01",
      endDate: "2021-02",
      current: false,
      description: "Developed and maintained multiple client-facing web applications.",
      achievements: ["Built 10+ responsive web applications", "Implemented automated testing reducing bugs by 40%"],
    },
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of the Witwatersrand",
      location: "Johannesburg, Gauteng",
      startDate: "2015-02",
      endDate: "2018-11",
      current: false,
      grade: "Distinction",
      achievements: ["Dean's List 2017-2018", "First-team Programming Competition Winner"],
    },
  ],
  skills: [
    { id: "1", name: "JavaScript / TypeScript", level: "Expert" as const },
    { id: "2", name: "React & Next.js", level: "Advanced" as const },
    { id: "3", name: "Node.js", level: "Advanced" as const },
    { id: "4", name: "SQL & NoSQL Databases", level: "Intermediate" as const },
  ],
  languages: [
    { id: "1", name: "English", proficiency: "Native" as const },
    { id: "2", name: "Afrikaans", proficiency: "Conversational" as const },
    { id: "3", name: "Zulu", proficiency: "Basic" as const },
  ],
  references: [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      position: "Technical Director",
      company: "Tech Solutions SA",
      email: "sarah.johnson@techsolutions.co.za",
      phone: "+27 11 123 4567",
    },
  ],
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with accent colors",
    component: ModernTemplate,
  },
  { id: "classic", name: "Classic", description: "Traditional and professional layout", component: ClassicTemplate },
  {
    id: "creative",
    name: "Creative",
    description: "Bold sidebar design with visual flair",
    component: CreativeTemplate,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior positions",
    component: ExecutiveTemplate,
  },
]

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const CurrentTemplate = templates.find((t) => t.id === selectedTemplate)?.component || ModernTemplate

  return (
    <div className="min-h-screen bg-[#1a1f2e]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            asChild
            className="mb-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2 text-white">CV Templates</h1>
          <p className="text-gray-400">Choose from our professionally designed templates</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Template List */}
          <div className="lg:col-span-1">
            <div className="space-y-4 lg:sticky lg:top-8">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md bg-[#252b3b] border-gray-700 ${
                    selectedTemplate === template.id ? "ring-2 ring-[#e63946] bg-[#e63946]/5" : ""
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <h3 className="font-bold text-lg mb-1 text-white">{template.name}</h3>
                  <p className="text-sm text-gray-400">{template.description}</p>
                </Card>
              ))}

              <Button
                size="lg"
                asChild
                className="w-full bg-gradient-to-r from-[#e63946] to-[#ff6b6b] hover:from-[#d62839] hover:to-[#ff5252] text-white border-0"
              >
                <Link href="/builder">Start Building with This Template</Link>
              </Button>
            </div>
          </div>

          {/* Template Preview */}
          <div className="lg:col-span-2">
            <div className="transform scale-75 origin-top bg-white rounded-lg shadow-2xl overflow-hidden">
              <CurrentTemplate data={sampleCV} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
