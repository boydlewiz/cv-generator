"use client"

import { useState } from "react"
import { useCV } from "@/lib/cv-context"
import type { WorkExperience } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"
import { AIGenerateButton } from "./ai-buttons"

export function WorkExperienceForm() {
  const { cvData, updateCVData } = useCV()
  const [editingId, setEditingId] = useState<string | null>(null)

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: `work-${Date.now()}`,
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
    }
    updateCVData({
      workExperience: [...cvData.workExperience, newExperience],
    })
    setEditingId(newExperience.id)
  }

  const updateWorkExperience = (id: string, updates: Partial<WorkExperience>) => {
    updateCVData({
      workExperience: cvData.workExperience.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)),
    })
  }

  const deleteWorkExperience = (id: string) => {
    updateCVData({
      workExperience: cvData.workExperience.filter((exp) => exp.id !== id),
    })
  }

  const updateAchievement = (workId: string, index: number, value: string) => {
    const work = cvData.workExperience.find((exp) => exp.id === workId)
    if (!work) return

    const newAchievements = [...work.achievements]
    newAchievements[index] = value
    updateWorkExperience(workId, { achievements: newAchievements })
  }

  const addAchievement = (workId: string) => {
    const work = cvData.workExperience.find((exp) => exp.id === workId)
    if (!work) return

    updateWorkExperience(workId, {
      achievements: [...work.achievements, ""],
    })
  }

  const removeAchievement = (workId: string, index: number) => {
    const work = cvData.workExperience.find((exp) => exp.id === workId)
    if (!work) return

    updateWorkExperience(workId, {
      achievements: work.achievements.filter((_, i) => i !== index),
    })
  }

  const handleEnhanceDescription = async (work: WorkExperience) => {
    const response = await fetch("/api/ai/enhance-description", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobTitle: work.jobTitle,
        company: work.company,
        description: work.description,
      }),
    })

    if (!response.ok) throw new Error("Failed to enhance description")

    const { description } = await response.json()
    updateWorkExperience(work.id, { description })
  }

  const handleSuggestAchievements = async (work: WorkExperience) => {
    const response = await fetch("/api/ai/suggest-achievements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobTitle: work.jobTitle,
        company: work.company,
        description: work.description,
      }),
    })

    if (!response.ok) throw new Error("Failed to suggest achievements")

    const { achievements } = await response.json()
    updateWorkExperience(work.id, { achievements })
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl">Work Experience</CardTitle>
        <CardDescription>Add your professional work history, starting with your most recent position</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {cvData.workExperience.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-4">No work experience added yet</p>
            <Button onClick={addWorkExperience}>
              <Plus className="h-4 w-4 mr-2" />
              Add Work Experience
            </Button>
          </div>
        )}

        {cvData.workExperience.map((work, index) => (
          <Card key={work.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{work.jobTitle || `Position ${index + 1}`}</CardTitle>
                  {work.company && <CardDescription>{work.company}</CardDescription>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteWorkExperience(work.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    placeholder="Software Developer"
                    value={work.jobTitle}
                    onChange={(e) => updateWorkExperience(work.id, { jobTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    placeholder="Company Name"
                    value={work.company}
                    onChange={(e) => updateWorkExperience(work.id, { company: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Cape Town, Western Cape"
                  value={work.location}
                  onChange={(e) => updateWorkExperience(work.id, { location: e.target.value })}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="month"
                    value={work.startDate}
                    onChange={(e) => updateWorkExperience(work.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={work.endDate}
                    onChange={(e) => updateWorkExperience(work.id, { endDate: e.target.value })}
                    disabled={work.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${work.id}`}
                  checked={work.current}
                  onCheckedChange={(checked) => updateWorkExperience(work.id, { current: checked as boolean })}
                />
                <Label htmlFor={`current-${work.id}`} className="font-normal cursor-pointer">
                  I currently work here
                </Label>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Job Description</Label>
                  <AIGenerateButton
                    onGenerate={() => handleEnhanceDescription(work)}
                    label="Enhance"
                    disabled={!work.jobTitle || !work.company}
                  />
                </div>
                <Textarea
                  placeholder="Describe your role and responsibilities..."
                  value={work.description}
                  onChange={(e) => updateWorkExperience(work.id, { description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Key Achievements</Label>
                  <AIGenerateButton
                    onGenerate={() => handleSuggestAchievements(work)}
                    label="Suggest"
                    disabled={!work.jobTitle || !work.company}
                  />
                </div>
                {work.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex gap-2">
                    <Input
                      placeholder="Increased sales by 25%..."
                      value={achievement}
                      onChange={(e) => updateAchievement(work.id, achIndex, e.target.value)}
                    />
                    {work.achievements.length > 1 && (
                      <Button variant="ghost" size="icon" onClick={() => removeAchievement(work.id, achIndex)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addAchievement(work.id)} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {cvData.workExperience.length > 0 && (
          <Button onClick={addWorkExperience} variant="outline" className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Position
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
