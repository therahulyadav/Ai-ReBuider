import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState , useRef } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'
import { saveAs } from 'file-saver'
import htmlToDocx from 'html-to-docx'

function ViewResume() {

    const [resumeInfo,setResumeInfo]=useState();
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
    
    const handleDownloadDoc = async () => {
    const componentHTML = componentRef.current.innerHTML;
    const docxContent = await htmlToDocx(componentHTML, {
      orientation: "portrait",
      margins: { top: 720, right: 720, bottom: 720, left: 720 },
    });

    const blob = new Blob([docxContent], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Use file-saver to trigger download
    saveAs(blob, "component.docx");
  }
    
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
        <div id="no-print">
        <Header/>

        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
            <h2 className='text-center text-2xl font-medium'>
                Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
                    resume url with your friends and family </p>
            <div className='flex justify-between px-44 my-10'>
                <Button onClick={HandleDownload}>Download</Button>
                <Button onClick={handleDownloadDoc}>Download as .docx</Button>
               <Button onClick={copyToClip}>Share</Button>
 
            </div>
        </div>
            
        </div>
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id="print-area" >
                <ResumePreview ref={componentRef}/>
            </div>
            </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
