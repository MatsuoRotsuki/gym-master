import { Avatar, Button, Empty, Space, Tabs, TabsProps, Tag } from 'antd'
import React from 'react'
import Edit from './Edit'
import { InfoCircleOutlined } from '@ant-design/icons'
import { genderType } from '~/app/config'
import { useNavigate } from 'react-router-dom'
import Table, { ColumnsType } from 'antd/es/table'

type PropsType = {
  member: IMember
}

type DetailWrapperPropsType = {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
}

const DetailWrapper = ({ label, value }: DetailWrapperPropsType) => {
  return (
    <div className="flex flex-col justify-start">
      <p className="text-base font-semibold">{label}</p>
      <p className="text-base text-noneSelected">{value}</p>
    </div>
  )
}

const MemberInfo = ({ member }: PropsType) => {
  return (
    <div className="flex items-start justify-start gap-4">
      <img
        src="https://cali.vn/storage/app/media/old/Calipso-NganPham/gymer-insta/cropped-images/gymer-insta-5-0-0-0-0-1546234815.jpg"
        alt="member-image"
        className="aspect-square w-[20rem] rounded-md object-contain"
      />
      <div className="grid w-full grid-cols-2 gap-4">
        <DetailWrapper label="Họ và tên" value={`${member.firstName} ${member.lastName}`} />
        <DetailWrapper label="Giới tính" value={genderType[member.gender]} />
        <DetailWrapper
          label="Ngày sinh"
          value={new Date(member.dateOfBirth).toLocaleDateString('vi-VN')}
        />
        <DetailWrapper label="Số điện thoại" value={member.phoneNumber} />
        <DetailWrapper label="Sức khỏe" value={`Sức khỏe tốt`} />
        <DetailWrapper
          label="Tham gia từ"
          value={new Date(member.joinedDate).toLocaleDateString('vi-VN')}
        />
        <DetailWrapper label="Cân nặng" value={`${member.weight?.toFixed(2) ?? 60} kg`} />
        {member.isBanned && <DetailWrapper label="Lý do bị khóa" value={member.bannedReason} />}
      </div>
    </div>
  )
}

const MemberMembership = ({ member }: PropsType) => {
  const navigate = useNavigate()

  const columns: ColumnsType<IMemberMembership> = [
    {
      title: 'Gói tập',
      dataIndex: 'name',
      render: (_, record) => record.membership.name
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'validFrom',
      key: 'validFrom'
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'validUntil',
      key: 'validUntil'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'hasActivated',
      render: (_, record) =>
        record.hasActivated ? (
          <Tag color="green">Đã kích hoạt</Tag>
        ) : (
          <Tag color="volcano">Đã hết hạn</Tag>
        )
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={member.memberMemberships}
      onRow={(record, _) => {
        return {
          onClick: () => {
            navigate(`/goi-tap/${record.id}`)
          }
        }
      }}
    />
  )
}

function Detail({ member }: PropsType) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const items: TabsProps['items'] = [
    {
      key: 'thong-tin',
      label: 'Thông tin',
      children: <MemberInfo member={member} />
    },
    {
      key: 'memberMembership',
      label: 'Gói tập đã đăng ký',
      children: <MemberMembership member={member} />
    }
  ]

  return (
    <div className="w-full p-4">
      {Object.keys(member).length > 0 ? (
        <>
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-start gap-4">
              <p className="text-2xl font-medium">{`${member.firstName} ${member.lastName}`}</p>
              {member.isBanned ? (
                <Tag color="volcano">Đã bị khóa</Tag>
              ) : (
                <Tag color="green">Đang hoạt động</Tag>
              )}
            </div>
            <Button ghost type="primary" onClick={() => setIsOpen(true)}>
              Chỉnh sửa
            </Button>
            <Edit member={member} isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <p className="text-base text-noneSelected">{member.address}</p>
          <Tabs defaultActiveKey="1" items={items}></Tabs>
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}

export default Detail
