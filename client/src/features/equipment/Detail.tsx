import React from 'react'
import { Modal } from 'antd'
import { equipmentType } from '~/app/config'
import { useNavigate } from 'react-router-dom'

type PropsType = {
  equipment: IEquipment
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
    <div className={`grid w-full grid-cols-5 items-start font-medium ${className}`}>
      <p className="col-span-2 text-base text-noneSelected">{label}</p>
      <div className="col-span-3">{title}</div>
    </div>
  )
}

const Detail = ({ equipment, isOpen, setIsOpen }: PropsType) => {
  const navigate = useNavigate()

  return (
    <Modal
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      width={880}
      footer={[<></>]}
      centered
    >
      <div className="flex w-full items-start justify-start gap-4">
        <img
          src={
            equipment.image ??
            'https://firebasestorage.googleapis.com/v0/b/gym-master-3bb8c.appspot.com/o/images%2Fgym-equipment.jpg?alt=media&token=d30ba9f2-7edf-4e36-a2b5-3586fba43f65'
          }
          alt="equipment-image"
          className="aspect-square w-[25rem] rounded-md object-cover"
        />

        <div className="flex w-full flex-col items-start justify-start gap-2">
          <DetailWrapper className="text-base" label="Tên sản phẩm: " title={equipment.name} />

          <DetailWrapper
            label="Phân loại: "
            title={
              <p className="w-max rounded bg-disabled px-2 py-0.5 shadow-sm">
                {equipmentType[equipment.type]}
              </p>
            }
          />

          <DetailWrapper
            className="text-base"
            label="Nhà sản xuất: "
            title={equipment.manufacturer}
          />

          <DetailWrapper className="text-base" label="Mô tả: " title={equipment.description} />

          {equipment.gyms?.length !== 0 && (
            <div>
              <p className="col-span-2 text-base font-medium text-noneSelected">
                Nằm ở phòng gym:{' '}
              </p>

              <div className="hidden-scroll-bar mt-2 grid max-h-[14rem] grid-cols-3 gap-1 overflow-y-auto">
                {equipment.gyms?.map((gym, index) => (
                  <button
                    key={`each-gym-room-${gym.id}-${index}`}
                    className=" rounded-md border border-disabled p-1 shadow-sm transition-shadow hover:shadow-xl"
                    onClick={() => navigate(`/phong-tap/${gym.id}`)}
                  >
                    <img
                      className="aspect-square w-[8rem] rounded-md shadow-sm"
                      src="https://firebasestorage.googleapis.com/v0/b/gym-master-3bb8c.appspot.com/o/images%2FFree%20Vector%20_%20Gradient%20home%20gym%20with%20machines.jpg?alt=media&token=60366a2b-d7bb-4e77-a304-25bbf7f667db"
                      alt="gym-room-image"
                    />

                    <p className="text-start text-base font-medium">{gym.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default Detail
