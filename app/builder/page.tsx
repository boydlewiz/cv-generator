"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Edit3, Eye, Download, RotateCcw, Palette } from "lucide-react"
import { AIGenerator } from "@/components/builder/ai-generator"
import { ManualEditor } from "@/components/builder/manual-editor"
import { LivePreview } from "@/components/builder/live-preview"
import { TemplateSelector } from "@/components/builder/template-selector"
import { useCV } from "@/lib/cv-context"
import Link from "next/link"

type Mode = "ai" | "manual"

export default function BuilderPage() {
  const [mode, setMode] = useState<Mode>("ai")
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const { resetCV } = useCV()

  const handleDownload = () => {
    window.print()
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset? This will clear all your data.")) {
      resetCV()
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1f2e] flex flex-col">
      <nav className="border-b border-gray-800/50 bg-[#1a1f2e] sticky top-0 z-50 print:hidden">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="Careerley" className="h-10 md:h-12 w-auto" />
              </Link>
              <span className="text-sm text-gray-400 ml-2 hidden md:inline">AI-Powered Resume Builder</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => setShowTemplateSelector(true)}
              >
                <Palette className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Templates</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Split Screen */}
      <div className="flex-1 grid lg:grid-cols-[1fr_auto] gap-0 overflow-hidden">
        <div className="bg-[#1a1f2e] border-r border-gray-800/50 overflow-y-auto scrollbar-thin print:hidden">
          <div className="p-6 space-y-6">
            <div className="flex gap-3">
              <Button
                onClick={() => setMode("ai")}
                variant={mode === "ai" ? "default" : "ghost"}
                className={
                  mode === "ai"
                    ? "bg-primary hover:bg-primary/90 text-white flex-1"
                    : "text-gray-400 hover:text-white hover:bg-gray-800 flex-1 bg-transparent border border-gray-700"
                }
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Generate
              </Button>
              <Button
                onClick={() => setMode("manual")}
                variant={mode === "manual" ? "default" : "ghost"}
                className={
                  mode === "manual"
                    ? "bg-primary hover:bg-primary/90 text-white flex-1"
                    : "text-gray-400 hover:text-white hover:bg-gray-800 flex-1 bg-transparent border border-gray-700"
                }
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Manual Edit
              </Button>
            </div>

            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: "45%" }} />
            </div>

            {/* Content Based on Mode */}
            {mode === "ai" ? <AIGenerator /> : <ManualEditor />}
          </div>
        </div>

        <div className="bg-[#141824] overflow-y-auto scrollbar-thin hidden lg:block print:block print:bg-white">
          <div className="p-6 print:p-0">
            <div className="flex items-center gap-2 mb-4 text-primary print:hidden">
              <Eye className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Live Preview</h2>
            </div>
            <LivePreview />
          </div>
        </div>
      </div>

      {/* Template Selector Modal */}
      <TemplateSelector open={showTemplateSelector} onOpenChange={setShowTemplateSelector} />

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          @page {
            margin: 0;
            size: A4;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
