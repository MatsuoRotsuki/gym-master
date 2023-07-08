import React from 'react'
import { Outlet } from 'react-router-dom'
import useGymStore from '~/features/gym/GymStore'
import useEquipmentStore from '../equipment/EquipmentStore'
import { useEffectOnce } from 'usehooks-ts'
import useMemberStore from '../member/MemberStore'
import useStaffStore from '../staff/StaffStore'

const Prefetch = () => {
  const [getRooms] = useGymStore(state => [state.getRooms])
  const [getAllEquipments] = useEquipmentStore(state => [state.getAllEquipments])
  const [getAllMembers] = useMemberStore(state => [state.getAllMembers])
  const [getAllStaffs] = useStaffStore(state => [state.getAllStaffs])
  const [getAllFeedbacks] = useGymStore(state => [state.getAllFeedbacks])
  useEffectOnce(() => {
    getRooms()
    getAllEquipments()
    getAllMembers()
    getAllStaffs()
    getAllFeedbacks()
  })

  return <Outlet />
}

export default Prefetch
