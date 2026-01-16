import type { CVData } from "@/lib/types"
import { Mail, Phone, MapPin } from "lucide-react"

export function ElegantTemplate({ data }: { data: CVData }) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-ZA", { year: "numeric", month: "short" })
  }

  return (
    <div className="bg-white text-gray-900 p-12 max-w-[210mm] mx-auto" style={{ minHeight: "297mm" }}>
      {/* Centered Header with Elegant Typography */}
      <div className="text-center mb-8 pb-6 border-b border-gray-300">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3 tracking-tight">
          {data.personalDetails.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {data.personalDetails.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              {data.personalDetails.email}
            </span>
          )}
          {data.personalDetails.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              {data.personalDetails.phone}
            </span>
          )}
          {data.personalDetails.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {data.personalDetails.location}
            </span>
          )}
        </div>
        {(data.personalDetails.idNumber || data.personalDetails.nationality || data.personalDetails.maritalStatus) && (
          <div className="flex justify-center flex-wrap gap-x-3 text-xs text-gray-500 mt-2">
            {data.personalDetails.idNumber && <span>ID: {data.personalDetails.idNumber}</span>}
            {data.personalDetails.nationality && <span>{data.personalDetails.nationality}</span>}
            {data.personalDetails.maritalStatus && <span>{data.personalDetails.maritalStatus}</span>}
          </div>
        )}
      </div>

      {/* Professional Profile */}
      {data.personalDetails.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold text-center text-gray-800 mb-4">Professional Profile</h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">{data.personalDetails.summary}</p>
        </div>
      )}

      {/* Professional Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold text-center text-gray-800 mb-5 relative">
            <span className="bg-white px-4 relative z-10">Professional Experience</span>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-0" />
          </h2>
          <div className="space-y-6">
            {data.workExperience.map((work) => (
              <div key={work.id} className="border-l-2 border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{work.jobTitle}</h3>
                    <p className="text-gray-700 font-medium italic">{work.company}</p>
                    {work.location && <p className="text-sm text-gray-600">{work.location}</p>}
                  </div>
                  <p className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {formatDate(work.startDate)} - {work.current ? "Present" : formatDate(work.endDate)}
                  </p>
                </div>
                {work.description && <p className="text-gray-700 mb-2 leading-relaxed">{work.description}</p>}
                {work.achievements.filter((a) => a).length > 0 && (
                  <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm">
                    {work.achievements
                      .filter((a) => a)
                      .map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold text-center text-gray-800 mb-5 relative">
            <span className="bg-white px-4 relative z-10">Education</span>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-0" />
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-gray-300 pl-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700 italic">{edu.institution}</p>
                    {edu.grade && <p className="text-sm text-gray-600">{edu.grade}</p>}
                  </div>
                  <p className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Languages */}
      {(data.skills.length > 0 || data.languages.length > 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold text-center text-gray-800 mb-5 relative">
            <span className="bg-white px-4 relative z-10">Competencies</span>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-0" />
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {data.skills.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-center">Technical Skills</h3>
                <div className="space-y-2">
                  {data.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex justify-between items-center text-sm border-b border-gray-200 pb-1"
                    >
                      <span className="text-gray-800">{skill.name}</span>
                      <span className="text-gray-600 text-xs">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.languages.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-center">Languages</h3>
                <div className="space-y-2">
                  {data.languages.map((lang) => (
                    <div
                      key={lang.id}
                      className="flex justify-between items-center text-sm border-b border-gray-200 pb-1"
                    >
                      <span className="text-gray-800">{lang.name}</span>
                      <span className="text-gray-600 text-xs">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* References */}
      {data.references.length > 0 && (
        <div>
          <h2 className="text-xl font-serif font-bold text-center text-gray-800 mb-5 relative">
            <span className="bg-white px-4 relative z-10">References</span>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 -z-0" />
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {data.references.map((ref) => (
              <div key={ref.id} className="text-center">
                <p className="font-semibold text-gray-900">{ref.name}</p>
                <p className="text-sm text-gray-700">{ref.position}</p>
                <p className="text-sm text-gray-700">{ref.company}</p>
                <p className="text-xs text-gray-600 mt-1">{ref.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
