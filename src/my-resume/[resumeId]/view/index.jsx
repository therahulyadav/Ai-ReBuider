import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState , useRef } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
// import { RWebShare } from 'react-web-share'
// import {htmlCssExportWord} from "html-css-export-word"
// import htmlToDocx from 'html-to-docx'
// import { saveAs } from 'file-saver'
// import cssFile from 'index.css'
import ConvertApi from 'convertapi-js'

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
      const convertApi = ConvertApi.auth('secret_KkE5y3oXQGzxrRyo')
      let params = convertApi.createParams()
      params.add('File', elFileInput.files[0]);
      params.add('FileName', 'My Ai resume');
      let result = await convertApi.convert('pdf', 'docx', params);
    alert("Work in progress");
    // // Convert HTML to DOCX
    // const docxBlob = await htmlToDocx(html, {
    //   orientation: "portrait", // You can set options like margins, orientation, etc.
    // });

    // // Use file-saver to save the blob as a .docx file
    // saveAs(docxBlob, "MyAiResume.docx");
    };
    
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
                <Button onClick={handleDownloadDoc}>Download as Word.doc file</Button>
               <Button onClick={copyToClip}>Share</Button>
 
            </div>
        </div>
            
        </div>
        <div className='my-10 mx-10 md:mx-20 lg:mx-36' id='sidePrintMargin'>
        <div  ref={componentRef} id="print-area" >
                <ResumePreview />
        </div>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
