import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

function ThemeColor() {
    const colors=[
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ]

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [selectedColor,setSelectedColor]=useState();
    const {resumeId}=useParams();
    
    const onColorSelect=(color)=>{
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor:color
        });
        const data={
            data:{
                themeColor:color
            }
        }
        GlobalApi.UpdateResumeDetail(resumeId,data).then(resp=>{
            console.log(resp);
            toast('Theme Color Updated', {
              style: { background: color, color: '#fff' }
            })
        })
    }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline" 
            size="sm" 
            className="flex gap-2 transition-all duration-300 hover:shadow-lg"
          >
            <LayoutGrid className="animate-pulse"/> 
            Theme
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="backdrop-blur-sm bg-white/90">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-4 text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'
        >
          Select Theme Color
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='grid grid-cols-5 gap-3'
        >
          {colors.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2, rotate: 180 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => onColorSelect(item)}
              className={`h-6 w-6 rounded-full cursor-pointer
                transition-all duration-300
                hover:shadow-lg hover:shadow-${item}/50
                ${selectedColor === item ? 'ring-2 ring-offset-2' : 'hover:ring-1'}
              `}
              style={{
                background: item,
                transform: `rotate(${selectedColor === item ? '360deg' : '0deg'})`,
                transition: 'transform 0.6s ease'
              }}
            />
          ))}
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeColor