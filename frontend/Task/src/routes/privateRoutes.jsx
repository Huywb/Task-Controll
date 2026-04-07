import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRoutes = ({allowedRoles}) => {
  return <Outlet></Outlet>
}

export default PrivateRoutes
