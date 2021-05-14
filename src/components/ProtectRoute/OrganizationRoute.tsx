import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useUserState } from '../../app/userContext'

export const ProtectRoute:React.FC<{path:string, role?:string, exact?:boolean}> = ({path, role, exact, children}) => {
    const user = useUserState()

    if(role && user.roles.indexOf(role) === -1){
        return (<Redirect to={`/login?path=${path}&role=${role}`} />)
    }

    if(!user.token) {
        return (<Redirect to={`/login?path=${path}`} />)
    }

    return (<Route path={path} exact={exact} children={children} />)
}

export default ProtectRoute