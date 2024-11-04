import { Loader2Icon, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

function ResumeCardItem({resume, refreshData}) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      console.log(resp);
      toast('Resume Deleted!', {
        style: { background: '#EF4444', color: 'white' }
      });
      refreshData()
      setLoading(false);
      setOpenAlert(false);
    }, () => {
      setLoading(false);
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Link to={'/dashboard/resume/'+resume.documentId+"/edit"}>
        <motion.div 
          className='p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[280px] rounded-t-lg border-t-4 relative overflow-hidden'
          style={{
            borderColor: resume?.themeColor
          }}
          whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
        >
          <motion.div 
            className='flex items-center justify-center h-[180px]'
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.img 
              src="/cv.png" 
              width={80} 
              height={80}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </motion.div>
        </motion.div>
      </Link>

      <motion.div 
        className='border p-3 flex justify-between text-white rounded-b-lg shadow-lg backdrop-blur-sm'
        style={{
          background: resume.themeColor ? resume.themeColor : "#5a97fa"
        }}
      >
        <motion.h2 
          className='text-sm font-medium'
          whileHover={{ scale: 1.05 }}
        >
          {resume.title}
        </motion.h2>
         
        <DropdownMenu>
          <DropdownMenuTrigger>
            <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
              <MoreVertical className='h-4 w-4 cursor-pointer hover:text-gray-200' />
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="animate-in slide-in-from-top-2">
            <DropdownMenuItem onClick={() => navigation('/dashboard/resume/'+resume.documentId+"/edit")}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/'+resume.documentId+"/view")}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation('/my-resume/'+resume.documentId+"/view")}>
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)} className="text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AnimatePresence>
          {openAlert && (
            <AlertDialog open={openAlert}>
              <AlertDialogContent className="animate-in zoom-in-90">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your resume
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onDelete} 
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {loading ? 
                      <Loader2Icon className='animate-spin'/> : 
                      'Delete'
                    }
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default ResumeCardItem