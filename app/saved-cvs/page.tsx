"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSavedCVs, deleteCV, saveCurrentCV } from "@/lib/cv-storage"
import type { CVData } from "@/lib/types"
import { FileText, Trash2, Eye, Plus, ArrowLeft } from "lucide-react"
import { useCV } from "@/lib/cv-context"
import { useRouter } from "next/navigation"

export default function SavedCVsPage() {
  const [savedCVs, setSavedCVs] = useState<CVData[]>([])
  const { updateCVData, resetCV } = useCV()
  const router = useRouter()

  useEffect(() => {
    setSavedCVs(getSavedCVs())
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this CV?")) {
      deleteCV(id)
      setSavedCVs(getSavedCVs())
    }
  }

  const handleLoad = (cv: CVData) => {
    updateCVData(cv)
    saveCurrentCV(cv)
    router.push("/builder")
  }

  const handlePreview = (cv: CVData) => {
    updateCVData(cv)
    saveCurrentCV(cv)
    router.push("/preview")
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-[#1a1f2e]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="outline"
            asChild
            className="mb-4 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2 text-white">Saved CVs</h1>
          <p className="text-gray-400">Manage your saved CV drafts</p>
        </div>

        {savedCVs.length === 0 ? (
          <Card className="max-w-2xl mx-auto bg-[#252b3b] border-gray-700">
            <CardContent className="py-16 text-center">
              <div className="h-16 w-16 bg-[#e63946]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-[#e63946]" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">No Saved CVs Yet</h2>
              <p className="text-gray-400 mb-6">
                Start building your professional CV and it will be automatically saved here
              </p>
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-[#e63946] to-[#ff6b6b] hover:from-[#d62839] hover:to-[#ff5252] text-white border-0"
              >
                <Link href="/builder">
                  <Plus className="h-5 w-5 mr-2" />
                  Create New CV
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCVs.map((cv) => (
              <Card key={cv.id} className="hover:shadow-lg transition-shadow bg-[#252b3b] border-gray-700">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="h-10 w-10 bg-[#e63946]/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-[#e63946]" />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(cv.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-gray-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="line-clamp-1 text-white">
                    {cv.personalDetails.fullName || "Untitled CV"}
                  </CardTitle>
                  <CardDescription>
                    {cv.personalDetails.email && (
                      <div className="line-clamp-1 text-gray-400">{cv.personalDetails.email}</div>
                    )}
                    <div className="text-xs mt-1 text-gray-500">Last modified: {formatDate(cv.lastModified)}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex justify-between">
                      <span>Work Experience:</span>
                      <span className="font-medium text-white">{cv.workExperience.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Education:</span>
                      <span className="font-medium text-white">{cv.education.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Skills:</span>
                      <span className="font-medium text-white">{cv.skills.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Template:</span>
                      <span className="font-medium text-white capitalize">{cv.template}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleLoad(cv)}
                      className="flex-1 bg-[#e63946] hover:bg-[#d62839] text-white border-0"
                      size="sm"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handlePreview(cv)}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {savedCVs.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={() => {
                resetCV()
                router.push("/builder")
              }}
              className="bg-gradient-to-r from-[#e63946] to-[#ff6b6b] hover:from-[#d62839] hover:to-[#ff5252] text-white border-0"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New CV
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
