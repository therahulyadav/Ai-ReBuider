import Header from '@/components/custom/Header'
import { Link } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header/>
      <div>
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-50"
      >
        <div className="py-16 px-4 mx-auto max-w-screen-xl text-center lg:py-24 lg:px-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 text-5xl font-extrabold tracking-tight leading-none text-gray-900 md:text-6xl lg:text-7xl"
            >
              Build Your Resume <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600'>With AI</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-12 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 lg:px-48"
            >
              Effortlessly Craft a Standout Resume with Our AI-Powered Builder
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
            >
              <Link to={'/dashboard'}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex justify-center items-center py-4 px-8 text-base font-medium text-center text-white rounded-full bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg transition-all duration-300"
                >
                  Get Started
                  <motion.svg 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="ml-2 -mr-1 w-5 h-5" 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </motion.svg>
                </motion.div>
              </Link>
            </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-24 lg:px-12"
      >
        <h2 className="font-bold text-4xl mb-4">How it Works?</h2>
        <p className="text-lg text-gray-600 mb-12">In just 3 simple easy steps</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            whileHover={{ y: -10 }}
            className="block rounded-2xl border bg-white p-8 shadow-xl transition duration-300"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <AtomIcon className='h-10 w-10 text-primary'/>
            </motion.div>

            <h2 className="mt-4 text-xl font-bold text-black">Write prompt for your form</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Use our AI-powered system to generate the perfect form structure based on your requirements.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="block rounded-2xl border bg-white p-8 shadow-xl transition duration-300"
          >
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <Edit className='h-10 w-10 text-primary'/>
            </motion.div>

            <h2 className="mt-4 text-xl font-bold text-black">Edit Your form</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Customize and refine your AI-generated form with our intuitive editor.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="block rounded-2xl border bg-white p-8 shadow-xl transition duration-300"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Share2 className='h-10 w-10 text-primary'/>
            </motion.div>

            <h2 className="mt-4 text-xl font-bold text-black">Share & Start Accepting Responses</h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Share your polished resume with the world and track responses in real-time.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="py-16 bg-gradient-to-r from-purple-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-white shadow-xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4 text-primary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.62 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Generate professional resumes in seconds with AI</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-white shadow-xl"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 mx-auto mb-4 text-primary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold mb-2">ATS Optimized</h3>
              <p className="text-gray-600">Built to pass Applicant Tracking Systems</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-white shadow-xl"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 mx-auto mb-4 text-primary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Privacy First</h3>
              <p className="text-gray-600">Your data stays private and secure</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-4">Multiple Export Options</h2>
              <p className="text-gray-600 mb-6">Download your resume in multiple formats including PDF and DOCX. Share directly with employers or save for later.</p>
              <div className="flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-4 rounded-lg bg-purple-100 text-purple-600"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-4 rounded-lg bg-blue-100 text-blue-600"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Resume Builder</h3>
                <p className="text-gray-300 text-sm">Create professional resumes with AI-powered tools.</p>
                <div className="flex space-x-4">
                  <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-300 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.535.223l.19-2.712 4.94-4.465c.215-.19-.047-.298-.332-.108l-6.107 3.844-2.627-.916c-.57-.182-.582-.57.12-.842l10.25-3.96c.472-.176.885.106.6 1.005z"/></svg>
                  </motion.a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link></li>
                  <li><Link to="/pdftodocx" className="text-gray-300 hover:text-white transition-colors">PDF to DOCX</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Templates</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                <p className="text-sm text-gray-300 mb-4">Stay updated with our latest features and releases.</p>
                <div className="flex">
                  <input type="email" placeholder="Enter your email" className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white" />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-purple-600 rounded-r-md hover:bg-purple-700 transition-colors"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
            </div>
          </div>
        </div>
      </motion.footer>

      </div>
    </div>
  )
}

export default Home
