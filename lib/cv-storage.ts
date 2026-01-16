import type { CVData } from "./types"

const STORAGE_KEY = "cv-builder-data"
const SAVED_CVS_KEY = "saved-cvs"

export function saveCurrentCV(cvData: CVData): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData))

  // Also save to saved CVs list
  const savedCVs = getSavedCVs()
  const existingIndex = savedCVs.findIndex((cv) => cv.id === cvData.id)

  if (existingIndex >= 0) {
    savedCVs[existingIndex] = cvData
  } else {
    savedCVs.push(cvData)
  }

  localStorage.setItem(SAVED_CVS_KEY, JSON.stringify(savedCVs))
}

export function getCurrentCV(): CVData | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : null
}

export function getSavedCVs(): CVData[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(SAVED_CVS_KEY)
  return data ? JSON.parse(data) : []
}

export function deleteCV(id: string): void {
  if (typeof window === "undefined") return
  const savedCVs = getSavedCVs().filter((cv) => cv.id !== id)
  localStorage.setItem(SAVED_CVS_KEY, JSON.stringify(savedCVs))
}

export function createEmptyCV(): CVData {
  return {
    id: `cv-${Date.now()}`,
    personalDetails: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      portfolio: "",
      summary: "",
    },
    workExperience: [],
    education: [],
    skills: [],
    languages: [],
    references: [],
    template: "modern",
    lastModified: new Date().toISOString(),
  }
}
