import React from 'react'
import { Modal, Tag } from 'antd'

type PropsType = {
  member: IMember
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type DetailWrapperPropsType = {
  label: string
  title: React.ReactNode
  className?: string
}

const DetailWrapper = ({ label, title, className }: DetailWrapperPropsType) => {
  return (
    <div className={`grid w-full grid-cols-5 items-end font-medium ${className}`}>
      <p className="col-span-2 text-base text-noneSelected">{label}</p>
      <div className="col-span-3">{title}</div>
    </div>
  )
}

const Detail = ({ isOpen, setIsOpen, member }: PropsType) => {
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => {
        setIsOpen(false)
      }}
      footer={[<></>]}
      centered
      width={880}
    >
      <div className="flex items-start justify-start gap-4">
        <img
          src="https://cali.vn/storage/app/media/old/Calipso-NganPham/gymer-insta/cropped-images/gymer-insta-5-0-0-0-0-1546234815.jpg"
          alt="member-image"
          className="aspect-square w-[25rem] rounded-md object-contain"
        />
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <DetailWrapper
            className="text-xl"
            label="Họ và tên"
            title={`${member.user.firstName} ${member.user.lastName}`}
          />
          <DetailWrapper className="text-xl" label="Sức khỏe" title={`Sức khỏe tốt`} />
          <DetailWrapper
            className="text-xl"
            label="Tham gia từ"
            title={new Date(member.joinedDate).toLocaleDateString('vi-VN')}
          />
          <DetailWrapper
            className="text-xl"
            label="Cân nặng"
            title={`${member.weight.toFixed(2)} kg`}
          />
          <DetailWrapper
            className="text-xl"
            label="Tình trạng"
            title={
              member.isBanned ? (
                <Tag color="volcano">Đã bị khóa</Tag>
              ) : (
                <Tag color="green">Đang hoạt động</Tag>
              )
            }
          />
          {member.isBanned && (
            <DetailWrapper className="text-xl" label="Lý do" title={member.bannedReason} />
          )}
        </div>
      </div>
    </Modal>
  )
}

export default Detail
