"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCV } from "@/lib/cv-context"
import { Check } from "lucide-react"

const templates = [
  {
    id: "simple" as const,
    name: "Simple Professional",
    description: "Clean lines, perfect for any role",
    colors: ["#1e293b", "#475569", "#94a3b8"],
  },
  {
    id: "modern" as const,
    name: "Modern",
    description: "Bold with SA accent colors",
    colors: ["#e91e63", "#9333ea", "#f59e0b"],
  },
  {
    id: "classic" as const,
    name: "Classic",
    description: "Traditional two-column layout",
    colors: ["#e91e63", "#9333ea", "#f59e0b"],
  },
  {
    id: "corporate" as const,
    name: "Corporate",
    description: "Professional navy header style",
    colors: ["#1e293b", "#64748b", "#94a3b8"],
  },
  {
    id: "elegant" as const,
    name: "Elegant",
    description: "Centered serif typography",
    colors: ["#4b5563", "#6b7280", "#9ca3af"],
  },
  {
    id: "creative" as const,
    name: "Creative",
    description: "Vibrant sidebar design",
    colors: ["#7c3aed", "#a855f7", "#c084fc"],
  },
  {
    id: "executive" as const,
    name: "Executive",
    description: "Gold accents for leadership",
    colors: ["#b45309", "#d97706", "#f59e0b"],
  },
]

interface TemplateSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TemplateSelector({ open, onOpenChange }: TemplateSelectorProps) {
  const { cvData, updateCVData } = useCV()

  const handleSelectTemplate = (templateId: (typeof templates)[number]["id"]) => {
    updateCVData({ template: templateId })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#232938] border-gray-700 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-xl">🎨</span>
            </div>
            Choose Your Template
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {templates.map((template) => {
            const isSelected = cvData.template === template.id

            return (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template.id)}
                className={`relative p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                  isSelected ? "border-primary bg-primary/10" : "border-gray-700 bg-[#1a1f2e] hover:border-primary/50"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className="flex gap-2 mb-3">
                  {template.colors.map((color, idx) => (
                    <div key={idx} className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <h3 className="text-lg font-bold text-white mb-1 text-left">{template.name}</h3>
                <p className="text-sm text-gray-400 text-left">{template.description}</p>
              </button>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
