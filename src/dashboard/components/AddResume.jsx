import { Loader2, PlusSquare } from 'lucide-react'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState('')
    const { user } = useUser()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()

    const onCreate = async () => {
        setLoading(true)
        const uuid = uuidv4()
        const data = {
            data: {
                title: resumeTitle,
                resumeId: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        }

        GlobalApi.CreateNewResume(data).then(resp => {
            if(resp) {
                setLoading(false)
                navigation('/dashboard/resume/'+resp.data.data.documentId+"/edit")
            }
        }).catch(() => {
            setLoading(false)
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div 
                className='p-14 py-24 border group
                items-center flex flex-col gap-4
                justify-center bg-gradient-to-br from-secondary to-secondary/50
                rounded-lg h-[280px] relative overflow-hidden
                cursor-pointer border-dashed'
                onClick={() => setOpenDialog(true)}
                whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.4 }}
                >
                    <PlusSquare className="w-10 h-10 text-primary/60 group-hover:text-primary transition-colors duration-300" />
                </motion.div>
                <span className="text-sm font-medium text-primary/60 group-hover:text-primary transition-colors duration-300">
                    Create New Resume
                </span>
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
            </motion.div>

            <AnimatePresence>
                {openDialog && (
                    <Dialog open={openDialog}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                    Create New Resume
                                </DialogTitle>
                                <DialogDescription>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className="text-gray-600 mt-2">Add a title for your new resume</p>
                                        <Input 
                                            className="my-4 transition-all duration-300 focus:ring-2 focus:ring-primary/50" 
                                            placeholder="Ex. Full Stack Resume"
                                            onChange={(e) => setResumeTitle(e.target.value)}
                                        />
                                    </motion.div>
                                </DialogDescription>
                                <div className='flex justify-end gap-3 mt-4'>
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button 
                                            onClick={() => setOpenDialog(false)} 
                                            variant="ghost"
                                            className="hover:bg-gray-100 transition-colors duration-300"
                                        >
                                            Cancel
                                        </Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            disabled={!resumeTitle || loading}
                                            onClick={onCreate}
                                            className="bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-lg transition-all duration-300"
                                        >
                                            {loading ? (
                                                <Loader2 className='animate-spin mr-2' />
                                            ) : (
                                                'Create Resume'
                                            )}
                                        </Button>
                                    </motion.div>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default AddResume