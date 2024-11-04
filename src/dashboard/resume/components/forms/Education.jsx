import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, Mic } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

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
      toast('Details updated !')
    },(error)=>{
      setLoading(false);
      toast('Server Error, Please try again!')
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
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Education</h2>
    <p>Add Your educational details</p>

    <div>
      {educationalList.map((item,index)=>(
        <div key={index}>
          <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div className='col-span-2'>
              <label>University Name</label>
              <div className="relative">
                <Input 
                  name="universityName" 
                  onChange={(e)=>handleChange(e,index)}
                  value={item?.universityName}
                />
                <Button 
                  size="icon"
                  variant="ghost" 
                  className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 transition-colors
                    ${isRecording(index, 'universityName') ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-600'}`}
                  onClick={() => handleSpeechRecognition(index, 'universityName')}
                >
                  <Mic className={`h-4 w-4 ${isRecording(index, 'universityName') ? 'animate-pulse' : ''}`} />
                </Button>
              </div>
            </div>
            <div>
              <label>Degree</label>
              <div className="relative">
                <Input 
                  name="degree" 
                  onChange={(e)=>handleChange(e,index)}
                  value={item?.degree}
                />
                <Button 
                  size="icon"
                  variant="ghost" 
                  className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 transition-colors
                    ${isRecording(index, 'degree') ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-600'}`}
                  onClick={() => handleSpeechRecognition(index, 'degree')}
                >
                  <Mic className={`h-4 w-4 ${isRecording(index, 'degree') ? 'animate-pulse' : ''}`} />
                </Button>
              </div>
            </div>
            <div>
              <label>Major</label>
              <div className="relative">
                <Input 
                  name="major" 
                  onChange={(e)=>handleChange(e,index)}
                  value={item?.major}
                />
                <Button 
                  size="icon"
                  variant="ghost" 
                  className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 transition-colors
                    ${isRecording(index, 'major') ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-600'}`}
                  onClick={() => handleSpeechRecognition(index, 'major')}
                >
                  <Mic className={`h-4 w-4 ${isRecording(index, 'major') ? 'animate-pulse' : ''}`} />
                </Button>
              </div>
            </div>
            <div>
              <label>Start Date</label>
              <Input type="date" name="startDate" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.startDate} />
            </div>
            <div>
              <label>End Date</label>
              <Input type="date" name="endDate" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.endDate} />
            </div>
            <div className='col-span-2'>
              <label>Description</label>
              <div className="relative">
                <Textarea 
                  name="description" 
                  onChange={(e)=>handleChange(e,index)}
                  value={item?.description}
                />
                <Button 
                  size="icon"
                  variant="ghost" 
                  className={`absolute right-2 top-2 h-8 w-8 transition-colors
                    ${isRecording(index, 'description') ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-600'}`}
                  onClick={() => handleSpeechRecognition(index, 'description')}
                >
                  <Mic className={`h-4 w-4 ${isRecording(index, 'description') ? 'animate-pulse' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
            <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}

export default Education