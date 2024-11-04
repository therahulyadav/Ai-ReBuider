import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import { useEffect, useState , useRef } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { Link } from 'react-router-dom'
import { templates } from '@/templates/ResumeTemplates';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function ViewResume() {
  
    const [resumeInfo,setResumeInfo]=useState();
    const [selectedTemplate, setSelectedTemplate] = useState('classic');
    const {resumeId}=useParams();
    const componentRef = useRef();
    useEffect(()=>{
        GetResumeInfo();
    },[])
    const GetResumeInfo = () => {
  GlobalApi.GetResumeById(resumeId)
    .then(resp => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    })
    .catch(err => {
      console.error("Error fetching resume:", err);
    });
};

   function copyToClip(){
    navigator.clipboard.writeText(`https://airebuilder.netlify.app/my-resume/${resumeId}/view`);
    alert("share link copied");
   }
    const HandleDownload=()=>{
        window.print();
    }
    
    const SelectedTemplateComponent = templates[selectedTemplate];
    
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
        <div id="no-print">
        <Header/>

        <div className='my-6 mx-4 md:my-10 md:mx-10 lg:mx-36'>
            <h2 className='text-center text-xl md:text-2xl font-medium'>
                Congrats! Your Ultimate AI Resume is Ready!</h2>
            <p className='text-center text-sm md:text-base text-gray-400 mt-2 px-4'>
                Download your resume or share the unique URL with others</p>

            <div className='flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center mt-8 md:mt-10'>
                <Button 
                    onClick={HandleDownload}
                    className="w-full md:w-auto"
                >
                    Download Resume
                </Button>

                <Select 
                    value={selectedTemplate} 
                    onValueChange={setSelectedTemplate}
                >
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Select Template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="classic">Classic Template</SelectItem>
                        <SelectItem value="modern">Modern Template</SelectItem>
                        <SelectItem value="minimal">Minimal Template</SelectItem>
                        <SelectItem value="professional">Professional Template</SelectItem>
                        <SelectItem value="creative">Creative Template</SelectItem>
                    </SelectContent>
                </Select>

                <Link to={'/pdftodocx'} className="w-full md:w-auto">
                    <Button className="w-full">Convert to DOCX</Button>
                </Link>

                <Button 
                    onClick={copyToClip}
                    className="w-full md:w-auto"
                >
                    Share Link
                </Button>
            </div>
        </div>
        </div>
        <div className='my-10 mx-10 md:mx-20 lg:mx-36' id='sidePrintMargin'>
        <div  ref={componentRef} id="print-area" >
                {resumeInfo && <SelectedTemplateComponent resumeInfo={resumeInfo} />}
        </div>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
