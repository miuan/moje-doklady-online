import React from 'react'

export interface UserToken {
  token: string
  refreshToken: string
  user: User
}

export interface User {
    id: string,
    email: string,
    verified: boolean,
    roles: UserRole[]
}

export interface UserRole {
  name: string
}

const userToStorage = (userToken: UserToken) => {
    localStorage.setItem('user.token', userToken.token)
    localStorage.setItem('user.refreshToken', userToken.refreshToken)
    localStorage.setItem('user.id', userToken.user.id)
    localStorage.setItem('user.email', userToken.user.email)
    localStorage.setItem('user.verified', Boolean(userToken.user.verified).toString())
    localStorage.setItem('user.roles', userToken.user.roles.map(r=>r.name).toString())
}

const removeUserFromStorage = () => {
  localStorage.removeItem('user.refreshToken')
  localStorage.removeItem('user.token')
  localStorage.removeItem('user.id')
  // localStorage.removeItem('user.email')
  localStorage.removeItem('user.verified')
  localStorage.removeItem('user.roles')
}

const userFromStorage = () => {
    const token = localStorage.getItem('user.token')
    if(!token) {
        return {}
    }

    return {
        token,
        email: localStorage.getItem('user.email'),
        id: localStorage.getItem('user.id'),
        roles: localStorage.getItem('user.roles')?.split(','),
    }
}

// https://kentcdodds.com/blog/how-to-use-react-context-effectively
const UserStateContext = React.createContext<any | null>(null)
const UserDispatchContext = React.createContext<any | null>(null)

const USER_INIT = 'USER_INIT'
const USER_LOGIN = 'USER_LOGIN'
const USER_LOGOUT = 'USER_LOGOUT'

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case USER_INIT: {
      return userFromStorage()
    }
    case USER_LOGIN: {
      userToStorage(action.userToken)
      return {
        id: action.userToken.user.id,
        token: action.userToken.token,
        email: action.userToken.user.email,
        roles: action.userToken.user.roles?.map((r: { name: string })=>r.name),
        verified: Boolean(action.userToken.user.verified),
      } as User
    }
    case USER_LOGOUT: {
      removeUserFromStorage()
      return {}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function UserProvider({children}: any) {
  const [state, dispatch] = React.useReducer(userReducer, userFromStorage())
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

function useUserState() {
  const context = React.useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a UserProvider')
  }
  return context
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUserState, useUserDispatch, USER_INIT, USER_LOGIN, USER_LOGOUT }