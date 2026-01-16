"use client"

import { useCV } from "@/lib/cv-context"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { ExecutiveTemplate } from "@/components/templates/executive-template"
import { SimpleTemplate } from "@/components/templates/simple-template"
import { CorporateTemplate } from "@/components/templates/corporate-template"
import { ElegantTemplate } from "@/components/templates/elegant-template"

export function LivePreview() {
  const { cvData } = useCV()

  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    creative: CreativeTemplate,
    executive: ExecutiveTemplate,
    simple: SimpleTemplate,
    corporate: CorporateTemplate,
    elegant: ElegantTemplate,
  }

  const TemplateComponent = templates[cvData.template] || templates.simple

  return (
    <div>
      <div className="scale-[0.85] origin-top-left" style={{ width: "118%", height: "118%" }}>
        <TemplateComponent data={cvData} />
      </div>
    </div>
  )
}
