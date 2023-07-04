import {
  BankFilled,
  BankOutlined,
  CaretUpOutlined,
  ControlFilled,
  ControlOutlined,
  GiftFilled,
  GiftOutlined,
  IdcardFilled,
  IdcardOutlined,
  InfoCircleFilled,
  InfoCircleOutlined,
  MacCommandFilled,
  MacCommandOutlined,
  ReconciliationFilled,
  ReconciliationOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
  WhatsAppOutlined
} from '@ant-design/icons'
import { Avatar, Divider } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '~/assets/logo.png'

type SideButtonProps = {
  icon: React.ReactNode
  activedIcon: React.ReactNode
  text: string
  href: string
}

const SideButton = ({ icon, activedIcon, text, href }: SideButtonProps) => {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const isActive =
    currentPath.slice(1).split('/').includes(href.slice(1)) ||
    (currentPath === '/' && href === '/') ||
    (currentPath === '/tam-vang/them' && href === '/tam-tru')

  return (
    <button
      className={`
        mb-1 flex w-full items-center justify-start gap-4 rounded-md py-1.5 ps-3 text-base transition-colors hover:bg-btnHover
        ${isActive ? ' bg-btnHover text-sideActive' : ''}
      `}
      onClick={() => navigate(href)}
    >
      {isActive ? activedIcon : icon}
      <span className={`${isActive ? 'font-semibold' : 'font-medium'}`}>{text}</span>
    </button>
  )
}

const Sidebar = () => {
  return (
    <div className="flex h-full min-w-[14rem] max-w-[14rem] flex-col items-center justify-start gap-8 border-r-2 border-borderLine bg-bgSideBar px-3 pt-8 text-textSideBar">
      <img className="w-3/5" src={Logo} alt="app logo" />

      <div className="w-full">
        <SideButton
          icon={<MacCommandOutlined />}
          activedIcon={<MacCommandFilled />}
          text="Tổng quan"
          href="/"
        />
        <SideButton
          icon={<BankOutlined />}
          activedIcon={<BankFilled />}
          text="Phòng tập"
          href="/phong-tap"
        />
        <SideButton
          icon={<TeamOutlined />}
          activedIcon={<TeamOutlined />}
          text="Nhân viên"
          href="/nhan-vien"
        />

        <Divider className="mb-1 mt-0 bg-textSideBar" />

        <SideButton
          icon={<ReconciliationOutlined />}
          activedIcon={<ReconciliationFilled />}
          text="Gói tập"
          href="/goi-tap"
        />
        <SideButton
          icon={<ControlOutlined />}
          activedIcon={<ControlFilled />}
          text="Thiết bị"
          href="/thiet-bi"
        />
        <SideButton
          icon={<IdcardOutlined />}
          activedIcon={<IdcardFilled />}
          text="Hội viên"
          href="/hoi-vien"
        />

        <Divider className="mb-1 mt-0 bg-textSideBar" />

        <SideButton
          icon={<WhatsAppOutlined />}
          activedIcon={<WhatsAppOutlined />}
          text="Phản hồi"
          href="/phan-hoi"
        />
      </div>
    </div>
  )
}

export default Sidebar
