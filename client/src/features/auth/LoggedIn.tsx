import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'

const LoggedIn = () => {
  const location = useLocation()
  const { role } = useAuth()

  const content: React.ReactElement = !role ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  )

  return content
}

export default LoggedIn
