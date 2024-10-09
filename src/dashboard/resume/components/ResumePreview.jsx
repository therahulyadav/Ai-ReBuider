import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

function ResumePreview() {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const style2 = {
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
        height: "100%",
        padding: "3.5rem",
        borderTop: "20px solid #000"
      };
    const style1 ={
        borderColor:resumeInfo?.themeColor
    }
  return (
    <div 
    style={{ ...style1, ...style2 }}>
        {/* Personal Detail  */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />
        {/* Summery  */}
            <SummeryPreview resumeInfo={resumeInfo} />
        {/* Professional Experience  */}
           {resumeInfo?.Experience?.length>0&& <ExperiencePreview resumeInfo={resumeInfo} />}
        {/* Educational  */}
        {resumeInfo?.education?.length>0&&   <EducationalPreview resumeInfo={resumeInfo} />}
        {/* Skilss  */}
        {resumeInfo?.skills?.length>0&&    <SkillsPreview resumeInfo={resumeInfo}/>}
    </div>
  )
}

export default ResumePreview