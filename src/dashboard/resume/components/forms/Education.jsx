import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, Mic, Plus, Minus } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

function Education() {

  const [loading,setLoading]=useState(false);
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const params=useParams();
  const [educationalList,setEducationalList]=useState([
    {
      universityName:'',
      degree:'',
      major:'',
      startDate:'',
      endDate:'',
      description:''
    }
  ])
  const [activeRecognition, setActiveRecognition] = useState({ index: null, field: null });

  useEffect(()=>{
    resumeInfo&&setEducationalList(resumeInfo?.education)
  },[])
  const handleChange=(event,index)=>{
    const newEntries=educationalList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setEducationalList(newEntries);
  }

  const AddNewEducation=()=>{
    setEducationalList([...educationalList,
      {
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
      }
    ])
  }
  const RemoveEducation=()=>{
    setEducationalList(educationalList=>educationalList.slice(0,-1))
  }
  
  const onSave=()=>{
    setLoading(true)
    const data={
      data:{
        education:educationalList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
      console.log(resp);
      setLoading(false)
      toast('Details updated !', {
        style: { background: '#22c55e', color: 'white' }
      })
    },(error)=>{
      setLoading(false);
      toast('Server Error, Please try again!', {
        style: { background: '#ef4444', color: 'white' }
      })
    })
  }

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      education:educationalList
    })
  },[educationalList])

  const handleSpeechRecognition = (index, fieldName) => {
    if ('webkitSpeechRecognition' in window) {
      if (activeRecognition.index === index && activeRecognition.field === fieldName) {
        setActiveRecognition({ index: null, field: null });
        return;
      }

      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      setActiveRecognition({ index, field: fieldName });

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        const newEntries = educationalList.slice();
        newEntries[index][fieldName] = transcript;
        setEducationalList(newEntries);
      };

      recognition.onend = () => {
        setActiveRecognition({ index: null, field: null });
      };

      recognition.start();

      window.currentRecognition = recognition;
    } else {
      toast('Speech recognition is not supported in this browser');
    }
  };

  const isRecording = (index, fieldName) => 
    activeRecognition.index === index && activeRecognition.field === fieldName;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='p-3 md:p-5 rounded-lg border-t-primary border-t-2 mt-6 md:mt-10 bg-white'
    >
      <h2 className='font-bold text-xl md:text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent'>Education</h2>
      <p className='text-gray-600 mb-4 md:mb-6 text-sm md:text-base'>Add Your educational details</p>

      <AnimatePresence>
        {educationalList.map((item,index)=>(
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 border p-4 md:p-6 my-4 md:my-5 rounded-lg bg-gray-50/50'>
              <div className='col-span-1 md:col-span-2'>
                <label className='text-sm font-medium text-gray-700'>University Name</label>
                <div className="relative">
                  <Input 
                    name="universityName" 
                    onChange={(e)=>handleChange(e,index)}
                    value={item?.universityName}
                    className="focus:ring-1 focus:ring-primary/20"
                  />
                  <Button 
                    size="icon"
                    variant="ghost" 
                    className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8
                      ${isRecording(index, 'universityName') ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => handleSpeechRecognition(index, 'universityName')}
                  >
                    <Mic className={`h-4 w-4 ${isRecording(index, 'universityName') ? 'animate-pulse' : ''}`} />
                  </Button>
                </div>
              </div>
              
              <div>
                <label className='text-sm font-medium text-gray-700'>Degree</label>
                <div className="relative">
                  <Input 
                    name="degree" 
                    onChange={(e)=>handleChange(e,index)}
                    value={item?.degree}
                    className="focus:ring-1 focus:ring-primary/20"
                  />
                  <Button 
                    size="icon"
                    variant="ghost" 
                    className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8
                      ${isRecording(index, 'degree') ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => handleSpeechRecognition(index, 'degree')}
                  >
                    <Mic className={`h-4 w-4 ${isRecording(index, 'degree') ? 'animate-pulse' : ''}`} />
                  </Button>
                </div>
              </div>

              <div>
                <label className='text-sm font-medium text-gray-700'>Major</label>
                <div className="relative">
                  <Input 
                    name="major" 
                    onChange={(e)=>handleChange(e,index)}
                    value={item?.major}
                    className="focus:ring-1 focus:ring-primary/20"
                  />
                  <Button 
                    size="icon"
                    variant="ghost" 
                    className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8
                      ${isRecording(index, 'major') ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => handleSpeechRecognition(index, 'major')}
                  >
                    <Mic className={`h-4 w-4 ${isRecording(index, 'major') ? 'animate-pulse' : ''}`} />
                  </Button>
                </div>
              </div>

              <div className='w-full'>
                <label className='text-sm font-medium text-gray-700'>Start Date</label>
                <Input 
                  type="date" 
                  name="startDate" 
                  onChange={(e)=>handleChange(e,index)}
                  defaultValue={item?.startDate}
                  className="focus:ring-1 focus:ring-primary/20 w-full"
                />
              </div>

              <div className='w-full'>
                <label className='text-sm font-medium text-gray-700'>End Date</label>
                <Input 
                  type="date" 
                  name="endDate" 
                  onChange={(e)=>handleChange(e,index)}
                  defaultValue={item?.endDate}
                  className="focus:ring-1 focus:ring-primary/20 w-full"
                />
              </div>

              <div className='col-span-1 md:col-span-2'>
                <label className='text-sm font-medium text-gray-700'>Description</label>
                <div className="relative">
                  <Textarea 
                    name="description" 
                    onChange={(e)=>handleChange(e,index)}
                    value={item?.description}
                    className="focus:ring-1 focus:ring-primary/20"
                  />
                  <Button 
                    size="icon"
                    variant="ghost" 
                    className={`absolute right-2 top-2 h-8 w-8
                      ${isRecording(index, 'description') ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => handleSpeechRecognition(index, 'description')}
                  >
                    <Mic className={`h-4 w-4 ${isRecording(index, 'description') ? 'animate-pulse' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className='flex flex-col md:flex-row justify-between gap-4 mt-6'>
        <div className='flex gap-2'>
          <Button 
            variant="outline" 
            onClick={AddNewEducation} 
            className="text-primary flex-1 md:flex-none"
          >
            <Plus className="w-4 h-4 mr-2" /> Add More
          </Button>
          <Button 
            variant="outline" 
            onClick={RemoveEducation} 
            className="text-red-500 flex-1 md:flex-none"
          >
            <Minus className="w-4 h-4 mr-2" /> Remove
          </Button>
        </div>
        
        <Button 
          disabled={loading} 
          onClick={()=>onSave()}
          className="bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 w-full md:w-auto"
        >
          {loading ? 
            <LoaderCircle className='animate-spin mr-2' /> : 
            'Save Changes'
          }    
        </Button>
      </div>
    </motion.div>
  )
}

export default Education