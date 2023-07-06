import {
  CaretUpOutlined,
  HomeFilled,
  HomeOutlined,
  HourglassFilled,
  HourglassOutlined,
  InfoCircleFilled,
  InfoCircleOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined
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
  const isActive =
    useLocation().pathname.slice(1).split('/').includes(href.slice(1)) ||
    (useLocation().pathname === '/' && href === '/')

  return (
    <button
      className={
        isActive
          ? 'flex w-full items-center justify-start gap-4 rounded-md bg-btnActive py-2 ps-3 text-textPrimary transition-colors hover:bg-btnDefault'
          : 'flex w-full items-center justify-start gap-4 rounded-md py-2 ps-3 transition-colors hover:bg-btnDefault'
      }
      onClick={() => navigate(href)}
    >
      {isActive ? activedIcon : icon}
      <p className={`${isActive ? 'font-semibold' : 'font-medium'}`}>{text}</p>
    </button>
  )
}

const Sidebar = () => {
  return (
    <div className="flex h-full min-w-[13rem] max-w-[13rem] flex-col items-center justify-start gap-8 px-3 pt-8">
      <img className="w-3/5" src={Logo} alt="app logo" />
      <div className="flex w-full grow flex-col items-center justify-start gap-1">
        <SideButton
          icon={<HomeOutlined />}
          activedIcon={<HomeFilled />}
          text="Trang chủ"
          href="/"
        />
        <SideButton
          icon={<SolutionOutlined />}
          activedIcon={<SolutionOutlined />}
          text="Gói tập"
          href="/goi-tap"
        />
        <SideButton
          icon={<UserAddOutlined />}
          activedIcon={<UserAddOutlined />}
          text="Phòng tập"
          href="/phong-tap"
        />
        <SideButton
          icon={<HourglassOutlined />}
          activedIcon={<HourglassFilled />}
          text="Trang thiết bị"
          href="trang-bi/"
        />
        <SideButton
          icon={<TeamOutlined />}
          activedIcon={<TeamOutlined />}
          text="Nhân viên"
          href="/nhan-vien"
        />
        <SideButton
          icon={<InfoCircleOutlined />}
          activedIcon={<InfoCircleFilled />}
          text="Hội viên VIP"
          href="/hoi-vien"
        />
        <Divider className="m-0" />
      </div>
      <div className="w-full">
        <Divider className="m-0" />
        <div className="flex w-full items-center justify-between py-3">
          <div className="flex grow items-center justify-start gap-4">
            <Avatar
              className="flex items-center justify-center"
              size={32}
              icon={<UserOutlined />}
            />
            <p className="font-medium">Admin</p>
          </div>
          <CaretUpOutlined />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
