"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Briefcase, Plus, Trash2 } from "lucide-react"
import { useCV } from "@/lib/cv-context"
import type { WorkExperience } from "@/lib/types"

export function WorkExperienceForm() {
  const { cvData, updateCVData } = useCV()

  const addExperience = () => {
    const newExperience: WorkExperience = {
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
    }
    updateCVData({
      workExperience: [...cvData.workExperience, newExperience],
    })
  }

  const updateExperience = (index: number, field: keyof WorkExperience, value: any) => {
    const updated = [...cvData.workExperience]
    updated[index] = { ...updated[index], [field]: value }
    updateCVData({ workExperience: updated })
  }

  const removeExperience = (index: number) => {
    updateCVData({
      workExperience: cvData.workExperience.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-secondary" />
            Work Experience
          </h2>
          <p className="text-gray-400 text-sm">Add your professional experience</p>
        </div>
        <Button
          onClick={addExperience}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {cvData.workExperience.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-lg">
          <Briefcase className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 mb-4">No work experience added yet</p>
          <Button
            onClick={addExperience}
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Work Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {cvData.workExperience.map((exp, index) => (
            <div key={index} className="p-6 bg-[#232938] rounded-lg border border-gray-700 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Position {index + 1}</h3>
                <Button
                  onClick={() => removeExperience(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Job Title</Label>
                  <Input
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(index, "jobTitle", e.target.value)}
                    className="bg-[#1a1f2e] border-gray-700 text-white"
                    placeholder="8th Grade Science Teacher"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    className="bg-[#1a1f2e] border-gray-700 text-white"
                    placeholder="Boston Public Schools"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                    className="bg-[#1a1f2e] border-gray-700 text-white"
                    placeholder="Boston, MA"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Start Date</Label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                      className="bg-[#1a1f2e] border-gray-700 text-white"
                      placeholder="Sep 2018"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">End Date</Label>
                    <Input
                      value={exp.endDate}
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                      className="bg-[#1a1f2e] border-gray-700 text-white"
                      placeholder="Present"
                      disabled={exp.current}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Description & Achievements</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  className="min-h-[120px] bg-[#1a1f2e] border-gray-700 text-white"
                  placeholder="• Developed and implemented engaging science curriculum&#10;• Utilized differentiated instruction strategies&#10;• Integrated technology, including interactive simulations"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
