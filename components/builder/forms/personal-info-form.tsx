"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, User, Mail, Phone, MapPin, Award as IdCard, Flag, Users } from "lucide-react"
import { useCV } from "@/lib/cv-context"
import { useState } from "react"

export function PersonalInfoForm() {
  const { cvData, updateCVData } = useCV()
  const [isEnhancing, setIsEnhancing] = useState(false)

  const handleEnhanceSummary = async () => {
    if (!cvData.personalDetails.summary) return

    setIsEnhancing(true)
    try {
      const response = await fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentSummary: cvData.personalDetails.summary }),
      })

      const data = await response.json()
      if (data.summary) {
        updateCVData({
          personalDetails: {
            ...cvData.personalDetails,
            summary: data.summary,
          },
        })
      }
    } catch (error) {
      console.error("Error enhancing summary:", error)
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          Personal Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-gray-300">
            <User className="h-4 w-4 inline mr-1" />
            Full Name
          </Label>
          <Input
            id="fullName"
            value={cvData.personalDetails.fullName}
            onChange={(e) =>
              updateCVData({
                personalDetails: { ...cvData.personalDetails, fullName: e.target.value },
              })
            }
            className="bg-[#232938] border-gray-700 text-white"
            placeholder="Thabo Mbeki"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            <Mail className="h-4 w-4 inline mr-1" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={cvData.personalDetails.email}
            onChange={(e) =>
              updateCVData({
                personalDetails: { ...cvData.personalDetails, email: e.target.value },
              })
            }
            className="bg-[#232938] border-gray-700 text-white"
            placeholder="thabo.mbeki@example.co.za"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-300">
            <Phone className="h-4 w-4 inline mr-1" />
            Phone
          </Label>
          <Input
            id="phone"
            value={cvData.personalDetails.phone}
            onChange={(e) =>
              updateCVData({
                personalDetails: { ...cvData.personalDetails, phone: e.target.value },
              })
            }
            className="bg-[#232938] border-gray-700 text-white"
            placeholder="+27 82 123 4567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-gray-300">
            <MapPin className="h-4 w-4 inline mr-1" />
            Location
          </Label>
          <Input
            id="location"
            value={cvData.personalDetails.location}
            onChange={(e) =>
              updateCVData({
                personalDetails: { ...cvData.personalDetails, location: e.target.value },
              })
            }
            className="bg-[#232938] border-gray-700 text-white"
            placeholder="Johannesburg, Gauteng"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="idNumber" className="text-gray-300">
            <IdCard className="h-4 w-4 inline mr-1" />
            ID Number
          </Label>
          <Input
            id="idNumber"
            value={cvData.personalDetails.idNumber || ""}
            onChange={(e) =>
              updateCVData({
                personalDetails: { ...cvData.personalDetails, idNumber: e.target.value },
              })
            }
            className="bg-[#232938] border-gray-700 text-white"
            placeholder="9001015800081"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality" className="text-gray-300">
            <Flag className="h-4 w-4 inline mr-1" />
            Nationality
          </Label>
          <Input
            id="nationality"
            value={cvData.personalDetails.nationality || ""}
            onChange={(e) =>
              updateCVData({
                personalDetails: { ...cvData.personalDetails, nationality: e.target.value },
              })
            }
            className="bg-[#232938] border-gray-700 text-white"
            placeholder="South African"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maritalStatus" className="text-gray-300">
            <Users className="h-4 w-4 inline mr-1" />
            Marital Status
          </Label>
          <Select
            value={cvData.personalDetails.maritalStatus || ""}
            onValueChange={(value) =>
              updateCVData({
                personalDetails: { ...cvData.personalDetails, maritalStatus: value },
              })
            }
          >
            <SelectTrigger className="bg-[#232938] border-gray-700 text-white">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Married">Married</SelectItem>
              <SelectItem value="Divorced">Divorced</SelectItem>
              <SelectItem value="Widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="summary" className="text-gray-300">
            Professional Summary
          </Label>
          <Button
            onClick={handleEnhanceSummary}
            disabled={isEnhancing || !cvData.personalDetails.summary}
            size="sm"
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            AI Enhance
          </Button>
        </div>
        <Textarea
          id="summary"
          value={cvData.personalDetails.summary}
          onChange={(e) =>
            updateCVData({
              personalDetails: { ...cvData.personalDetails, summary: e.target.value },
            })
          }
          className="min-h-[150px] bg-[#232938] border-gray-700 text-white"
          placeholder="Results-driven professional with 5+ years of experience in the South African market..."
        />
        <p className="text-xs text-gray-500">
          Write a brief overview, then use AI Enhance to polish it professionally.
        </p>
      </div>
    </div>
  )
}
