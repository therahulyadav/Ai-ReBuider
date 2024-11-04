import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle, Plus, Minus } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { SpeechInput } from '@/components/ui/speech-input'
import { motion, AnimatePresence } from 'framer-motion'

function Skills() {

    const [skillsList,setSkillsList]=useState([{
        name:'',
        rating:0
    }])
    const {resumeId}=useParams();

    const [loading,setLoading]=useState(false);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
   
    useEffect(()=>{
        resumeInfo&&setSkillsList(resumeInfo?.skills)
    },[])
   
    const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice();
      
        newEntries[index][name]=value;
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:'',
            rating:0 
        }])
    }
    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
    }

    const onSave=()=>{
        setLoading(true);
        const data={
            data:{
                skills:skillsList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId,data)
        .then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated!', {
                style: {
                    background: '#4CAF50',
                    color: 'white',
                },
            })
        },(error)=>{
            setLoading(false);
            toast('Server Error, Try again!', {
                style: {
                    background: '#f44336',
                    color: 'white', 
                },
            })
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='p-4 md:p-5 rounded-lg border border-gray-200 mt-6 bg-white'
        >
            <motion.h2 
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className='font-bold text-lg md:text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent'
            >
                Skills
            </motion.h2>
            <p className='text-gray-600 text-sm md:text-base mb-4'>Add Your top professional key skills</p>

            <AnimatePresence>
                {skillsList.map((item,index)=>(
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className='flex flex-col sm:flex-row gap-4 mb-4 border rounded-lg p-3 md:p-4 hover:border-primary transition-colors duration-300 bg-white'
                    >
                        <div className='flex-1'>
                            <label className='text-xs font-medium text-gray-600 block mb-1'>Name</label>
                            <SpeechInput 
                                className="w-full focus:ring-1 focus:ring-primary/20"
                                defaultValue={item.name}
                                onChange={(e)=>handleChange(index,'name',e.target.value)}
                            />
                        </div>
                        <div className='flex justify-center sm:justify-start items-center'>
                            <Rating 
                                style={{ maxWidth: 100 }} 
                                value={item.rating} 
                                onChange={(v)=>handleChange(index,'rating',v)}
                            />
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            <div className='flex flex-col sm:flex-row justify-between gap-4 mt-6'>
                <div className='flex flex-wrap gap-3'>
                    <Button 
                        variant="outline" 
                        onClick={AddNewSkills} 
                        className="text-primary hover:bg-primary/10 w-full sm:w-auto"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add Skill
                    </Button>
                    <Button 
                        variant="outline" 
                        onClick={RemoveSkills} 
                        className="text-red-500 hover:bg-red-50 w-full sm:w-auto"
                    >
                        <Minus className="w-4 h-4 mr-2" /> Remove
                    </Button>
                </div>
                <Button 
                    disabled={loading} 
                    onClick={()=>onSave()}
                    className="bg-gradient-to-r from-primary to-blue-600 text-white hover:opacity-90 w-full sm:w-auto"
                >
                    {loading ? <LoaderCircle className='animate-spin mr-2' /> : null}
                    {loading ? 'Saving...' : 'Save Changes'}    
                </Button>
            </div>
        </motion.div>
    )
}

export default Skills