"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { User, Briefcase, GraduationCap, Wrench, FolderOpen } from "lucide-react"
import { PersonalInfoForm } from "./forms/personal-info-form"
import { WorkExperienceForm } from "./forms/work-experience-form"
import { EducationForm } from "./forms/education-form"
import { SkillsForm } from "./forms/skills-form"
import { ProjectsForm } from "./forms/projects-form"

type Section = "info" | "work" | "edu" | "skills" | "projects"

const sections = [
  { id: "info" as Section, label: "Info", icon: User },
  { id: "work" as Section, label: "Work", icon: Briefcase },
  { id: "edu" as Section, label: "Edu", icon: GraduationCap },
  { id: "skills" as Section, label: "Skills", icon: Wrench },
  { id: "projects" as Section, label: "Projects", icon: FolderOpen },
]

export function ManualEditor() {
  const [activeSection, setActiveSection] = useState<Section>("info")

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex gap-2 border-b border-gray-800 pb-4">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSection === section.id
          return (
            <Button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              variant={isActive ? "default" : "ghost"}
              className={
                isActive
                  ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }
            >
              <Icon className="h-4 w-4 mr-2" />
              {section.label}
            </Button>
          )
        })}
      </div>

      {/* Form Content */}
      <div className="min-h-[500px]">
        {activeSection === "info" && <PersonalInfoForm />}
        {activeSection === "work" && <WorkExperienceForm />}
        {activeSection === "edu" && <EducationForm />}
        {activeSection === "skills" && <SkillsForm />}
        {activeSection === "projects" && <ProjectsForm />}
      </div>
    </div>
  )
}
