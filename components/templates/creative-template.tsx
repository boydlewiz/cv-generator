import type { CVData } from "@/lib/types"
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react"

export function CreativeTemplate({ data }: { data: CVData }) {
  const formatDate = (date: string) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-ZA", { year: "numeric", month: "short" })
  }

  return (
    <div className="bg-white text-gray-900 shadow-lg max-w-[210mm] mx-auto flex print:shadow-none print:mx-0 print:max-w-full print:min-h-full" style={{ minHeight: "297mm" }}>
      {/* Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
        <div className="mb-8">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold mb-4">
            {(data.personalDetails.fullName || "YN")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <h1 className="text-2xl font-bold mb-2">{data.personalDetails.fullName || "Your Name"}</h1>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-2">Contact</h2>
          <div className="space-y-2 text-sm">
            {data.personalDetails.email && (
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{data.personalDetails.email}</span>
              </div>
            )}
            {data.personalDetails.phone && (
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{data.personalDetails.phone}</span>
              </div>
            )}
            {data.personalDetails.location && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{data.personalDetails.location}</span>
              </div>
            )}
            {data.personalDetails.linkedIn && (
              <div className="flex items-start gap-2">
                <Linkedin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{data.personalDetails.linkedIn}</span>
              </div>
            )}
            {data.personalDetails.portfolio && (
              <div className="flex items-start gap-2">
                <Globe className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{data.personalDetails.portfolio}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-2">Skills</h2>
            <div className="space-y-3">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <p className="text-sm font-medium mb-1">{skill.name}</p>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white rounded-full h-2 transition-all"
                      style={{
                        width:
                          skill.level === "Expert"
                            ? "100%"
                            : skill.level === "Advanced"
                              ? "75%"
                              : skill.level === "Intermediate"
                                ? "50%"
                                : "25%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-2">Languages</h2>
            <div className="space-y-2 text-sm">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-white/80">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Professional Summary */}
        {data.personalDetails.summary && (
          <div className="mb-6 print:break-inside-avoid">
            <h2 className="text-xl font-bold text-purple-600 mb-3 print:break-after-avoid">About Me</h2>
            <p className="text-gray-700 leading-relaxed">{data.personalDetails.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-purple-600 mb-3 print:break-after-avoid">Experience</h2>
            <div className="space-y-4">
              {data.workExperience.map((work) => (
                <div key={work.id} className="relative pl-6 border-l-2 border-purple-300 print:break-inside-avoid">
                  <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[7px] top-1" />
                  <div className="mb-1">
                    <h3 className="font-bold text-gray-900">{work.jobTitle}</h3>
                    <p className="text-purple-600 font-medium">{work.company}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(work.startDate)} - {work.current ? "Present" : formatDate(work.endDate)}
                    </p>
                  </div>
                  {work.description && <p className="text-gray-700 text-sm mb-2">{work.description}</p>}
                  {work.achievements.filter((a) => a).length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
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
          <div className="mb-6">
            <h2 className="text-xl font-bold text-purple-600 mb-3 print:break-after-avoid">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="relative pl-6 border-l-2 border-purple-300 print:break-inside-avoid">
                  <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[7px] top-1" />
                  <div className="mb-1">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-purple-600 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                    </p>
                  </div>
                  {edu.grade && <p className="text-sm text-gray-700">Grade: {edu.grade}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {data.references.length > 0 && (
          <div className="print:break-inside-avoid">
            <h2 className="text-xl font-bold text-purple-600 mb-3 print:break-after-avoid">References</h2>
            <div className="grid grid-cols-1 gap-4">
              {data.references.map((ref) => (
                <div key={ref.id} className="text-sm bg-gray-50 p-3 rounded print:break-inside-avoid">
                  <p className="font-bold text-gray-900">{ref.name}</p>
                  <p className="text-gray-700">{ref.position}</p>
                  <p className="text-gray-700">{ref.company}</p>
                  <p className="text-gray-600">{ref.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
