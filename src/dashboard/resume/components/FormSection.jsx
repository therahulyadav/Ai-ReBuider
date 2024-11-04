import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';
import { motion, AnimatePresence } from 'framer-motion';

function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(true);
  const {resumeId}=useParams();

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm"
    >
        <motion.div 
          className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-6'
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <div className='flex flex-wrap gap-3 md:gap-5'>
            <Link to={"/dashboard"}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-primary/90 hover:bg-primary transition-colors duration-300 w-full">
                  <Home className="mr-2 h-4 w-4"/>
                  Dashboard
                </Button>
              </motion.div>
            </Link>
            <ThemeColor/>
          </div>
          <div className='flex gap-3'>
            {activeFormIndex>1 && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={()=>setActiveFormIndex(activeFormIndex-1)}
                >
                  <ArrowLeft className="mr-1 h-4 w-4"/> Back
                </Button>
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                disabled={!enableNext}
                className="flex gap-2 bg-primary/90 hover:bg-primary transition-colors duration-300" 
                size="sm"
                onClick={()=>setActiveFormIndex(activeFormIndex+1)}
              >
                Next <ArrowRight className="h-4 w-4"/>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFormIndex}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full max-w-[95vw] md:max-w-none mx-auto"
          >
            {activeFormIndex === 1 ? (
              <PersonalDetail enabledNext={(v)=>setEnableNext(v)} />
            ) : activeFormIndex === 2 ? (
              <Summery enabledNext={(v)=>setEnableNext(v)} />
            ) : activeFormIndex === 3 ? (
              <Experience />
            ) : activeFormIndex === 4 ? (
              <Education/>
            ) : activeFormIndex === 5 ? (
              <Skills/>
            ) : activeFormIndex === 6 ? (
              <Navigate to={'/my-resume/'+resumeId+"/view"}/>
            ) : null}
          </motion.div>
        </AnimatePresence>
    </motion.div>
  )
}

export default FormSection