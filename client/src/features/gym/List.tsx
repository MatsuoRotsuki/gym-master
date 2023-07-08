import React, { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import DefaultLayout from '~/components/Layout/DefaultLayout'
import useGymStore from '~/features/gym/GymStore'
import GymCard from './GymCard'
import { Button, Space } from 'antd'
import useStaffStore from '../staff/StaffStore'
import { useEffectOnce } from 'usehooks-ts'
import Create from './Create'
import useAuth from '~/hooks/useAuth'

const List = () => {
  const [rooms] = useGymStore(state => [state.rooms])
  const [addRoom, setAddRoom] = useState<boolean>(false)
  const [staff, getStaffById] = useStaffStore(state => [state.staff, state.getStaffById])

  const { isAdmin } = useAuth()

  useEffectOnce(() => {
    getStaffById('1')
  })
  return (
    <DefaultLayout title="Danh sách phòng tập">
      {isAdmin && (
        <Button
          type="primary"
          ghost
          className="mb-2"
          onClick={() => {
            setAddRoom(true)
          }}
        >
          Thêm phòng tập mới
        </Button>
      )}

      <Create isOpen={addRoom} setIsOpen={setAddRoom} />

      <div className="grid grid-cols-4 gap-4">
        {rooms?.map((room, index) => (
          <GymCard gym={room} staff={staff} />
        ))}
        {rooms.length === 0 && <LoadingOutlined />}
      </div>
    </DefaultLayout>
  )
}

export default List
