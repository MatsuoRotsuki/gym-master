import { equipmentType } from '~/app/config'
import Detail from './Detail'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Edit from './Edit'

type PropsType = {
  gym: IGym
}

const GymCard = ({ gym }: PropsType) => {
    const navigate = useNavigate()
    const [isDetailOpened, setIsDetailOpened] = useState<boolean>(false)
    const [isUpdateOpened, setIsUpdateOpened] = useState<boolean>(false)
  return (
    <>
    <div className="relative rounded border border-cartBorder text-start shadow-sm transition-shadow hover:shadow-2xl">
    <button
        onClick={() => setIsDetailOpened(true)}
      >
        <img
          src="https://media-cdn.tripadvisor.com/media/photo-s/08/42/6a/61/gym-room.jpg"
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
      <Button
        className="absolute right-0 top-0 border-none"
        type="primary"
        ghost
        icon={<EditOutlined />}
        onClick={(e) => {
          e.preventDefault()
          setIsUpdateOpened(true)
        }}
      />
      <Detail isOpen={isDetailOpened} setIsOpen={setIsDetailOpened} room={gym}></Detail>
      <Edit isOpen={isUpdateOpened} setIsOpen={setIsUpdateOpened} room={gym}></Edit>
    </div>
      {/* <Detail equipment={equipment} isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </>
  )
}

export default GymCard
