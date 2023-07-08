import { Avatar, Tag } from 'antd'
import React from 'react'

type PropsType = {
  member: IMember
  setCurrentMember: React.Dispatch<React.SetStateAction<IMember>>
  className?: string
}

function MemberCard({ member, setCurrentMember, className }: PropsType) {
  return (
    <div
      className={`flex items-start justify-start gap-2 p-4 hover:cursor-pointer hover:bg-bgSecondary ${className}`}
      onClick={() => setCurrentMember(member)}
    >
      <Avatar
        shape="square"
        size={64}
        src={
          member.avatar ??
          'https://cali.vn/storage/app/media/old/Calipso-NganPham/gymer-insta/cropped-images/gymer-insta-5-0-0-0-0-1546234815.jpg'
        }
      />
      <div className="w-full">
        <div className="flex items-center justify-between gap-2">
          <p className="text-lg">{`${member.firstName} ${member.lastName}`}</p>
          {member.isBanned ? (
            <Tag color="volcano">Đã bị khóa</Tag>
          ) : (
            <Tag color="green">Đang hoạt động</Tag>
          )}
        </div>
        <p className="text-noneSelected">{`Sức khỏe tốt`}</p>
      </div>
    </div>
  )
}

export default MemberCard
