import React, { MouseEventHandler } from 'react'
import { LogoutOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Popover, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type PopoverItemPropsType = {
  children: React.ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

const PopoverItem = ({ children, onClick }: PopoverItemPropsType) => {
  return (
    <button
      className="flex w-full items-center justify-start gap-2 rounded-md p-2 text-base font-medium text-noneSelected hover:bg-primary-1"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const AccountPopover = () => {
  const navigate = useNavigate()

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      arrow={false}
      content={
        <div className="flex min-w-[10vw] flex-col items-start justify-start gap-1">
          <PopoverItem onClick={() => console.log('send feedback')}>
            <MailOutlined className="flex items-center justify-center" />
            <span>Send me feedback</span>
          </PopoverItem>

          <PopoverItem onClick={() => console.log('==> logout')}>
            <LogoutOutlined className="flex items-center justify-center" />
            <span>Logout</span>
          </PopoverItem>

          <p className="w-full text-sm font-medium opacity-30">Team 6 · ITSS · © 2023</p>
        </div>
      }
    >
      <button className="flex h-full items-center justify-center gap-2 rounded-full p-1 font-medium">
        <Avatar
          className="flex cursor-pointer items-center justify-center transition-colors hover:bg-noneSelected"
          size={32}
          icon={<UserOutlined />}
        />
      </button>
    </Popover>
  )
}

export default AccountPopover
