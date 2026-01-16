import type { CVData } from "@/lib/types"
import { Mail, Phone, MapPin } from "lucide-react"

export function CorporateTemplate({ data }: { data: CVData }) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-ZA", { year: "numeric", month: "short" })
  }

  return (
    <div className="bg-white text-gray-900 max-w-[210mm] mx-auto" style={{ minHeight: "297mm" }}>
      {/* Header with Navy Background */}
      <div className="bg-slate-800 text-white p-8">
        <h1 className="text-3xl font-bold mb-3">{data.personalDetails.fullName || "Your Name"}</h1>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {data.personalDetails.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{data.personalDetails.email}</span>
            </div>
          )}
          {data.personalDetails.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{data.personalDetails.phone}</span>
            </div>
          )}
          {data.personalDetails.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{data.personalDetails.location}</span>
            </div>
          )}
          {data.personalDetails.idNumber && (
            <div>
              <span className="opacity-80">ID:</span> {data.personalDetails.idNumber}
            </div>
          )}
          {data.personalDetails.nationality && (
            <div>
              <span className="opacity-80">Nationality:</span> {data.personalDetails.nationality}
            </div>
          )}
          {data.personalDetails.maritalStatus && (
            <div>
              <span className="opacity-80">Marital Status:</span> {data.personalDetails.maritalStatus}
            </div>
          )}
        </div>
      </div>

      <div className="p-10">
        {/* Professional Summary */}
        {data.personalDetails.summary && (
          <div className="mb-7">
            <h2 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-300">
              Professional Summary
            </h2>
            <p className="text-gray-800 leading-relaxed">{data.personalDetails.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-7">
            <h2 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-300 print:break-after-avoid">Work Experience</h2>
            <div className="space-y-5">
              {data.workExperience.map((work) => (
                <div key={work.id} className="print:break-inside-avoid">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{work.jobTitle}</h3>
                      <p className="text-slate-700 font-medium">{work.company}</p>
                      {work.location && <p className="text-sm text-gray-600">{work.location}</p>}
                    </div>
                    <p className="text-sm text-gray-700 font-medium whitespace-nowrap ml-4">
                      {formatDate(work.startDate)} - {work.current ? "Present" : formatDate(work.endDate)}
                    </p>
                  </div>
                  {work.description && <p className="text-gray-800 mb-2">{work.description}</p>}
                  {work.achievements.filter((a) => a).length > 0 && (
                    <ul className="list-disc ml-5 space-y-1 text-gray-800 text-sm">
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
          <div className="mb-7">
            <h2 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-300 print:break-after-avoid">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="print:break-inside-avoid">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-slate-700">{edu.institution}</p>
                      {edu.grade && <p className="text-gray-600">{edu.grade}</p>}
                    </div>
                    <p className="text-sm text-gray-700 font-medium whitespace-nowrap ml-4">
                      {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Languages Grid */}
        <div className="grid grid-cols-2 gap-6 mb-7">
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-300 print:break-after-avoid">Skills</h2>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center print:break-inside-avoid">
                    <span className="text-gray-800">{skill.name}</span>
                    <span className="text-sm text-gray-600 bg-slate-100 px-2 py-0.5 rounded">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-300 print:break-after-avoid">Languages</h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center print:break-inside-avoid">
                    <span className="text-gray-800">{lang.name}</span>
                    <span className="text-sm text-gray-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* References */}
        {data.references.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-3 pb-2 border-b-2 border-slate-300 print:break-after-avoid">References</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.references.map((ref) => (
                <div key={ref.id} className="bg-slate-50 p-4 rounded print:break-inside-avoid">
                  <p className="font-bold text-gray-900">{ref.name}</p>
                  <p className="text-sm text-gray-700">{ref.position}</p>
                  <p className="text-sm text-gray-700">{ref.company}</p>
                  <p className="text-sm text-gray-600 mt-1">{ref.email}</p>
                  {ref.phone && <p className="text-sm text-gray-600">{ref.phone}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
