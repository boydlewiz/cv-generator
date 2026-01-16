import type { CVData } from "@/lib/types"
import { Mail, Phone, MapPin } from "lucide-react"

export function SimpleTemplate({ data }: { data: CVData }) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-ZA", { year: "numeric", month: "short" })
  }

  return (
    <div className="bg-white text-gray-900 p-12 max-w-[210mm] mx-auto print:p-12 print:mx-0 print:max-w-full" style={{ minHeight: "297mm" }}>
      {/* Header with Simple Line */}
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalDetails.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700">
          {[
            { key: "location", condition: data.personalDetails.location, content: data.personalDetails.location, icon: MapPin },
            { key: "phone", condition: data.personalDetails.phone, content: data.personalDetails.phone, icon: Phone },
            { key: "email", condition: data.personalDetails.email, content: data.personalDetails.email, icon: Mail },
          ]
            .filter((item) => item.condition)
            .map((item) => {
              const Icon = item.icon
              return (
                <span key={item.key} className="flex items-center gap-1">
                  <Icon className="h-3.5 w-3.5" />
                  {item.content}
                </span>
              )
            })}
        </div>
        {/* South African Personal Details */}
        {(data.personalDetails.idNumber || data.personalDetails.nationality || data.personalDetails.maritalStatus) && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
            {[
              { key: "idNumber", condition: data.personalDetails.idNumber, label: "ID", value: data.personalDetails.idNumber },
              { key: "nationality", condition: data.personalDetails.nationality, label: "Nationality", value: data.personalDetails.nationality },
              { key: "maritalStatus", condition: data.personalDetails.maritalStatus, label: "Marital Status", value: data.personalDetails.maritalStatus },
            ]
              .filter((item) => item.condition)
              .map((item) => (
                <span key={item.key}>
                  {item.label}: {item.value}
                </span>
              ))}
          </div>
        )}
      </div>

      {/* Profile */}
      {data.personalDetails.summary && (
        <div className="mb-6 print:break-inside-avoid">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide print:break-after-avoid">Profile</h2>
          <p className="text-gray-800 leading-relaxed text-sm">{data.personalDetails.summary}</p>
        </div>
      )}

      {/* Qualifications (Education) */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide print:break-after-avoid">Qualifications</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="text-sm print:break-inside-avoid">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{edu.degree}</p>
                    <p className="text-gray-700">{edu.institution}</p>
                    {edu.grade && <p className="text-gray-600 italic">{edu.grade}</p>}
                  </div>
                  <p className="text-gray-700 text-right whitespace-nowrap ml-4">
                    {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide print:break-after-avoid">Experience</h2>
          <div className="space-y-4">
            {data.workExperience.map((work) => (
              <div key={work.id} className="text-sm print:break-inside-avoid">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="font-bold text-gray-900">{work.jobTitle}</p>
                    <p className="text-gray-700 italic">{work.company}</p>
                  </div>
                  <p className="text-gray-700 text-right whitespace-nowrap ml-4">
                    {formatDate(work.startDate)} - {work.current ? "Present" : formatDate(work.endDate)}
                  </p>
                </div>
                {work.location && <p className="text-gray-600 text-xs mb-2">{work.location}</p>}
                {work.description && <p className="text-gray-800 mb-2 leading-relaxed">{work.description}</p>}
                {work.achievements.filter((a) => a).length > 0 && (
                  <ul className="list-disc ml-4 space-y-1 text-gray-800">
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

      {/* Further Details (Skills & Languages) */}
      {(data.skills.length > 0 || data.languages.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">Further Details</h2>
          <div className="text-sm space-y-3">
            {data.skills.length > 0 && (
              <div>
                <p className="font-semibold text-gray-900 mb-1">IT Skills:</p>
                <p className="text-gray-800">{data.skills.map((s) => s.name).join(", ")}</p>
              </div>
            )}
            {data.languages.length > 0 && (
              <div>
                <p className="font-semibold text-gray-900 mb-1">Languages:</p>
                <p className="text-gray-800">{data.languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* References */}
      {data.references.length > 0 && (
        <div className="print:break-inside-avoid">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide print:break-after-avoid">References</h2>
          <div className="text-sm">
            {data.references.map((ref) => (
              <div key={ref.id} className="mb-2 print:break-inside-avoid">
                <p className="font-semibold text-gray-900">{ref.name}</p>
                <p className="text-gray-700">
                  {ref.position} - {ref.company}
                </p>
                <p className="text-gray-600">{ref.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
