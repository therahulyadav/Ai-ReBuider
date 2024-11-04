import React from 'react';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import PersonalDetailPreview from '@/dashboard/resume/components/preview/PersonalDetailPreview';
import SummeryPreview from '@/dashboard/resume/components/preview/SummeryPreview';
import ExperiencePreview from '@/dashboard/resume/components/preview/ExperiencePreview';
import EducationalPreview from '@/dashboard/resume/components/preview/EducationalPreview';
import SkillsPreview from '@/dashboard/resume/components/preview/SkillsPreview';

// Classic Template (Default)
const ClassicTemplate = ({ resumeInfo }) => {
  return <ResumePreview resumeInfo={resumeInfo} />;
};

// Modern Template
const ModernTemplate = ({ resumeInfo }) => {
  return (
    <div className="p-14 bg-white">
      <div className="flex gap-8">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-50 p-6 rounded-lg">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-2" style={{ color: resumeInfo?.themeColor }}>
              {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h1>
            <p className="text-gray-600 mb-2">{resumeInfo?.jobTitle}</p>
            <hr className="border-t-2 w-16 mx-auto mb-4" style={{ borderColor: resumeInfo?.themeColor }} />
            <p className="text-sm">{resumeInfo?.email}</p>
            <p className="text-sm">{resumeInfo?.phone}</p>
            <p className="text-sm">{resumeInfo?.address}</p>
          </div>
          {resumeInfo?.skills?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4" style={{ color: resumeInfo?.themeColor }}>Skills</h2>
              <div className="space-y-3">
                {resumeInfo.skills.map((skill, index) => (
                  <div key={index}>
                    <p className="text-sm font-medium mb-1">{skill.name}</p>
                    <div className="h-1.5 bg-gray-200 rounded">
                      <div className="h-full rounded" style={{ 
                        width: `${skill.rating * 20}%`,
                        backgroundColor: resumeInfo?.themeColor,
                        border: `1px solid ${resumeInfo?.themeColor}`
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: resumeInfo?.themeColor }}>Professional Summary</h2>
            <div className="text-gray-600">
              <SummeryPreview resumeInfo={resumeInfo} />
            </div>
          </div>

          {resumeInfo?.Experience?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: resumeInfo?.themeColor }}>Experience</h2>
              {resumeInfo.Experience.map((exp, index) => (
                <div key={index} className="mb-4 relative pl-4 border-l-2" style={{ borderColor: resumeInfo?.themeColor }}>
                  <h3 className="font-semibold">{exp.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{exp.companyName} | {exp.startDate} - {exp.endDate || 'Present'}</p>
                  <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
                </div>
              ))}
            </div>
          )}

          {resumeInfo?.education?.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: resumeInfo?.themeColor }}>Education</h2>
              {resumeInfo.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{edu.universityName}</h3>
                  <p className="text-sm text-gray-600">{edu.degree} in {edu.major}</p>
                  <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Creative Template
const CreativeTemplate = ({ resumeInfo }) => {
  return (
    <div className="p-14 bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          <span style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.firstName}</span>
          <span className="mx-2">|</span>
          <span>{resumeInfo?.lastName}</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4">{resumeInfo?.jobTitle}</p>
        <div className="flex justify-center gap-6 text-sm">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {resumeInfo?.email}
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {resumeInfo?.phone}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 flex-grow rounded" style={{ backgroundColor: resumeInfo?.themeColor }}></div>
              <h2 className="text-2xl font-bold whitespace-nowrap">Professional Summary</h2>
              <div className="h-1 flex-grow rounded" style={{ backgroundColor: resumeInfo?.themeColor }}></div>
            </div>
            <div className="text-gray-600">
              <SummeryPreview resumeInfo={resumeInfo} />
            </div>
          </div>

          {resumeInfo?.Experience?.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 flex-grow rounded" style={{ backgroundColor: resumeInfo?.themeColor }}></div>
                <h2 className="text-2xl font-bold whitespace-nowrap">Experience</h2>
                <div className="h-1 flex-grow rounded" style={{ backgroundColor: resumeInfo?.themeColor }}></div>
              </div>
              {resumeInfo.Experience.map((exp, index) => (
                <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: resumeInfo?.themeColor }}>{exp.title}</h3>
                    <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{exp.companyName}</p>
                  <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-4">
          {resumeInfo?.skills?.length > 0 && (
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4" style={{ color: resumeInfo?.themeColor }}>Skills</h2>
              <div className="space-y-4">
                {resumeInfo.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-gray-500">{skill.rating * 20}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-full rounded-full" style={{ 
                        width: `${skill.rating * 20}%`,
                        backgroundColor: resumeInfo?.themeColor,
                        border: `1px solid ${resumeInfo?.themeColor}`
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resumeInfo?.education?.length > 0 && (
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4" style={{ color: resumeInfo?.themeColor }}>Education</h2>
              {resumeInfo.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{edu.universityName}</h3>
                  <p className="text-sm text-gray-600">{edu.degree} in {edu.major}</p>
                  <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const ProfessionalTemplate = ({ resumeInfo }) => {
    return (
      <div className="p-8 bg-white">
        <div className="border-b-4 pb-4 mb-6" style={{ borderColor: resumeInfo?.themeColor }}>
          <h1 className="text-4xl font-bold text-center">{resumeInfo?.firstName} {resumeInfo?.lastName}</h1>
          <p className="text-xl text-center mt-2" style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.jobTitle}</p>
          <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
            <span>{resumeInfo?.email}</span>
            <span>•</span>
            <span>{resumeInfo?.phone}</span>
            <span>•</span>
            <span>{resumeInfo?.address}</span>
          </div>
        </div>
  
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: resumeInfo?.themeColor }}>Professional Summary</h2>
              <div className="text-gray-700">
                <SummeryPreview resumeInfo={resumeInfo} />
              </div>
            </div>
  
            {resumeInfo?.Experience?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: resumeInfo?.themeColor }}>Experience</h2>
                <div className="space-y-4">
                  {resumeInfo.Experience.map((exp, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{exp.title}</h3>
                        <span className="text-sm text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                      </div>
                      <p className="text-sm text-gray-600">{exp.companyName}</p>
                      <div className="mt-2 text-sm" dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
  
          <div className="col-span-1 space-y-6">
            {resumeInfo?.skills?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: resumeInfo?.themeColor }}>Skills</h2>
                <div className="space-y-2">
                  {resumeInfo.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${skill.rating * 20}%`,
                            backgroundColor: resumeInfo?.themeColor,
                            border: `1px solid ${resumeInfo?.themeColor}`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
  
            {resumeInfo?.education?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3" style={{ color: resumeInfo?.themeColor }}>Education</h2>
                <div className="space-y-3">
                  {resumeInfo.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="font-semibold">{edu.universityName}</h3>
                      <p className="text-sm text-gray-600">{edu.degree} in {edu.major}</p>
                      <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  const MinimalTemplate = ({ resumeInfo }) => {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{resumeInfo?.firstName} {resumeInfo?.lastName}</h1>
          <p className="text-lg mb-2" style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.jobTitle}</p>
          <div className="flex justify-center gap-4 text-sm text-gray-600">
            <span>{resumeInfo?.email}</span>
            <span>•</span>
            <span>{resumeInfo?.phone}</span>
            <span>•</span>
            <span>{resumeInfo?.address}</span>
          </div>
        </div>
  
        <div className="mb-6">
          <SummeryPreview resumeInfo={resumeInfo} />
        </div>
  
        {resumeInfo?.Experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 pb-1 border-b" style={{ borderColor: resumeInfo?.themeColor }}>
              Experience
            </h2>
            {resumeInfo.Experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-sm text-gray-600">{exp.companyName}</p>
                <div className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
              </div>
            ))}
          </div>
        )}
  
        <div className="grid grid-cols-2 gap-6">
          {resumeInfo?.education?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3 pb-1 border-b" style={{ borderColor: resumeInfo?.themeColor }}>
                Education
              </h2>
              {resumeInfo.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-medium">{edu.universityName}</h3>
                  <p className="text-sm text-gray-600">{edu.degree} in {edu.major}</p>
                  <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
  
          {resumeInfo?.skills?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3 pb-1 border-b" style={{ borderColor: resumeInfo?.themeColor }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resumeInfo.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-sm rounded-full"
                    style={{ 
                      backgroundColor: `${resumeInfo?.themeColor}20`,
                      color: resumeInfo?.themeColor
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
// Export all templates
export const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate
}; 