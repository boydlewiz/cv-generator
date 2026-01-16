"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CVData } from "./types"
import { saveCurrentCV, getCurrentCV, createEmptyCV } from "./cv-storage"

interface CVContextType {
  cvData: CVData
  updateCVData: (data: Partial<CVData>) => void
  resetCV: () => void
  currentStep: number
  setCurrentStep: (step: number) => void
}

const CVContext = createContext<CVContextType | undefined>(undefined)

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(createEmptyCV())
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const savedCV = getCurrentCV()
    if (savedCV) {
      setCVData(savedCV)
    }
  }, [])

  const updateCVData = (data: Partial<CVData>) => {
    const updated = { ...cvData, ...data, lastModified: new Date().toISOString() }
    setCVData(updated)
    saveCurrentCV(updated)
  }

  const resetCV = () => {
    const newCV = createEmptyCV()
    setCVData(newCV)
    saveCurrentCV(newCV)
    setCurrentStep(0)
  }

  return (
    <CVContext.Provider value={{ cvData, updateCVData, resetCV, currentStep, setCurrentStep }}>
      {children}
    </CVContext.Provider>
  )
}

export function useCV() {
  const context = useContext(CVContext)
  if (!context) {
    throw new Error("useCV must be used within CVProvider")
  }
  return context
}
