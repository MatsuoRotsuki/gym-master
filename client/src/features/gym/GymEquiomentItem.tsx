import React, { useState } from 'react'
import { equipmentType } from '~/app/config'
import { Popconfirm, Space, message } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import useGymStore from './GymStore'
import Detail from '../equipment/Detail'
import Edit from '../equipment/Edit'
import useAuth from '~/hooks/useAuth'

type PropsType = {
  equipment: IEquipment
  room: IGym
}

const GymEquipmentItem = ({ equipment, room }: PropsType) => {
  const [deleteGymEquipment] = useGymStore(state => [state.deleteGymEquipment])

  const { isAdmin, isStaff } = useAuth()
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false)
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)

  return (
    <>
      <div className="relative rounded border border-cartBorder shadow-sm transition-shadow hover:shadow-2xl">
        <button className="text-start" onClick={() => setIsDetailOpen(true)}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/gym-master-3bb8c.appspot.com/o/images%2Fgym-equipment.jpg?alt=media&token=d30ba9f2-7edf-4e36-a2b5-3586fba43f65"
            alt="equipment image"
            className="aspect-square w-full rounded-t object-cover"
          />

          <div className="max-w-[15rem] px-3 py-2">
            <p className="truncate text-lg font-semibold">{equipment.name}</p>
            <p className="text-gray-500 truncate text-sm">{equipment.manufacturer}</p>
          </div>

          <div className="absolute top-2 rounded-sm bg-equipmentType px-2 text-base shadow-sm">
            {equipmentType[equipment.type]}
          </div>
        </button>

        {(isStaff || isAdmin) && (
          <Space className="absolute bottom-2 right-2 gap-1">
            <EditOutlined
              className="cursor-pointer px-1 text-lg text-primary-4"
              onClick={() => setIsEditOpen(true)}
            />

            <Popconfirm
              title="Bạn có chắc muốn xóa thiết bị này ở phòng tập này?"
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={async () => {
                await deleteGymEquipment(room.id, equipment.id)
                message.open({
                  type: 'success',
                  content: 'Xóa thiết bị ở phòng tập này thành công !'
                })
                window.location.reload()
              }}
            >
              <DeleteOutlined className="cursor-pointer px-1 text-lg text-danger" />
            </Popconfirm>
          </Space>
        )}
      </div>

      <Detail equipment={equipment} isOpen={isDetailOpen} setIsOpen={setIsDetailOpen} />
      <Edit equipment={equipment} isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
    </>
  )
}

export default GymEquipmentItem
