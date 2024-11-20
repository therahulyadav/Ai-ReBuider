import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi'
import ResumeCardItem from './components/ResumeCardItem'
import { motion } from 'framer-motion'

function Dashboard() {
  const {user} = useUser()
  const [resumeList, setResumeList] = useState([])
  const [loading , setLoading] = useState();
  
  useEffect(() => {
    user && GetResumesList()
  }, [user])

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = () => {
    setLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        console.log(resp.data.data)
        setResumeList(resp.data.data)
        setLoading(false);
      })
    
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='p-10 md:px-20 lg:px-32 min-h-screen bg-gradient-to-b from-white to-gray-50'
    >
      <motion.h2 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='font-bold text-4xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'
      >
        My Resume
      </motion.h2>
      <motion.p
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='text-gray-600 mt-2'
      >
        Start Creating AI resume to your next Job role
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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'
      >
        <motion.div variants={itemVariants}>
          <AddResume />
        </motion.div>
        
        {resumeList.length > 0 ? 
          resumeList.map((resume, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ResumeCardItem resume={resume} refreshData={GetResumesList} />
            </motion.div>
          ))
          :
          [1,2,3,4].map((_, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className='h-[280px] rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse shadow-lg'
            />
          ))
        }
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
