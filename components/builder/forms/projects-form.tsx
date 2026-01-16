"use client"
import { FolderOpen } from "lucide-react"

export function ProjectsForm() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <FolderOpen className="h-6 w-6 text-accent" />
          Projects
        </h2>
        <p className="text-gray-400 text-sm">Showcase your portfolio and notable projects</p>
      </div>

      <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg">
        <FolderOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400 mb-2">Projects section coming soon</p>
        <p className="text-sm text-gray-500">This feature will allow you to add portfolio projects and notable work</p>
      </div>
    </div>
  )
}
