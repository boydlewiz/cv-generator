"use client"

import { useCV } from "@/lib/cv-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Save, FileText } from "lucide-react"
import html2pdf from "html2pdf.js"
import htmlDocx from "html-docx-js/dist/html-docx"
import Link from "next/link"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { ExecutiveTemplate } from "@/components/templates/executive-template"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function PreviewPage() {
  const { cvData, updateCVData } = useCV()
  const router = useRouter()
  const { toast } = useToast()

  const templates = [
    { id: "modern", name: "Modern", component: ModernTemplate },
    { id: "classic", name: "Classic", component: ClassicTemplate },
    { id: "creative", name: "Creative", component: CreativeTemplate },
    { id: "executive", name: "Executive", component: ExecutiveTemplate },
  ] as const

  const CurrentTemplate = templates.find((t) => t.id === cvData.template)?.component || ModernTemplate

  const handleDownload = () => {
    if (typeof window !== "undefined") {
      window.print()
      toast({
        title: "Print Dialog Opened",
        description: "Select 'Save as PDF' as your printer to download your CV",
      })
    }
  }

  // PDF Export using html2pdf.js
  const handleExportPDF = () => {
    const element = document.getElementById("cv-preview")
    if (element) {
      html2pdf()
        .set({
          margin: 0,
          filename: "cv.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save()
      toast({
        title: "PDF Download Started",
        description: "Your CV is being downloaded as a PDF.",
      })
    }
  }

  // Word Export using html-docx-js
  const handleExportWord = () => {
    const element = document.getElementById("cv-preview")
    if (element) {
      const html = element.outerHTML
      const converted = htmlDocx.asBlob(html)
      const url = URL.createObjectURL(converted)
      const a = document.createElement("a")
      a.href = url
      a.download = "cv.docx"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast({
        title: "Word Download Started",
        description: "Your CV is being downloaded as a Word document.",
      })
    }
  }

  const handleSave = () => {
    router.push("/saved-cvs")
    toast({
      title: "CV Saved",
      description: "Your CV has been saved successfully",
    })
  }

  return (
    <div className="min-h-screen bg-[#1a1f2e]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 print:hidden">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <Button
              variant="outline"
              asChild
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
            >
              <Link href="/builder">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Editor
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button
                size="lg"
                variant="outline"
                onClick={handleSave}
                className="gap-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
              >
                <Save className="h-5 w-5" />
                Save CV
              </Button>
              <Button
                size="lg"
                onClick={handleExportPDF}
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0"
              >
                <Download className="h-5 w-5" />
                Download PDF
              </Button>
              <Button
                size="lg"
                onClick={handleExportWord}
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0"
              >
                <FileText className="h-5 w-5" />
                Download Word
              </Button>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white">Preview Your CV</h1>
          <p className="text-gray-400">Choose a template and download your professional CV</p>
        </div>

        <div className="mb-6 print:hidden">
          <div className="flex gap-2 flex-wrap">
            {templates.map((template) => (
              <Button
                key={template.id}
                variant={cvData.template === template.id ? "default" : "outline"}
                onClick={() => updateCVData({ template: template.id })}
                className={
                  cvData.template === template.id
                    ? "bg-primary hover:bg-primary/90 text-white border-0"
                    : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                }
              >
                {template.name}
              </Button>
            ))}
          </div>
        </div>

        <Card className="max-w-[210mm] mx-auto overflow-hidden print:shadow-none print:border-0 print:max-w-none print:mx-0 bg-white border-gray-700" id="cv-preview">
          <CardContent className="p-0 print:p-0">
            <CurrentTemplate data={cvData} />
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        @media print {
          html, body {
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={handleSave}
                      className="gap-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                    >
                      <Save className="h-5 w-5" />
                      Save CV
                    </Button>
                    <div className="relative">
                      <Button
                        size="lg"
                        onClick={handleExport}
                        className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0"
                      >
                        <Download className="h-5 w-5" />
                        Export as {exportFormat === 'pdf' ? 'PDF' : 'Word'}
                      </Button>
                      <div className="absolute top-full left-0 mt-2 z-10">
                        <div className="flex flex-col bg-white border rounded shadow">
                          <button
                            className={`px-4 py-2 text-left ${exportFormat === 'pdf' ? 'bg-gray-200' : ''}`}
                            onClick={() => setExportFormat('pdf')}
                          >PDF</button>
                          <button
                            className={`px-4 py-2 text-left ${exportFormat === 'word' ? 'bg-gray-200' : ''}`}
                            onClick={() => setExportFormat('word')}
                          >Word</button>
                        </div>
                      </div>
                    </div>
                  </div>
          @page {
            margin: 0 !important;
            size: A4 portrait !important;
          }
          
          /* Remove card styling in print and ensure full width */
          [class*="max-w-\\[210mm\\]"],
          [class*="Card"],
          [class*="card"] {
            max-width: 100% !important;
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
