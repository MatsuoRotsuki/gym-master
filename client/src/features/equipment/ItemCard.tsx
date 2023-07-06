import React, { useState } from 'react'
import { equipmentType } from '~/app/config'
import Detail from './Detail'

type PropsType = {
  equipment: IEquipment
}

const ItemCard = ({ equipment }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <button
        className="relative rounded border border-cartBorder text-start shadow-sm transition-shadow hover:shadow-2xl"
        onClick={() => setIsOpen(true)}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/gym-master-3bb8c.appspot.com/o/images%2Fgym-equipment.jpg?alt=media&token=d30ba9f2-7edf-4e36-a2b5-3586fba43f65"
          alt="equipment image"
          className="aspect-square w-full rounded-t object-cover"
        />

        <div className="px-3 py-2">
          <p className="text-lg font-semibold">{equipment.name}</p>
          <p className="text-gray-500 text-sm">{equipment.manufacturer}</p>
        </div>

        <div className="absolute top-2 rounded-sm bg-equipmentType px-2 text-base shadow-sm">
          {equipmentType[equipment.type]}
        </div>
      </button>

      <Detail equipment={equipment} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default ItemCard
