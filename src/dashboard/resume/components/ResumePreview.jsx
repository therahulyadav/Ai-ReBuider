import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import { motion } from 'framer-motion'

function ResumePreview() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='shadow-2xl h-full p-14 border-t-[20px] bg-white/95 backdrop-blur-sm rounded-lg transition-all duration-300 hover:shadow-3xl'
            style={{
                borderColor: resumeInfo?.themeColor,
                background: `linear-gradient(to bottom right, white, ${resumeInfo?.themeColor}05)`
            }}
        >
            <motion.div variants={itemVariants}>
                <PersonalDetailPreview resumeInfo={resumeInfo} />
            </motion.div>

            <motion.div variants={itemVariants}>
                <SummeryPreview resumeInfo={resumeInfo} />
            </motion.div>

            {resumeInfo?.Experience?.length > 0 && (
                <motion.div variants={itemVariants}>
                    <ExperiencePreview resumeInfo={resumeInfo} />
                </motion.div>
            )}

            {resumeInfo?.education?.length > 0 && (
                <motion.div variants={itemVariants}>
                    <EducationalPreview resumeInfo={resumeInfo} />
                </motion.div>
            )}

            {resumeInfo?.skills?.length > 0 && (
                <motion.div variants={itemVariants}>
                    <SkillsPreview resumeInfo={resumeInfo} />
                </motion.div>
            )}
        </motion.div>
    )
}

export default ResumePreview