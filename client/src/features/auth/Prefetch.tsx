import React from 'react'
import { Outlet } from 'react-router-dom'
import useGymStore from '~/features/gym/GymStore'
import useEquipmentStore from '../equipment/EquipmentStore'
import { useEffectOnce } from 'usehooks-ts'
import useMemberStore from '../member/MemberStore'

const Prefetch = () => {
  const [getRooms] = useGymStore(state => [state.getRooms])
  const [getAllEquipments] = useEquipmentStore(state => [state.getAllEquipments])
  const [getAllMembers] = useMemberStore(state => [state.getAllMembers])

  useEffectOnce(() => {
    getRooms()
    getAllEquipments()
    getAllMembers()
  })

  return <Outlet />
}

export default Prefetch
