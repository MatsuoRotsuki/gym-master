import { equipmentType } from '~/app/config'
import Detail from './Detail'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, WarningFilled } from '@ant-design/icons'
import Edit from './Edit'
import { toast } from 'react-toastify'
import { showDeleteConfirm } from '~/components/Layout/ConfirmModal'
import { deleteStaff } from '~/lib/staff'
import useGymStore from './GymStore'
import useAuth from '~/hooks/useAuth'

type PropsType = {
  gym: IGym
  staff: IStaff
}

const GymCard = ({ gym, staff }: PropsType) => {
  const [isDetailOpened, setIsDetailOpened] = useState<boolean>(false)
  const [isUpdateOpened, setIsUpdateOpened] = useState<boolean>(false)
  const [deleteGym] = useGymStore(state => [state.deleteGym])

  const { isAdmin } = useAuth()

  return (
    <>
      <div className="relative rounded border border-cartBorder text-start shadow-sm transition-shadow hover:shadow-2xl">
        <button onClick={() => setIsDetailOpened(true)}>
          <img
            src={
              gym.image ??
              'https://media-cdn.tripadvisor.com/media/photo-s/08/42/6a/61/gym-room.jpg'
            }
            alt="equipment image"
            className="aspect-square w-full rounded-t object-cover"
          />

          <div className="px-3 py-2 text-start">
            <p className="text-lg font-semibold">{gym.name}</p>
            <p className="text-gray-500 text-sm">{gym.address}</p>
          </div>
        </button>

        {isAdmin && (
          <Space className="absolute bottom-2 right-2 border-none">
            <EditOutlined
              className="cursor-pointer text-lg text-primary-4"
              onClick={() => {
                setIsUpdateOpened(true)
              }}
            />

            <Popconfirm
              title="Bạn có chắc muốn xóa phòng tập này ?"
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={async () => {
                try {
                  await deleteGym(gym.id as string)
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
              }}
            >
              <DeleteOutlined className="cursor-pointer text-lg text-danger" />
            </Popconfirm>
          </Space>
        )}

        <Detail
          isOpen={isDetailOpened}
          setIsOpen={setIsDetailOpened}
          room={gym}
          staff={staff}
        ></Detail>
        <Edit isOpen={isUpdateOpened} setIsOpen={setIsUpdateOpened} room={gym}></Edit>
      </div>
    </>
  )
}

export default GymCard
