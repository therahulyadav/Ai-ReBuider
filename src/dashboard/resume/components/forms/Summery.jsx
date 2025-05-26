import { Button } from '@/components/ui/button'
import { SpeechTextarea } from '@/components/ui/speech-textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';
import { motion, AnimatePresence } from 'framer-motion';

const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"
function Summery({enabledNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summery,setSummery]=useState();
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState();
    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])

    const GenerateSummeryFromAI=async()=>{
        setLoading(true)
        const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result=await AIChatSession.sendMessage(PROMPT);
        console.log(JSON.parse(result.response.text()))
       
        setAiGenerateSummeryList(JSON.parse(result.response.text()))
        setLoading(false);
    }

    const onSave=(e)=>{
        e.preventDefault();
       
        setLoading(true)
        const data={
            data:{
                summery:summery
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details updated", {
                style: {
                    background: '#4CAF50',
                    color: 'white',
                },
            })
        },(error)=>{
            setLoading(false);
        })
    }
    return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-4 md:px-0"
    >
         <motion.div 
            className='p-4 md:p-5 rounded-lg border border-gray-200 mt-6 bg-white'
            whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 300 }}
         >
            <motion.h2 
                className='font-bold text-lg md:text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent'
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
            >
                Summary
            </motion.h2>
            <p className='text-gray-600 text-sm md:text-base'>Add Summary for your job title</p>

            <form className='mt-5 md:mt-7' onSubmit={onSave}>
                <div className='flex flex-col sm:flex-row justify-between gap-3 sm:items-end'>
                    <label className='text-gray-700 font-medium text-sm md:text-base'>Add Summary</label>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button 
                            variant="outline" 
                            onClick={()=>GenerateSummeryFromAI()} 
                            type="button" 
                            size="sm" 
                            className="border-primary text-primary hover:bg-primary/10 transition-colors duration-300 flex gap-2 w-full sm:w-auto"
                        > 
                            <Brain className='h-4 w-4' />  Generate from AI
                        </Button>
                    </motion.div>
                </div>
                <SpeechTextarea 
                    className="mt-3 md:mt-4 focus:ring-1 focus:ring-primary/20" 
                    required
                    value={summery}
                    defaultValue={summery?summery:resumeInfo?.summery}
                    onChange={(e)=>setSummery(e.target.value)}
                />
                <div className='mt-4 flex justify-end'>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button 
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-primary to-blue-600 text-white hover:opacity-90"
                        >
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </motion.div>
                </div>
            </form>
        </motion.div>

        <AnimatePresence>
            {aiGeneratedSummeryList && (
                <motion.div 
                    className='my-4 md:my-5'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className='font-bold text-lg md:text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent'>
                        Suggestions
                    </h2>
                    {aiGeneratedSummeryList.summaries?.map((item,index)=>(
                        <motion.div 
                            key={index} 
                            onClick={()=>setSummery(item?.summary)}
                            className='p-4 md:p-5 my-3 md:my-4 rounded-lg cursor-pointer bg-white border border-gray-200 hover:border-primary/50 transition-all duration-300'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                        >
                            <h2 className='font-bold my-1 text-primary text-sm md:text-base'>Level: {item?.experience_level}</h2>
                            <p className='text-gray-700 text-sm md:text-base'>{item?.summary}</p>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>

    </motion.div>
  )
}

export default Summery