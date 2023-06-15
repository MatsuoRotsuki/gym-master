import React from 'react'

type PropsType = {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: PropsType) => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-3">
      <p className="px-8 py-2 text-2xl font-medium">Gym master</p>
      {children}
    </div>
  )
}

export default DefaultLayout
