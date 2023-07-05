import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useGymStore from '~/features/gym/GymStore'
import GymCard from './GymCard'

const List = () => {
  const [rooms] = useGymStore(state => [state.rooms])

  return (
    <DefaultLayout>
      <div className="grid grid-cols-4 gap-4 p-8">
        {rooms?.map((room, index) => (
          <GymCard gym={room}/>
        ))}
        {rooms.length === 0 && <LoadingOutlined />}
      </div>
    </DefaultLayout>
  )
}

export default List
