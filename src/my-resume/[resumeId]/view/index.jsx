import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { Link } from 'react-router-dom'
import { templates } from '@/templates/ResumeTemplates'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"

const printStyles = `
  @page {
    margin: 0;
    size: A4;
  }

  @media print {
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    #no-print {
      display: none !important;
    }

    #print-area {
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
    }

    #sidePrintMargin {
      margin: 0 !important;
    }

    /* Reset all background colors to white */
    .bg-primary,
    .bg-gradient-to-r,
    [class*='bg-'] {
      background: white !important;
    }

    /* Ensure text remains visible */
    * {
      text-shadow: none !important;
    }
  }
`;

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState()
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const { resumeId } = useParams()
  const componentRef = useRef()
  const [showDownloadAlert, setShowDownloadAlert] = useState(false)
  const [showShareAlert, setShowShareAlert] = useState(false)
  const [loading , setLoading] = useState();

  useEffect(() => {
    GetResumeInfo()
  }, [])

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = printStyles;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const GetResumeInfo = () => {
    setLoading(true);
    GlobalApi.GetResumeById(resumeId)
      .then(resp => {
        console.log(resp.data.data)
        setResumeInfo(resp.data.data)
      })
      .catch(err => {
        console.error("Error fetching resume:", err)
      })
      setLoading(false);
  }

  function copyToClip() {
    navigator.clipboard.writeText(`https://airebuilder.netlify.app/my-resume/${resumeId}/view`)
    setShowShareAlert(true)
    toast.success('Share link copied to clipboard!', {
      duration: 2000,
    })
    setTimeout(() => setShowShareAlert(false), 2000)
  }

  const HandleDownload = () => {
    document.body.classList.add('printing');
    window.print();
    document.body.classList.remove('printing');
    setShowDownloadAlert(true);
    setTimeout(() => setShowDownloadAlert(false), 2000);
  }

  const SelectedTemplateComponent = templates[selectedTemplate]

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AlertDialog open={showDownloadAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Resume Downloaded Successfully! 📄</AlertDialogTitle>
              <AlertDialogDescription>
                Your resume has been downloaded to your device.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showShareAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Share Link Copied! 🔗</AlertDialogTitle>
              <AlertDialogDescription>
                The resume link has been copied to your clipboard. You can now share it with others.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>

        <div id="no-print">
          <Header />

          <motion.div 
            className='my-6 mx-4 md:my-10 md:mx-10 lg:mx-36'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2 
              className='text-center text-xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              Congrats! Your Ultimate AI Resume is Ready! 🎉
            </motion.h2>
            <motion.p 
              className='text-center text-sm md:text-base text-gray-500 mt-2 px-4'
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Download your resume or share the unique URL with others
            </motion.p>
            {loading ?
      <motion.p
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='text-gray-600 mt-2'
      >
        The project is hosted on a free server. It takes 1-3 minutes to load.
      </motion.p> : <></>
}

            <motion.div 
              className='flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center mt-8 md:mt-10'
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={HandleDownload}
                  className="w-full md:w-auto bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg transition-all duration-300"
                >
                  Download Resume
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
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
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to={'/pdftodocx'} className="w-full md:w-auto">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg transition-all duration-300">
                    Convert to DOCX
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={copyToClip}
                  className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg transition-all duration-300"
                >
                  Share Link
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className='my-10 mx-10 md:mx-20 lg:mx-36' 
          id='sidePrintMargin'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div ref={componentRef} id="print-area" className="shadow-2xl rounded-lg overflow-hidden">
            <AnimatePresence mode='wait'>
              {resumeInfo && (
                <motion.div
                  key={selectedTemplate}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SelectedTemplateComponent resumeInfo={resumeInfo} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
