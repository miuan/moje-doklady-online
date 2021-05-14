import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { RootState } from '../../app/store'
import { useUserState } from '../../app/userContext'

export const ProtectRoute:React.FC<{path:string, role?:string, exact?:boolean}> = ({path, role, exact, children}) => {
    const user = useUserState()
    
    const selectedOrganization = useSelector((state:RootState) => state.organization.selected)

    if(role && user.roles.indexOf(role) === -1){
        return (<Redirect to={`/login?path=${path}&role=${role}`} />)
    }

    if(!user.token) {
        return (<Redirect to={`/login?path=${path}`} />)
    }

    if(!selectedOrganization){
        return (<Redirect to={`/user/organizations/create?path=${path}`} />)
    }

    return (<Route path={path} exact={exact} children={children} />)
}

export default ProtectRoute