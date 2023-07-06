import React from 'react'
import { Outlet } from 'react-router-dom'
import useGymStore from '~/features/gym/GymStore'
import useEquipmentStore from '../equipment/EquipmentStore'
import { useEffectOnce } from 'usehooks-ts'

const Prefetch = () => {
  const [getRooms] = useGymStore(state => [state.getRooms])
  const [getAllEquipments] = useEquipmentStore(state => [state.getAllEquipments])

  useEffectOnce(() => {
    getRooms()
    getAllEquipments()
  })

  return <Outlet />
}

export default Prefetch
