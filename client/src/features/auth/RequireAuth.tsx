import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'

const RequireAuth = () => {
  const location = useLocation()
  const { role } = useAuth()

  const content: React.ReactElement = role ? (
    <Outlet />
  ) : (
    <Navigate to="/dang-nhap" state={{ from: location }} replace />
  )

  return content
}

export default RequireAuth
