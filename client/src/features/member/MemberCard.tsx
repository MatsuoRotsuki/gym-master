import React, { useCallback, useState } from 'react'
import { Button, Tag } from 'antd'
import Detail from './Detail'
import { EditOutlined } from '@ant-design/icons'
import Edit from './Edit'

type PropsType = {
  member: IMember
}

const MemberCard = ({ member }: PropsType) => {
  const [isDetailOpened, setIsDetailOpened] = useState<boolean>(false)
  const [isUpdateOpened, setIsUpdateOpened] = useState<boolean>(false)

  return (
    <div className="relative rounded border border-cartBorder text-start shadow-sm transition-shadow hover:shadow-2xl">
      <button onClick={() => setIsDetailOpened(true)}>
        <img
          src="https://cali.vn/storage/app/media/old/Calipso-NganPham/gymer-insta/cropped-images/gymer-insta-5-0-0-0-0-1546234815.jpg"
          alt="equipment image"
          className="aspect-square w-full rounded-t object-cover"
        />

        <div className="px-3 py-2">
          <p className="text-lg font-semibold">{`${member.user.firstName} ${member.user.lastName}`}</p>
          <p className="text-gray-500 text-sm">{member.healthCondition}</p>
        </div>
      </button>
      <Tag className="absolute left-2 top-2" color={member.isBanned ? 'volcano' : 'green'}>
        {member.isBanned ? 'Đã bị khóa' : 'Đang hoạt động'}
      </Tag>
      <Button
        className="absolute right-0 top-0 border-none"
        type="primary"
        ghost
        icon={<EditOutlined />}
        onClick={() => setIsUpdateOpened(true)}
      />
      <Detail isOpen={isDetailOpened} setIsOpen={setIsDetailOpened} member={member}></Detail>
      <Edit isOpen={isUpdateOpened} setIsOpen={setIsUpdateOpened} member={member}></Edit>
    </div>
  )
}

export default MemberCard
