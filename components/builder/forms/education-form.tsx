"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { GraduationCap, Plus, Trash2 } from "lucide-react"
import { useCV } from "@/lib/cv-context"
import type { Education } from "@/lib/types"

export function EducationForm() {
  const { cvData, updateCVData } = useCV()

  const addEducation = () => {
    const newEducation: Education = {
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      grade: "",
      achievements: [],
    }
    updateCVData({
      education: [...cvData.education, newEducation],
    })
  }

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const updated = [...cvData.education]
    updated[index] = { ...updated[index], [field]: value }
    updateCVData({ education: updated })
  }

  const removeEducation = (index: number) => {
    updateCVData({
      education: cvData.education.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-accent" />
            Education
          </h2>
          <p className="text-gray-400 text-sm">Add your educational background</p>
        </div>
        <Button
          onClick={addEducation}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {cvData.education.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-lg">
          <GraduationCap className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 mb-4">No education added yet</p>
          <Button
            onClick={addEducation}
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {cvData.education.map((edu, index) => (
            <div key={index} className="p-6 bg-[#232938] rounded-lg border border-gray-700 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Education {index + 1}</h3>
                <Button
                  onClick={() => removeEducation(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    className="bg-[#1a1f2e] border-gray-700 text-white"
                    placeholder="Bachelor of Science in Education"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    className="bg-[#1a1f2e] border-gray-700 text-white"
                    placeholder="University of Massachusetts"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Location</Label>
                  <Input
                    value={edu.location}
                    onChange={(e) => updateEducation(index, "location", e.target.value)}
                    className="bg-[#1a1f2e] border-gray-700 text-white"
                    placeholder="Boston, MA"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Grade/GPA</Label>
                  <Input
                    value={edu.grade}
                    onChange={(e) => updateEducation(index, "grade", e.target.value)}
                    className="bg-[#1a1f2e] border-gray-700 text-white"
                    placeholder="3.8 GPA"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Start Year</Label>
                  <Input
                    value={edu.startDate}
                    onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                    className="bg-[#1a1f2e] border-gray-700 text-white"
                    placeholder="2014"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">End Year</Label>
                  <Input
                    value={edu.endDate}
                    onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                    className="bg-[#1a1f2e] border-gray-700 text-white"
                    placeholder="2018"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
