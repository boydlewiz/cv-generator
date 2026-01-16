"use client"

import { useCV } from "@/lib/cv-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AIGenerateButton } from "./ai-buttons"

export function PersonalDetailsForm() {
  const { cvData, updateCVData } = useCV()

  const handleChange = (field: string, value: string) => {
    updateCVData({
      personalDetails: {
        ...cvData.personalDetails,
        [field]: value,
      },
    })
  }

  const handleGenerateSummary = async () => {
    const response = await fetch("/api/ai/generate-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workExperience: cvData.workExperience,
        education: cvData.education,
        skills: cvData.skills,
      }),
    })

    if (!response.ok) throw new Error("Failed to generate summary")

    const { summary } = await response.json()
    handleChange("summary", summary)
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl">Personal Details</CardTitle>
        <CardDescription>Start with your basic information and contact details</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={cvData.personalDetails.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={cvData.personalDetails.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+27 82 123 4567"
              value={cvData.personalDetails.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="Johannesburg, Gauteng"
              value={cvData.personalDetails.location}
              onChange={(e) => handleChange("location", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="linkedIn">LinkedIn Profile</Label>
            <Input
              id="linkedIn"
              placeholder="linkedin.com/in/johndoe"
              value={cvData.personalDetails.linkedIn}
              onChange={(e) => handleChange("linkedIn", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio / Website</Label>
            <Input
              id="portfolio"
              placeholder="www.johndoe.com"
              value={cvData.personalDetails.portfolio}
              onChange={(e) => handleChange("portfolio", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="summary">Professional Summary *</Label>
            <AIGenerateButton
              onGenerate={handleGenerateSummary}
              label="Generate Summary"
              disabled={cvData.workExperience.length === 0 && cvData.education.length === 0}
            />
          </div>
          <Textarea
            id="summary"
            placeholder="Write a brief summary about yourself, your experience, and career goals..."
            value={cvData.personalDetails.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            rows={5}
            className="resize-none"
            required
          />
          <p className="text-sm text-muted-foreground">
            2-3 sentences highlighting your key strengths and career objectives
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
