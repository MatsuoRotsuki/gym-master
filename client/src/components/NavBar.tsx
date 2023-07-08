import React from 'react'
import AccountPopover from './AccoutPopover'
import { SearchOutlined } from '@ant-design/icons'

type PropsType = {
  title?: React.ReactNode
}

const NavBar = ({ title }: PropsType) => {
  return (
    <div className="sticky top-0 z-50 flex max-h-[3rem] min-h-[3rem] w-full items-center justify-between border-b-2 border-borderLine bg-bgDefault pr-4">
      <div className="grow">
        <div className="px-3 text-xl font-semibold">{title}</div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center justify-center gap-1 rounded-md border border-disabled px-3 py-1">
          <SearchOutlined className="text-textHover" />
          <input className="grow text-base outline-none" placeholder="Search something..." />
        </div>

        <AccountPopover />
      </div>
    </div>
  )
}

export default NavBar
