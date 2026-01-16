"use client"

import { useCV } from "@/lib/cv-context"
import type { Skill, Language } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { AIGenerateButton } from "./ai-buttons"

export function SkillsForm() {
  const { cvData, updateCVData } = useCV()

  const addSkill = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: "",
      level: "Intermediate",
    }
    updateCVData({
      skills: [...cvData.skills, newSkill],
    })
  }

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    updateCVData({
      skills: cvData.skills.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill)),
    })
  }

  const deleteSkill = (id: string) => {
    updateCVData({
      skills: cvData.skills.filter((skill) => skill.id !== id),
    })
  }

  const addLanguage = () => {
    const newLanguage: Language = {
      id: `lang-${Date.now()}`,
      name: "",
      proficiency: "Conversational",
    }
    updateCVData({
      languages: [...cvData.languages, newLanguage],
    })
  }

  const updateLanguage = (id: string, updates: Partial<Language>) => {
    updateCVData({
      languages: cvData.languages.map((lang) => (lang.id === id ? { ...lang, ...updates } : lang)),
    })
  }

  const deleteLanguage = (id: string) => {
    updateCVData({
      languages: cvData.languages.filter((lang) => lang.id !== id),
    })
  }

  const handleSuggestSkills = async () => {
    const latestJob = cvData.workExperience[0]
    const response = await fetch("/api/ai/suggest-skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobTitle: latestJob?.jobTitle || "",
        industry: latestJob?.company || "",
      }),
    })

    if (!response.ok) throw new Error("Failed to suggest skills")

    const { skills: suggestedSkills } = await response.json()
    const newSkills = suggestedSkills.map((name: string) => ({
      id: `skill-${Date.now()}-${Math.random()}`,
      name,
      level: "Intermediate" as const,
    }))

    updateCVData({
      skills: [...cvData.skills, ...newSkills],
    })
  }

  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-none">
        <CardHeader className="px-0 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Skills</CardTitle>
              <CardDescription>Add your technical and professional skills</CardDescription>
            </div>
            <AIGenerateButton onGenerate={handleSuggestSkills} label="Suggest Skills" />
          </div>
        </CardHeader>
        <CardContent className="px-0 space-y-4">
          {cvData.skills.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground mb-4">No skills added yet</p>
              <Button onClick={addSkill}>
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
          )}

          {cvData.skills.map((skill) => (
            <div key={skill.id} className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Skill Name</Label>
                <Input
                  placeholder="e.g., Python, Project Management, Adobe Photoshop"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                />
              </div>
              <div className="w-40 space-y-2">
                <Label>Level</Label>
                <Select
                  value={skill.level}
                  onValueChange={(value) => updateSkill(skill.id, { level: value as Skill["level"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteSkill(skill.id)} className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {cvData.skills.length > 0 && (
            <Button onClick={addSkill} variant="outline" className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Skill
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl">Languages</CardTitle>
          <CardDescription>Add languages you can speak and your proficiency level</CardDescription>
        </CardHeader>
        <CardContent className="px-0 space-y-4">
          {cvData.languages.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground mb-4">No languages added yet</p>
              <Button onClick={addLanguage}>
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </div>
          )}

          {cvData.languages.map((language) => (
            <div key={language.id} className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Language</Label>
                <Input
                  placeholder="e.g., English, Afrikaans, Zulu, Xhosa"
                  value={language.name}
                  onChange={(e) => updateLanguage(language.id, { name: e.target.value })}
                />
              </div>
              <div className="w-44 space-y-2">
                <Label>Proficiency</Label>
                <Select
                  value={language.proficiency}
                  onValueChange={(value) =>
                    updateLanguage(language.id, { proficiency: value as Language["proficiency"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Conversational">Conversational</SelectItem>
                    <SelectItem value="Fluent">Fluent</SelectItem>
                    <SelectItem value="Native">Native</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteLanguage(language.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {cvData.languages.length > 0 && (
            <Button onClick={addLanguage} variant="outline" className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Language
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
