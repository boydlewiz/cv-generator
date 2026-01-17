import type { CVData } from "@/lib/types"
import { Mail, Phone, MapPin, Award as IdCard, Flag, Users } from "lucide-react"

export function ClassicTemplate({ data }: { data: CVData }) {
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
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-6 print:break-inside-avoid">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
            {data.personalDetails.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700">
            {data.personalDetails.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {data.personalDetails.email}
              </span>
            )}
            {data.personalDetails.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {data.personalDetails.phone}
              </span>
            )}
            {data.personalDetails.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {data.personalDetails.location}
              </span>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-2">
            {data.personalDetails.idNumber && (
              <span className="flex items-center gap-1">
                <IdCard className="h-3 w-3" />
                ID: {data.personalDetails.idNumber}
              </span>
            )}
            {data.personalDetails.nationality && (
              <span className="flex items-center gap-1">
                <Flag className="h-3 w-3" />
                {data.personalDetails.nationality}
              </span>
            )}
            {data.personalDetails.maritalStatus && (
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {data.personalDetails.maritalStatus}
              </span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {data.personalDetails.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-800 leading-relaxed text-justify">{data.personalDetails.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1 print:break-after-avoid">
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.workExperience.map((work) => (
                <div key={work.id} className="print:break-inside-avoid">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{work.jobTitle}</h3>
                      <p className="text-gray-800 italic">{work.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-700">
                      <p>
                        {formatDate(work.startDate)} - {work.current ? "Present" : formatDate(work.endDate)}
                      </p>
                    </div>
                  </div>
                  {work.description && <p className="text-gray-800 text-sm mb-2">{work.description}</p>}
                  {work.achievements.filter((a) => a).length > 0 && (
                    <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
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
            <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1 print:break-after-avoid">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="print:break-inside-avoid">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-800 italic">{edu.institution}</p>
                    </div>
                    <div className="text-right text-sm text-gray-700">
                      <p>
                        {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                      </p>
                    </div>
                  </div>
                  {edu.grade && <p className="text-sm text-gray-800">Grade: {edu.grade}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Languages */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1 print:break-after-avoid">Skills</h2>
              <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
                {data.skills.map((skill) => (
                  <li key={skill.id} className="print:break-inside-avoid">
                    {skill.name} ({skill.level})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1 print:break-after-avoid">
                Languages
              </h2>
              <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
                {data.languages.map((lang) => (
                  <li key={lang.id} className="print:break-inside-avoid">
                    {lang.name} ({lang.proficiency})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* References */}
        {data.references.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1 print:break-after-avoid">References</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.references.map((ref) => (
                <div key={ref.id} className="text-sm print:break-inside-avoid">
                  <p className="font-bold text-gray-900">{ref.name}</p>
                  <p className="text-gray-800">{ref.position}</p>
                  <p className="text-gray-800">{ref.company}</p>
                  <p className="text-gray-700">{ref.email}</p>
                  <p className="text-gray-700">{ref.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
