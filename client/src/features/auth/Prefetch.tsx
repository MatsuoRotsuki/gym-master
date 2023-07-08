import React from 'react'
import { Outlet } from 'react-router-dom'
import useGymStore from '~/features/gym/GymStore'
import useEquipmentStore from '../equipment/EquipmentStore'
import { useEffectOnce } from 'usehooks-ts'
import useMemberStore from '../member/MemberStore'
import useStaffStore from '../staff/StaffStore'
import useFeedbackStore from '../feedback/FeedbackStore'
import useSubscriptionStore from '../subscription/SubscriptionStore'

const Prefetch = () => {
  const [getRooms] = useGymStore(state => [state.getRooms])
  const [getAllEquipments] = useEquipmentStore(state => [state.getAllEquipments])
  const [getAllMembers] = useMemberStore(state => [state.getAllMembers])
  const [getAllStaffs] = useStaffStore(state => [state.getAllStaffs])
  const [getAllFeedbacks] = useFeedbackStore(state => [state.getAllFeedbacks])
  const [getAllPlans] = useSubscriptionStore(state => [state.getAllPlans])

  useEffectOnce(() => {
    getRooms()
    getAllEquipments()
    getAllMembers()
    getAllFeedbacks()
    getAllPlans()
    getAllStaffs()
    getAllFeedbacks()
  })

  return <Outlet />
}

export default Prefetch
