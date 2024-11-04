import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle, Plus, Minus } from 'lucide-react'
import { SpeechInput } from '@/components/ui/speech-input'
import { motion, AnimatePresence } from 'framer-motion'

const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummery:'',
}

function Experience() {
    const [experinceList,setExperinceList]=useState([]);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const params=useParams();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        resumeInfo?.Experience.length>0&&setExperinceList(resumeInfo?.Experience)
    },[])

    const handleChange = (index, event) => {
        const newEntries = experinceList.slice();
        const name = event.target.name;
        const value = event.target.value;
        
        newEntries[index][name] = value;
        setExperinceList(newEntries);
    };

    const AddNewExperience=()=>{
        setExperinceList([...experinceList,{
            title:'',
            companyName:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummery:'',
        }])
    }

    const RemoveExperience=()=>{
        setExperinceList(experinceList=>experinceList.slice(0,-1))
    }

    const handleRichTextEditor=(e,name,index)=>{
        const newEntries=experinceList.slice();
        newEntries[index][name]=e.target.value;
        setExperinceList(newEntries);
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            Experience:experinceList
        });
    },[experinceList]);

    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                Experience:experinceList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
            setLoading(false);
            toast('Details updated !', {
                style: { background: '#4CAF50', color: 'white' }
            })
        },(error)=>{
            setLoading(false);
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='p-3 md:p-5 rounded-lg border-t-primary border-t-2 mt-6 md:mt-10 bg-white/80 backdrop-blur-sm'>
                <h2 className='font-bold text-xl md:text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent'>Professional Experience</h2>
                <p className='text-gray-600 text-sm md:text-base'>Add Your previous Job experience</p>
                <AnimatePresence>
                    {experinceList.map((item,index)=>(
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 border p-3 md:p-5 my-4 md:my-5 rounded-lg bg-white'>
                                <div>
                                    <label className='text-sm font-medium text-gray-600'>Position Title</label>
                                    <SpeechInput 
                                        name="title" 
                                        onChange={(e) => handleChange(index, e)}
                                        defaultValue={item?.title}
                                        className="focus:ring-1 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className='text-sm font-medium text-gray-600'>Company Name</label>
                                    <SpeechInput 
                                        name="companyName" 
                                        onChange={(e) => handleChange(index, e)}
                                        defaultValue={item?.companyName}
                                        className="focus:ring-1 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className='text-sm font-medium text-gray-600'>City</label>
                                    <SpeechInput 
                                        name="city" 
                                        onChange={(e) => handleChange(index, e)}
                                        defaultValue={item?.city}
                                        className="focus:ring-1 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className='text-sm font-medium text-gray-600'>State</label>
                                    <SpeechInput 
                                        name="state" 
                                        onChange={(e) => handleChange(index, e)}
                                        defaultValue={item?.state}
                                        className="focus:ring-1 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className='text-sm font-medium text-gray-600'>Start Date</label>
                                    <Input 
                                        type="date"  
                                        name="startDate" 
                                        onChange={(e) => handleChange(index, e)} 
                                        defaultValue={item?.startDate}
                                        className="focus:ring-1 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className='text-sm font-medium text-gray-600'>End Date</label>
                                    <Input 
                                        type="date" 
                                        name="endDate" 
                                        onChange={(e) => handleChange(index, e)} 
                                        defaultValue={item?.endDate}
                                        className="focus:ring-1 focus:ring-primary/20"
                                    />
                                </div>
                                <div className='col-span-1 md:col-span-2'>
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={item?.workSummery}
                                        onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummery', index)}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className='flex flex-col sm:flex-row justify-between gap-4 mt-6'>
                    <div className='flex flex-wrap gap-3'>
                        <Button variant="outline" onClick={AddNewExperience} className="text-primary hover:bg-primary/10 w-full sm:w-auto">
                            <Plus className="w-4 h-4 mr-2" /> Add Experience
                        </Button>
                        <Button variant="outline" onClick={RemoveExperience} className="text-red-500 hover:bg-red-50 w-full sm:w-auto">
                            <Minus className="w-4 h-4 mr-2" /> Remove
                        </Button>
                    </div>
                    <Button 
                        disabled={loading} 
                        onClick={onSave}
                        className="bg-gradient-to-r from-primary to-blue-600 text-white hover:opacity-90 w-full sm:w-auto"
                    >
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save Changes'}    
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

export default Experience