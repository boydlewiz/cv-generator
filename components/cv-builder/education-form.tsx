"use client"

import { useCV } from "@/lib/cv-context"
import type { Education } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"

export function EducationForm() {
  const { cvData, updateCVData } = useCV()

  const addEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      grade: "",
      achievements: [""],
    }
    updateCVData({
      education: [...cvData.education, newEducation],
    })
  }

  const updateEducation = (id: string, updates: Partial<Education>) => {
    updateCVData({
      education: cvData.education.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)),
    })
  }

  const deleteEducation = (id: string) => {
    updateCVData({
      education: cvData.education.filter((edu) => edu.id !== id),
    })
  }

  const updateAchievement = (eduId: string, index: number, value: string) => {
    const edu = cvData.education.find((e) => e.id === eduId)
    if (!edu) return

    const newAchievements = [...edu.achievements]
    newAchievements[index] = value
    updateEducation(eduId, { achievements: newAchievements })
  }

  const addAchievement = (eduId: string) => {
    const edu = cvData.education.find((e) => e.id === eduId)
    if (!edu) return

    updateEducation(eduId, {
      achievements: [...edu.achievements, ""],
    })
  }

  const removeAchievement = (eduId: string, index: number) => {
    const edu = cvData.education.find((e) => e.id === eduId)
    if (!edu) return

    updateEducation(eduId, {
      achievements: edu.achievements.filter((_, i) => i !== index),
    })
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl">Education</CardTitle>
        <CardDescription>Add your educational background, qualifications, and certifications</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {cvData.education.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-4">No education added yet</p>
            <Button onClick={addEducation}>
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        )}

        {cvData.education.map((edu, index) => (
          <Card key={edu.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{edu.degree || `Qualification ${index + 1}`}</CardTitle>
                  {edu.institution && <CardDescription>{edu.institution}</CardDescription>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteEducation(edu.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Degree / Qualification *</Label>
                  <Input
                    placeholder="Bachelor of Science in Computer Science"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    placeholder="University of Cape Town"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Cape Town, Western Cape"
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    disabled={edu.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-edu-${edu.id}`}
                  checked={edu.current}
                  onCheckedChange={(checked) => updateEducation(edu.id, { current: checked as boolean })}
                />
                <Label htmlFor={`current-edu-${edu.id}`} className="font-normal cursor-pointer">
                  I am currently studying here
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Grade / GPA</Label>
                <Input
                  placeholder="e.g., Distinction, 3.8 GPA, 75%"
                  value={edu.grade}
                  onChange={(e) => updateEducation(edu.id, { grade: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Achievements & Activities</Label>
                {edu.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex gap-2">
                    <Input
                      placeholder="Dean's List, President of Student Council..."
                      value={achievement}
                      onChange={(e) => updateAchievement(edu.id, achIndex, e.target.value)}
                    />
                    {edu.achievements.length > 1 && (
                      <Button variant="ghost" size="icon" onClick={() => removeAchievement(edu.id, achIndex)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addAchievement(edu.id)} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {cvData.education.length > 0 && (
          <Button onClick={addEducation} variant="outline" className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Qualification
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
