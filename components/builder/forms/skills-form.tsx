"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wrench, Plus, X } from "lucide-react"
import { useCV } from "@/lib/cv-context"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SkillsForm() {
  const { cvData, updateCVData } = useCV()
  const [skillInput, setSkillInput] = useState("")
  const [skillLevel, setSkillLevel] = useState<"Beginner" | "Intermediate" | "Advanced" | "Expert">("Intermediate")
  const [skillCategory, setSkillCategory] = useState<"Technical" | "Soft Skills" | "Tools">("Technical")

  const addSkill = () => {
    if (!skillInput.trim()) return

    updateCVData({
      skills: [...cvData.skills, { name: skillInput.trim(), level: skillLevel, category: skillCategory }],
    })
    setSkillInput("")
  }

  const removeSkill = (index: number) => {
    updateCVData({
      skills: cvData.skills.filter((_, i) => i !== index),
    })
  }

  const technicalSkills = cvData.skills.filter((s) => s.category === "Technical")
  const softSkills = cvData.skills.filter((s) => s.category === "Soft Skills")
  const tools = cvData.skills.filter((s) => s.category === "Tools")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          Skills
        </h2>
        <p className="text-gray-400 text-sm">Add your professional skills and expertise</p>
      </div>

      <div className="space-y-4 p-6 bg-[#232938] rounded-lg border border-gray-700">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Skill Name</Label>
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
              className="bg-[#1a1f2e] border-gray-700 text-white"
              placeholder="Enter a skill"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Level</Label>
            <Select value={skillLevel} onValueChange={(v: any) => setSkillLevel(v)}>
              <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#232938] border-gray-700">
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Category</Label>
            <Select value={skillCategory} onValueChange={(v: any) => setSkillCategory(v)}>
              <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#232938] border-gray-700">
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                <SelectItem value="Tools">Tools</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={addSkill} className="w-full bg-primary hover:bg-primary/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Technical Skills */}
      {technicalSkills.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Technical</h3>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.map((skill, index) => (
              <Badge
                key={index}
                className="bg-primary/10 text-primary border border-primary/30 px-3 py-1.5 hover:bg-primary/20"
              >
                {skill.name}
                <button onClick={() => removeSkill(cvData.skills.indexOf(skill))} className="ml-2 hover:opacity-80">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Soft Skills */}
      {softSkills.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill, index) => (
              <Badge
                key={index}
                className="bg-secondary/10 text-secondary border border-secondary/30 px-3 py-1.5 hover:bg-secondary/20"
              >
                {skill.name}
                <button onClick={() => removeSkill(cvData.skills.indexOf(skill))} className="ml-2 hover:opacity-80">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Tools */}
      {tools.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Tools</h3>
          <div className="flex flex-wrap gap-2">
            {tools.map((skill, index) => (
              <Badge
                key={index}
                className="bg-accent/10 text-accent border border-accent/30 px-3 py-1.5 hover:bg-accent/20"
              >
                {skill.name}
                <button onClick={() => removeSkill(cvData.skills.indexOf(skill))} className="ml-2 hover:opacity-80">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {cvData.skills.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-lg">
          <Wrench className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No skills added yet. Start adding your skills above.</p>
        </div>
      )}
    </div>
  )
}
