import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useUserState, useUserDispatch, USER_INIT, USER_LOGOUT } from '../../app/userContext';
import AdminHeader from './AdminHeader';
import PublicHeader  from './PublicHeader';
import UserHeader from './UserHeader/UserHeader'

export const Header:React.FC = () => {
  const user = useUserState()
  const userDispatch = useUserDispatch()

  const onLogout = () => {
    userDispatch({ type: USER_LOGOUT })
  }

  if (user && user.token) {
    if(user.roles.indexOf('admin') !== -1) return (<AdminHeader user={user} onLogout={onLogout} />)
    else return (<UserHeader user={user} onLogout={onLogout} />)
  }

  return <PublicHeader />
}

export default Header