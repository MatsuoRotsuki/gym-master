import React, { useState } from 'react'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useAuth from '~/hooks/useAuth'
import useMemberStore from '../member/MemberStore'
import { Avatar, Button, Tag } from 'antd'
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import ChangePassword from './ChangePassword'

type AccountItemPropsType = {
  children: React.ReactNode
}

type UserInfoItemPropsType = {
  label: string
  value: React.ReactNode
}

const AccountItem = ({ children }: AccountItemPropsType) => {
  return <div className="h-min rounded-md border border-disabled p-4">{children}</div>
}

const UserInfoItem = ({ label, value }: UserInfoItemPropsType) => {
  return (
    <div>
      <p className="font-medium text-noneSelected">{label}</p>
      <div className="font-medium">{value}</div>
    </div>
  )
}

const Account = () => {
  const { currentUser, email } = useAuth()
  const [members] = useMemberStore(state => [state.members])

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const userInfo = members.get(currentUser as string)

  return (
    <DefaultLayout title="Thông tin tài khoản">
      {userInfo && (
        <>
          <div className="h-profile grid grow auto-rows-min grid-cols-1 gap-6 rounded-md bg-bgDefault p-6 shadow-sm">
            <AccountItem>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-2">
                  <Avatar
                    className="flex items-center justify-center"
                    size={72}
                    icon={<UserOutlined />}
                  />
                  <div>
                    <p className="text-xl font-semibold">{`${userInfo.firstName} ${userInfo.lastName}`}</p>
                    <p className="text-base text-noneSelected">{email}</p>
                  </div>
                </div>

                <Button
                  className="flex items-center justify-center"
                  icon={<EditOutlined />}
                  onClick={() => setIsOpen(true)}
                >
                  Đổi mật khẩu
                </Button>
              </div>
            </AccountItem>

            <AccountItem>
              <div className="mb-2 flex w-full items-start justify-between">
                <p className="text-lg font-semibold">Thông tin cá nhân</p>

                <Button className="flex items-center justify-center" icon={<EditOutlined />}>
                  Chỉnh sửa
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <UserInfoItem label="Họ: " value={userInfo.firstName} />
                <UserInfoItem label="Tên: " value={userInfo.lastName} />

                <UserInfoItem label="Ngày sinh: " value={userInfo.dateOfBirth.toString()} />
                <UserInfoItem label="Giới tính: " value={userInfo.gender === 0 ? 'Nam' : 'Nữ'} />
                <UserInfoItem label="Số điện thoại: " value={userInfo.phoneNumber} />
                <UserInfoItem label="Địa chỉ: " value={userInfo.address} />

                <UserInfoItem label="Cân nặng: " value={`${Math.round(userInfo.weight * 10)} kg`} />
                <UserInfoItem
                  label="Tình trạng sức khỏe: "
                  value={<Tag color="success">Khỏe mạnh</Tag>}
                />
              </div>
            </AccountItem>
          </div>

          <ChangePassword isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      )}
    </DefaultLayout>
  )
}

export default Account
