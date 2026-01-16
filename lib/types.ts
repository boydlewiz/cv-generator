export interface PersonalDetails {
  fullName: string
  email: string
  phone: string
  location: string
  idNumber?: string
  nationality?: string
  maritalStatus?: string
  summary: string
}

export interface WorkExperience {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  grade?: string
  achievements: string[]
}

export interface Skill {
  id: string
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
}

export interface Language {
  id: string
  name: string
  proficiency: "Basic" | "Conversational" | "Fluent" | "Native"
}

export interface Reference {
  id: string
  name: string
  position: string
  company: string
  email: string
  phone: string
}

export interface CVData {
  id: string
  personalDetails: PersonalDetails
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  references: Reference[]
  template: "modern" | "classic" | "creative" | "executive" | "simple" | "corporate" | "elegant"
  lastModified: string
}
