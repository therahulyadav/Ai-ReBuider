import { Button } from '@/components/ui/button'
import { SpeechInput } from '@/components/ui/speech-input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

function PersonalDetail({enabledNext}) {

    const params=useParams();
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

    const [formData,setFormData]=useState();
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        console.log("---",resumeInfo)
    },[])

    const handleInputChange=(e)=>{
        enabledNext(false)
        const {name,value}=e.target;

        setFormData({
            ...formData,
            [name]:value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true)
        const data={
            data:formData
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
          Personal Detail
        </motion.h2>
        <p className='text-gray-600 text-sm md:text-base'>Get Started with the basic information</p>

        <form onSubmit={onSave}>
            <motion.div 
              className='grid grid-cols-1 md:grid-cols-2 mt-4 gap-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
                <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-1.5"
                    >
                        <label className='text-sm font-medium text-gray-700'>First Name</label>
                        <SpeechInput 
                            name="firstName" 
                            defaultValue={resumeInfo?.firstName} 
                            required 
                            onChange={handleInputChange}
                            className="w-full focus:ring-1 focus:ring-primary/20" 
                        />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-1.5"
                    >
                        <label className='text-sm font-medium text-gray-700'>Last Name</label>
                        <SpeechInput 
                            name="lastName" 
                            defaultValue={resumeInfo?.lastName} 
                            required 
                            onChange={handleInputChange}
                            className="w-full focus:ring-1 focus:ring-primary/20"
                        />
                    </motion.div>
                    <motion.div 
                      className='col-span-1 md:col-span-2 space-y-1.5'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                        <label className='text-sm font-medium text-gray-700'>Job Title</label>
                        <SpeechInput 
                            name="jobTitle" 
                            defaultValue={resumeInfo?.jobTitle} 
                            required 
                            onChange={handleInputChange}
                            className="w-full focus:ring-1 focus:ring-primary/20"
                        />
                    </motion.div>
                    <motion.div 
                      className='col-span-1 md:col-span-2 space-y-1.5'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                        <label className='text-sm font-medium text-gray-700'>Address</label>
                        <SpeechInput 
                            name="address" 
                            defaultValue={resumeInfo?.address} 
                            required 
                            onChange={handleInputChange}
                            className="w-full focus:ring-1 focus:ring-primary/20"
                        />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="space-y-1.5"
                    >
                        <label className='text-sm font-medium text-gray-700'>Phone</label>
                        <SpeechInput 
                            name="phone" 
                            defaultValue={resumeInfo?.phone} 
                            required 
                            onChange={handleInputChange}
                            className="w-full focus:ring-1 focus:ring-primary/20"
                        />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-1.5"
                    >
                        <label className='text-sm font-medium text-gray-700'>Email</label>
                        <SpeechInput 
                            name="email" 
                            defaultValue={resumeInfo?.email} 
                            required 
                            onChange={handleInputChange}
                            className="w-full focus:ring-1 focus:ring-primary/20"
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>
            <motion.div 
              className='mt-6 flex justify-end'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white transition-colors duration-300"
                >
                    {loading ? 
                      <LoaderCircle className='animate-spin' /> : 
                      <span className="flex items-center gap-2">Save Changes</span>
                    }
                </Button>
            </motion.div>
        </form>
    </motion.div>
  )
}

export default PersonalDetail