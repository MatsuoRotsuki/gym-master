import React from 'react'

type PropsType = {
  label: string
  title: React.ReactNode
  className?: string
}

const DetailItemWrapper = ({ label, title, className }: PropsType) => (
  <div className={`mb-2 grid w-full grid-cols-5 items-start font-medium ${className}`}>
    <p className="col-span-2 text-base text-noneSelected">{label}</p>
    <div className="col-span-4">{title}</div>
  </div>
)

export default DetailItemWrapper
