import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and NO JSON Array) , give me result in HTML tags as li of ul'

function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
    const [value,setValue]=useState(defaultValue);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [loading,setLoading]=useState(false);

    const GenerateSummeryFromAI=async()=>{
      if(!resumeInfo?.Experience[index]?.title) {
        toast('Please Add Position Title');
        return;
      }
      setLoading(true)
      const prompt=PROMPT.replace('{positionTitle}',resumeInfo.Experience[index].title);
      
      const result=await AIChatSession.sendMessage(prompt);
      console.log(result.response.text());
      const resp=result.response.text();
      setValue(resp);
      setLoading(false);
    }
  
    return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/50 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-sm"
    >
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3 md:mb-4'>
        <motion.label 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className='text-sm font-medium text-gray-700'
        >
          Summary
        </motion.label>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="outline" 
            size="sm" 
            onClick={GenerateSummeryFromAI}
            disabled={loading}
            className="w-full sm:w-auto flex gap-2 border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
          >
            {loading ? 
              <LoaderCircle className='animate-spin'/> : 
              <>
                <Brain className='h-4 w-4 animate-pulse'/> 
                <span className="font-medium">Generate with AI</span>
              </>
            }
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg border border-gray-200 hover:border-primary/50 transition-all duration-300"
      >
        <EditorProvider>
          <Editor 
            value={value} 
            onChange={(e)=>{
              setValue(e.target.value);
              onRichTextEditorChange(e)
            }}
            className="min-h-[150px] md:min-h-[200px]"
          >
            <Toolbar className="border-b border-gray-200 p-1.5 md:p-2 bg-gray-50/50 rounded-t-lg overflow-x-auto">
              <motion.div 
                className="flex gap-1 flex-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <BtnBold className="hover:bg-gray-100 rounded p-1"/>
                <BtnItalic className="hover:bg-gray-100 rounded p-1"/>
                <BtnUnderline className="hover:bg-gray-100 rounded p-1"/>
                <BtnStrikeThrough className="hover:bg-gray-100 rounded p-1"/>
                <Separator />
                <BtnNumberedList className="hover:bg-gray-100 rounded p-1"/>
                <BtnBulletList className="hover:bg-gray-100 rounded p-1"/>
                <Separator />
                <BtnLink className="hover:bg-gray-100 rounded p-1"/>
              </motion.div>
            </Toolbar>
          </Editor>
        </EditorProvider>
      </motion.div>
    </motion.div>
  )
}

export default RichTextEditor
