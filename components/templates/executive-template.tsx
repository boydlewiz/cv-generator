import type { CVData } from "@/lib/types"
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react"

export function ExecutiveTemplate({ data }: { data: CVData }) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-ZA", { year: "numeric", month: "short" })
  }

  return (
    <div className="bg-white text-gray-900 p-10 shadow-lg max-w-[210mm] mx-auto" style={{ minHeight: "297mm" }}>
      {/* Header with Gold Accent */}
      <div className="mb-8">
        <div className="border-b-4 border-amber-600 pb-4 mb-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {data.personalDetails.fullName || "Your Name"}
          </h1>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          {data.personalDetails.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="h-4 w-4 text-amber-700" />
              <span>{data.personalDetails.email}</span>
            </div>
          )}
          {data.personalDetails.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-amber-700" />
              <span>{data.personalDetails.phone}</span>
            </div>
          )}
          {data.personalDetails.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-amber-700" />
              <span>{data.personalDetails.location}</span>
            </div>
          )}
          {data.personalDetails.linkedIn && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="h-4 w-4 text-amber-700" />
              <span>{data.personalDetails.linkedIn}</span>
            </div>
          )}
          {data.personalDetails.portfolio && (
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-amber-700" />
              <span>{data.personalDetails.portfolio}</span>
            </div>
          )}
        </div>
      </div>

      {/* Executive Summary */}
      {data.personalDetails.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-amber-600 mr-3" />
            Executive Summary
          </h2>
          <p className="text-gray-800 leading-relaxed text-lg">{data.personalDetails.summary}</p>
        </div>
      )}

      {/* Professional Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-amber-600 mr-3" />
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.workExperience.map((work, i) => (
              <div key={work.id ?? `${work.company || 'company'}-${work.startDate || 'start'}-${i}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{work.jobTitle}</h3>
                    <p className="text-amber-700 font-semibold">{work.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-700">
                      {formatDate(work.startDate)} - {work.current ? "Present" : formatDate(work.endDate)}
                    </p>
                    {work.location && <p className="text-sm text-gray-600">{work.location}</p>}
                  </div>
                </div>
                {work.description && <p className="text-gray-800 mb-3 leading-relaxed">{work.description}</p>}
                {work.achievements.filter((a) => a).length > 0 && (
                  <ul className="space-y-2 text-gray-800">
                    {work.achievements
                      .filter((a) => a)
                      .map((achievement, idx) => (
                        <li key={`${idx}-${achievement}`} className="flex gap-3">
                          <span className="text-amber-600 font-bold mt-1">▸</span>
                          <span>{achievement}</span>
                        </li>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-amber-600 mr-3" />
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={edu.id ?? `${edu.institution || 'inst'}-${edu.degree || 'degree'}-${i}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-amber-700 font-semibold">{edu.institution}</p>
                    {edu.grade && <p className="text-gray-700">Grade: {edu.grade}</p>}
                  </div>
                  <p className="font-medium text-gray-700">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-amber-600 mr-3" />
            Core Competencies
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {data.skills.length > 0 && (
              <div className="col-span-2">
                <h3 className="font-bold text-gray-900 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, i) => (
                    <span
                      key={skill.id ?? `${skill.name || 'skill'}-${(skill as any).level || 'level'}-${i}`}
                      className="px-3 py-1 bg-amber-50 border border-amber-200 text-gray-800 text-sm rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.languages.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Languages</h3>
                <div className="space-y-1 text-sm">
                  {data.languages.map((lang, i) => (
                    <div key={lang.id ?? `${lang.name || 'lang'}-${lang.proficiency || 'prof'}-${i}`}>
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-gray-600"> - {lang.proficiency}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-amber-600 mr-3" />
            References
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {data.references.map((ref, i) => (
              <div key={ref.id ?? `${ref.name || 'ref'}-${ref.company || 'company'}-${i}`} className="border-l-2 border-amber-600 pl-4">
                <p className="font-bold text-gray-900 text-lg">{ref.name}</p>
                <p className="text-gray-700 font-medium">{ref.position}</p>
                <p className="text-gray-700">{ref.company}</p>
                <p className="text-sm text-gray-600 mt-2">{ref.email}</p>
                <p className="text-sm text-gray-600">{ref.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
