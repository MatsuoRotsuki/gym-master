import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useGymStore from '~/features/gym/GymStore'

const Prefetch = () => {
  const [getRooms] = useGymStore(state => [state.getRooms])

  useEffect(() => {
    getRooms()
  }, [getRooms])

  return <Outlet />
}

export default Prefetch
