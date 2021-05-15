import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { selectUser } from '../../app/reducers/userSlice'

export const ProtectRoute:React.FC<{path:string, role?:string, exact?:boolean}> = ({path, role, exact, children}) => {
    const user = useSelector(selectUser);
    const presentRole = role && user && user.roles && user.roles.find(r=>r.name === role)
    
    if(user && user.token && (!role || presentRole)){
        return (<Route path={path} exact={exact} children={children} />)
    }

    if(role) {
        return (<Redirect to={`/login?path=${path}&role=${role}`} />)
    }

    return (<Redirect to={`/login?path=${path}`} />)
}

export default ProtectRoute