import type { CVData } from "@/lib/types"
import { Mail, Phone, MapPin, Award as IdCard, Flag, Users } from "lucide-react"

export function ModernTemplate({ data }: { data: CVData }) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-ZA", { year: "numeric", month: "short" })
  }

  return (
    <div
      className="bg-white text-gray-900 shadow-lg max-w-[210mm] mx-auto print:shadow-none print:mx-0 print:max-w-full print:min-h-full"
      style={{ minHeight: "297mm" }}
    >
      <div className="p-8 print:p-12">
        {/* Header */}
        <div className="border-b-4 border-[#E86B5F] pb-6 mb-6 print:break-inside-avoid">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{data.personalDetails.fullName || "Your Name"}</h1>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
            {data.personalDetails.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{data.personalDetails.email}</span>
              </div>
            )}
            {data.personalDetails.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{data.personalDetails.phone}</span>
              </div>
            )}
            {data.personalDetails.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{data.personalDetails.location}</span>
              </div>
            )}
            {data.personalDetails.idNumber && (
              <div className="flex items-center gap-2">
                <IdCard className="h-4 w-4 flex-shrink-0" />
                <span>ID: {data.personalDetails.idNumber}</span>
              </div>
            )}
            {data.personalDetails.nationality && (
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 flex-shrink-0" />
                <span>{data.personalDetails.nationality}</span>
              </div>
            )}
            {data.personalDetails.maritalStatus && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 flex-shrink-0" />
                <span>{data.personalDetails.maritalStatus}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {data.personalDetails.summary && (
          <div className="mb-6 print:break-inside-avoid">
            <h2 className="text-xl font-bold text-[#E86B5F] mb-3 uppercase tracking-wide">Professional Summary</h2>
            <p className="text-gray-800 leading-relaxed text-justify">{data.personalDetails.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#E86B5F] mb-4 uppercase tracking-wide print:break-after-avoid">
              Work Experience
            </h2>
            <div className="space-y-5">
              {data.workExperience.map((work, i) => (
                <div key={work.id ?? `${work.company || 'company'}-${work.startDate || 'start'}-${i}`} className="print:break-inside-avoid">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{work.jobTitle}</h3>
                      <p className="text-gray-700 font-medium">{work.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600 ml-4">
                      <p className="font-medium">
                        {formatDate(work.startDate)} - {work.current ? "Present" : formatDate(work.endDate)}
                      </p>
                      {work.location && <p>{work.location}</p>}
                    </div>
                  </div>
                  {work.description && <p className="text-gray-700 text-sm mb-2 leading-relaxed">{work.description}</p>}
                  {work.achievements.filter((a) => a).length > 0 && (
                    <ul className="list-disc list-outside ml-5 text-sm text-gray-700 space-y-1.5 leading-relaxed">
                      {work.achievements
                        .filter((a) => a)
                        .map((achievement, idx) => (
                          <li key={`${idx}-${achievement}`} className="pl-1">
                            {achievement}
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
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#E86B5F] mb-4 uppercase tracking-wide print:break-after-avoid">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={edu.id ?? `${edu.institution || 'inst'}-${edu.degree || 'degree'}-${i}`} className="print:break-inside-avoid">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600 ml-4">
                      <p className="font-medium">
                        {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                      </p>
                      {edu.location && <p>{edu.location}</p>}
                    </div>
                  </div>
                  {edu.grade && <p className="text-sm text-gray-700 mb-2">Grade: {edu.grade}</p>}
                  {edu.achievements.filter((a) => a).length > 0 && (
                    <ul className="list-disc list-outside ml-5 text-sm text-gray-700 space-y-1 leading-relaxed">
                      {edu.achievements
                        .filter((a) => a)
                        .map((achievement, idx) => (
                          <li key={`${idx}-${achievement}`} className="pl-1">
                            {achievement}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Languages */}
        {(data.skills.length > 0 || data.languages.length > 0) && (
          <div className="grid grid-cols-2 gap-6 mb-6">
            {data.skills.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#E86B5F] mb-3 uppercase tracking-wide print:break-after-avoid">Skills</h2>
                <div className="space-y-2">
                  {data.skills.map((skill, i) => (
                    <div key={skill.id ?? `${skill.name || 'skill'}-${skill.level || 'level'}-${i}`} className="flex justify-between items-center print:break-inside-avoid">
                      <span className="text-gray-900 font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.languages.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#E86B5F] mb-3 uppercase tracking-wide print:break-after-avoid">Languages</h2>
                <div className="space-y-2">
                  {data.languages.map((lang, i) => (
                    <div key={lang.id ?? `${lang.name || 'lang'}-${lang.proficiency || 'prof'}-${i}`} className="flex justify-between items-center print:break-inside-avoid">
                      <span className="text-gray-900 font-medium">{lang.name}</span>
                      <span className="text-sm text-gray-600">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* References */}
        {data.references.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#E86B5F] mb-3 uppercase tracking-wide print:break-after-avoid">References</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.references.map((ref, i) => (
                <div key={ref.id ?? `${ref.name || 'ref'}-${ref.company || 'company'}-${i}`} className="text-sm print:break-inside-avoid">
                  <p className="font-bold text-gray-900">{ref.name}</p>
                  <p className="text-gray-700">{ref.position}</p>
                  <p className="text-gray-700">{ref.company}</p>
                  <p className="text-gray-600 text-xs mt-1">{ref.email}</p>
                  <p className="text-gray-600 text-xs">{ref.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
