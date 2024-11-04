import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { motion } from 'framer-motion'

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className='fixed w-full top-0 z-50 backdrop-blur-md bg-white/70 p-4 px-6 flex justify-between items-center shadow-lg'
        >
            <Link to={'/'}>
                <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src='/logo.svg' 
                    className='cursor-pointer' 
                    width={100} 
                    height={100}
                />
            </Link>
            {isSignedIn ? (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='flex gap-4 items-center'
                >
                    <Link to={'/dashboard'}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" className="font-medium px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                Dashboard
                            </Button>
                        </motion.div>
                    </Link>
                    <UserButton />
                </motion.div>
            ) : (
                <Link to={'/auth/sign-in'}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="font-medium px-8 py-2 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg transition-all duration-300">
                            Get Started
                        </Button>
                    </motion.div>
                </Link>
            )}
        </motion.div>
    )
}

export default Header