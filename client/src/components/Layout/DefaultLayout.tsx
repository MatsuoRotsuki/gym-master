import React from 'react'
import { ToastContainer } from 'react-toastify'
import { AnimatePresence, motion } from 'framer-motion'
import SideBar from '../SideBar'
import NavBar from '../NavBar'

type PropsType = {
  children: React.ReactNode
  title?: string
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 10 },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, type: 'easeOut', when: 'beforeChildren' }
  },
  exit: { opacity: 0, x: -0, y: -10 }
}

const DefaultLayout = ({ children, title }: PropsType) => {
  return (
    <AnimatePresence
      initial={true}
      onExitComplete={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0 })
        }
      }}
    >
      <div className="flex h-screen w-screen shadow-md">
        <ToastContainer autoClose={1500} style={{ fontSize: '16px' }} />
        <SideBar />

        <div className="relative h-full grow overflow-y-auto">
          <NavBar title={title} />

          <motion.div
            className="h-max p-3"
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5, type: 'easeOut' }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default DefaultLayout
