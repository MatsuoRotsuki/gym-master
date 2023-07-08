import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonBack from '~/components/ButtonBack'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useSubscriptionStore from './SubscriptionStore'
import DetailItemWrapper from '~/components/DetailItemWrapper'
import { LoadingOutlined } from '@ant-design/icons'
import { Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Registration } from './Statistical'

const Detail = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [plans] = useSubscriptionStore(state => [state.plans])
  const plan = plans.get(id as string) as IMembership

  if (!id || !plan) navigate(-1)

  const columns: ColumnsType<RegistrationMember> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text, record, index) => <p>{index + 1}</p>
    },
    {
      title: 'Hội viên',
      dataIndex: 'member',
      key: 'member',
      render: (text, record) => <p>{`${record.member.firstName} ${record.member.lastName}`}</p>
    },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Gia hạn lần cuối',
      dataIndex: 'validFrom',
      key: 'validFrom'
    },
    {
      title: 'Có hiệu lực đến',
      dataIndex: 'validUntil',
      key: 'validUntil'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'hasActivated',
      key: 'hasActivated',
      render: (text, record) => <>{<Tag>Đang sử dụng</Tag>}</>
    }
  ]

  return (
    <DefaultLayout title={<ButtonBack />}>
      {plan ? (
        <>
          <div className="mb-4 grid w-full grid-cols-3 gap-4">
            <div className="col-span-1 rounded-md border border-disabled p-2 shadow-sm">
              <p className="mb-4 text-lg font-medium">Thông tin gói đăng ký</p>

              <DetailItemWrapper label="Tên gói đăng ký: " title={plan.name} />
              <DetailItemWrapper
                label="Mức giá: "
                title={new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(plan.monthlyPrice ?? 0)}
              />
              <DetailItemWrapper label="Số lượng tối đa: " title={plan.maxNumOfMembers} />
              <DetailItemWrapper
                label="Người tạo gói: "
                title={
                  <p
                    className="cursor-pointer transition-colors hover:text-primary-4"
                    onClick={() => navigate(`/nhan-vien/${plan.createdBy.id}`)}
                  >{`${plan.createdBy.firstName} ${plan.createdBy.lastName}`}</p>
                }
              />
              <DetailItemWrapper label="Mô tả: " title={plan.description} />
            </div>

            <div className="col-span-2">
              <p className="mb-4 text-lg font-medium">Thống kê đăng ký</p>

              <Registration plan={plan} />
            </div>
          </div>

          <div>
            <p className="mb-4 text-lg font-medium">Danh sách hội viên đăng ký</p>

            <Table
              columns={columns}
              dataSource={Array.from(plan.registrations)}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    navigate(`/hoi-vien/${record.id}`)
                  }
                }
              }}
            />
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-4xl text-primary-4">
          <LoadingOutlined />
        </div>
      )}
    </DefaultLayout>
  )
}

export default Detail
