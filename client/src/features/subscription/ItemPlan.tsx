import React from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Popconfirm, Space, Tag, message } from 'antd'
import PlanThumbnail from '~/assets/plan-thumbnail.jpg'
import { useNavigate } from 'react-router-dom'
import useSubscriptionStore from './SubscriptionStore'
import useAuth from '~/hooks/useAuth'

type PropsType = {
  plan: IMembership
}

const ItemPlan = ({ plan }: PropsType) => {
  const navigate = useNavigate()

  const { isStaff, isAdmin, isMember, currentUser } = useAuth()
  const [deletePlan] = useSubscriptionStore(state => [state.deletePlan])

  const isSubcribed = plan.registrations.filter(each => each.member.id === currentUser).length > 0

  const onCardClick = () => {
    if (isStaff || isAdmin) {
      navigate(`/goi-tap/${plan.id}`)
      return
    }

    navigate(`/goi-tap/${plan.id}/dang-ky`)
  }

  return (
    <>
      <div className="relative rounded border border-cartBorder shadow-sm transition-shadow hover:shadow-2xl">
        <button className="text-start" onClick={onCardClick}>
          <img
            src={PlanThumbnail}
            alt="equipment-image"
            className="aspect-square w-full rounded-t object-cover"
          />

          <div className="max-w-[15rem] px-3 py-2">
            <p className="truncate text-lg font-semibold">{plan.name}</p>
            <p className="text-gray-500 truncate text-sm">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                plan.monthlyPrice ?? 0
              )}
            </p>
          </div>

          {(isStaff || isAdmin) && (
            <div className="absolute top-2 rounded-sm bg-equipmentType px-2 text-base shadow-sm">
              {`${plan.registrations.length} / ${plan.maxNumOfMembers} `}
            </div>
          )}
          {isMember && isSubcribed && (
            <Tag className="absolute top-2 " color="success">
              Đã đăng ký
            </Tag>
          )}

          <div className="absolute top-2 rounded-sm bg-equipmentType px-2 text-base shadow-sm"></div>
        </button>

        {(isStaff || isAdmin) && (
          <Space className="absolute bottom-2 right-2 gap-1">
            <EditOutlined className="cursor-pointer px-1 text-lg text-primary-4" />

            <Popconfirm
              title="Bạn có chắc muốn xóa gói đăng ký này ?"
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={async () => {
                await deletePlan(plan.id)
                message.open({
                  type: 'success',
                  content: 'Xóa gói đăng ký thành công !'
                })
              }}
            >
              <DeleteOutlined className="cursor-pointer px-1 text-lg text-danger" />
            </Popconfirm>
          </Space>
        )}
      </div>
    </>
  )
}

export default ItemPlan
