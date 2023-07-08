import { equipmentType } from '~/app/config'
import Detail from './Detail'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Space } from 'antd'
import { DeleteOutlined, EditOutlined, WarningFilled } from '@ant-design/icons'
import Edit from './Edit'
import { toast } from 'react-toastify'
import { showDeleteConfirm } from '~/components/Layout/ConfirmModal'
import { deleteStaff } from '~/lib/staff'
import useGymStore from './GymStore'

type PropsType = {
  gym: IGym
  staff: IStaff
}

const GymCard = ({ gym, staff }: PropsType) => {
    const navigate = useNavigate()
    const [isDetailOpened, setIsDetailOpened] = useState<boolean>(false)
    const [isUpdateOpened, setIsUpdateOpened] = useState<boolean>(false)
    const [deleteGym] = useGymStore(state => [
      state.deleteGym
    ])
    const onDelete = (gymId: number) => {
      showDeleteConfirm({
          title: 'Bạn có chắc chắn muốn xóa phòng tập này không?',
          icon: <WarningFilled />,
          onOk: async () => {
              try {
                  await deleteGym(gymId as unknown as string);
                  toast.success('Xóa phòng tập thành công', {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 2000
                  })
              } catch (e) {
                  const err = e as Error
                  console.log(err.message)
                  toast.error((err as Error).message, {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 2000
                  })
              }
          }
      })
  }
  return (
    <>
    <div className="relative rounded border border-cartBorder text-start shadow-sm transition-shadow hover:shadow-2xl">
    <button
        onClick={() => setIsDetailOpened(true)}
      >
        <img
          src={gym.image ?? "https://media-cdn.tripadvisor.com/media/photo-s/08/42/6a/61/gym-room.jpg"}
          alt="equipment image"
          className="aspect-square w-full rounded-t object-cover"
        />

        <div className="px-3 py-2">
          <p className="text-lg font-semibold">{`${gym.name}`}</p>
          <p className="text-gray-500 text-sm">{`Địa chỉ: ${gym.address}`}</p>
        </div>

        {/* <div className="absolute top-2 rounded-sm bg-equipmentType px-2 text-base shadow-sm">
          {equipmentType[equipment.type]}
        </div> */}
      </button>
      <Space className="absolute right-0 top-0 border-none">
        <EditOutlined 
          className="text-primary-4"  
          onClick={(e) => {
            e.preventDefault()
            setIsUpdateOpened(true)
          }}
        />
          <DeleteOutlined className="text-danger"  
            onClick={(e) => {
              e.preventDefault()
              onDelete(gym.id as unknown as number);
            }}
          />
      </Space>
      <Detail isOpen={isDetailOpened} setIsOpen={setIsDetailOpened} room={gym} staff={staff}></Detail>
      <Edit isOpen={isUpdateOpened} setIsOpen={setIsUpdateOpened} room={gym}></Edit>
    </div>
      {/* <Detail equipment={equipment} isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </>
  )
}

export default GymCard
