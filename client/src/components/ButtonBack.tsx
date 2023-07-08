import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

const ButtonBack = () => {
  const navigate = useNavigate()

  return (
    <button
      className="flex items-center justify-center gap-2 text-base transition-colors hover:text-primary-4"
      onClick={() => navigate(-1)}
    >
      <ArrowLeftOutlined />
      <p>Trở về</p>
    </button>
  )
}

export default ButtonBack
