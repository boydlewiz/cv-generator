"use client"

import { useCV } from "@/lib/cv-context"
import type { Reference } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

export function ReferencesForm() {
  const { cvData, updateCVData } = useCV()

  const addReference = () => {
    const newReference: Reference = {
      id: `ref-${Date.now()}`,
      name: "",
      position: "",
      company: "",
      email: "",
      phone: "",
    }
    updateCVData({
      references: [...cvData.references, newReference],
    })
  }

  const updateReference = (id: string, updates: Partial<Reference>) => {
    updateCVData({
      references: cvData.references.map((ref) => (ref.id === id ? { ...ref, ...updates } : ref)),
    })
  }

  const deleteReference = (id: string) => {
    updateCVData({
      references: cvData.references.filter((ref) => ref.id !== id),
    })
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl">References</CardTitle>
        <CardDescription>Add professional references (optional but recommended)</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {cvData.references.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-4">No references added yet</p>
            <Button onClick={addReference}>
              <Plus className="h-4 w-4 mr-2" />
              Add Reference
            </Button>
          </div>
        )}

        {cvData.references.map((reference, index) => (
          <Card key={reference.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{reference.name || `Reference ${index + 1}`}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteReference(reference.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    placeholder="Jane Smith"
                    value={reference.name}
                    onChange={(e) => updateReference(reference.id, { name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position / Title *</Label>
                  <Input
                    placeholder="Senior Manager"
                    value={reference.position}
                    onChange={(e) => updateReference(reference.id, { position: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Company *</Label>
                <Input
                  placeholder="Company Name"
                  value={reference.company}
                  onChange={(e) => updateReference(reference.id, { company: e.target.value })}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="jane@company.com"
                    value={reference.email}
                    onChange={(e) => updateReference(reference.id, { email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input
                    type="tel"
                    placeholder="+27 82 123 4567"
                    value={reference.phone}
                    onChange={(e) => updateReference(reference.id, { phone: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {cvData.references.length > 0 && (
          <Button onClick={addReference} variant="outline" className="w-full bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Reference
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
