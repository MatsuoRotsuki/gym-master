import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useStaffStore from './StaffStore'
import { useEffectOnce } from 'usehooks-ts'
import { LoadingOutlined, UserOutlined, WarningFilled } from '@ant-design/icons'
import SubHeader from '~/components/Layout/SubHeader'
import axiosClient from '~/lib/axiosClient'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { Avatar, Tag } from 'antd'
import { showDeleteConfirm } from '~/components/Layout/ConfirmModal'

type StaffInfoItemProps = {
  label: string
  value?: React.ReactNode
}

type EachStaffInfoDivProps = {
  label: React.ReactNode
  className?: string
  children: React.ReactNode
}

const StaffInfoItem = ({ label, value }: StaffInfoItemProps) => {
  return (
    <div>
      <p className="text-medium mb-1 text-base text-noneSelected">{label}</p>
      <p className={`text-base`}>{value ?? <span className="text-unknow">Chưa cập nhật</span>}</p>
    </div>
  )
}

const EachStaffInfoDiv = ({ label, className, children }: EachStaffInfoDivProps) => {
  return (
    <div className={`mb-6 rounded-md border border-disabled p-4 ${className}`}>
      <p className="mb-2 text-lg font-medium">{label}</p>
      {children}
    </div>
  )
}

const Detail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [staff, getStaffById] = useStaffStore(state => [state.staff, state.getStaffById])
  const [userStaff, setUserStaff] = useState<IStaff>()
  useEffectOnce(() => {
    getStaffById(id)
  })

  return (
    <DefaultLayout>
      <div className="bg-bgPrimary h-full w-full rounded-lg px-4 py-3 shadow-md">
        <SubHeader
          title="Thông tin nhân viên"
          type="detail"
          onEdit={() => navigate(`/nhan-vien/edit/${id}`)}
          onDelete={() => async () => {
            showDeleteConfirm({
              title: 'Bạn có chắc chắn muốn xóa nhân viên này không?',
              icon: <WarningFilled />,
              onOk: async () => {
                try {
                  await axiosClient.delete(`v1/staffs/${staff.id}/delete`)
                  toast.success('Xóa nhân viên thành công', {
                    position: toast.POSITION.TOP_RIGHT
                  })
                  navigate(`/nhan-vien/`)
                } catch (e) {
                  const err = e as Error
                  console.log(err.message)
                  toast.error((err as Error).message, {
                    position: toast.POSITION.TOP_RIGHT
                  })
                }
              }
            })
          }}
        />

        {!staff ? (
          <div className="flex w-full items-center justify-center">
            <LoadingOutlined className="text-primary text-4xl" />
          </div>
        ) : (
          <>
            <EachStaffInfoDiv label={`Mã người dùng - ${staff.id}`}>
              <div className="flex items-center justify-start gap-8">
                <Avatar
                  className="flex items-center justify-center"
                  src={staff.avatar ?? null}
                  size={128}
                  icon={<UserOutlined />}
                />

                <div className="grid h-full grow grid-cols-3 gap-4">
                  <StaffInfoItem label="Họ và tên" value={`${staff.firstName} ${staff.lastName}`} />
                  <StaffInfoItem label="Giới tính" value={staff.gender === 0 ? 'Nam' : 'Nữ'} />
                  <StaffInfoItem
                    label="Ngày sinh"
                    value={
                      staff.dateOfBirth &&
                      new Intl.DateTimeFormat('vi-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }).format(new Date(staff.dateOfBirth))
                    }
                  />
                  <StaffInfoItem label="Địa chỉ" value={staff.address} />
                  <StaffInfoItem label="Số điện thoại" value={staff.phoneNumber} />
                </div>
              </div>
            </EachStaffInfoDiv>

            <EachStaffInfoDiv label={`Mã nhân viên: ${staff?.id}`}>
              <div className="grid grid-cols-3 gap-4">
                <StaffInfoItem label="Vị trí:" value={staff?.position} />
                <StaffInfoItem
                  label="Ngày tuyển dụng:"
                  value={
                    staff?.hiredDate &&
                    new Intl.DateTimeFormat('vi-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).format(new Date(staff?.hiredDate))
                  }
                />
                <StaffInfoItem
                  label="Trạng thái làm việc"
                  value={
                    staff.employmentStatus === 2 ? (
                      <Tag color="volcano">Đã ngưng làm việc</Tag>
                    ) : (
                      <Tag color="green">Đang làm việc</Tag>
                    )
                  }
                />
                <StaffInfoItem label="Lương" value={staff?.salary} />
                <StaffInfoItem label="Ghi chú" value={staff?.note ?? 'Không có'} />
              </div>
            </EachStaffInfoDiv>
          </>
        )}
      </div>
    </DefaultLayout>
  )
}

export default Detail
