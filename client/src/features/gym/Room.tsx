import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useGymStore from '~/stores/GymStore'

const Room = () => {
  const [rooms] = useGymStore(state => [state.rooms])

  return (
    <DefaultLayout>
      <div className="grid grid-cols-4 gap-4 p-8">
        {rooms?.map((room, index) => (
          <div
            key={index}
            className="flex cursor-pointer flex-col items-start justify-start gap-2 rounded-md bg-bgDefault p-4 shadow-md"
          >
            <p className="text-xl font-medium">{room.name}</p>
            <p>{room.address}</p>
            <p>{room.hotline}</p>
            <p>{room.email}</p>
          </div>
        ))}
        {rooms.length === 0 && <LoadingOutlined />}
      </div>
    </DefaultLayout>
  )
}

export default Room
