import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { selectSelected } from '../../app/reducers/organizationSlice'
import { selectUser } from '../../app/reducers/userSlice'
import { RootState } from '../../app/store'

export const ProtectRoute:React.FC<{path:string, role?:string, exact?:boolean}> = ({path, role, exact, children}) => {
        const user = useSelector(selectUser);
        const presentRole = role && user && user.roles && user.roles.find(r=>r.name === role)
        const selectedOrganization = useSelector(selectSelected)
        
        if(user && user.token && selectedOrganization && (!role || presentRole)) {
            return (<Route path={path} exact={exact} children={children} />)
        }
    
        if(role) {
            return (<Redirect to={`/login?path=${path}&role=${role}`} />)
        }

        if(selectedOrganization){
            return (<Redirect to={`/user/organizations/create?path=${path}`} />)
        }
    
        return (<Redirect to={`/login?path=${path}`} />)
}

export default ProtectRoute