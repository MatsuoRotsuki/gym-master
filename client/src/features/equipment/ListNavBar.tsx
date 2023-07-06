import React, { useState } from 'react'
import { Button } from 'antd'
import Create from './Create'

type PropsType = {
  quantity: number
}

const ListNavBar = ({ quantity }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xl font-medium">
          <span className="text-3xl">{quantity}</span> thiết bị
        </p>

        <Button type="primary" ghost onClick={() => setIsOpen(true)}>
          Thêm thiết bị
        </Button>
      </div>

      <Create isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default React.memo(ListNavBar)
