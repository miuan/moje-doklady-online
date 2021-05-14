import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { SelectCallback } from 'react-bootstrap/esm/helpers'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { TOrganization } from '../../../app/reducers/organizationSlice'


export const OrganizationItem = ({org, onSelectOrg, selected}: {org:TOrganization, onSelectOrg:SelectCallback, selected?: boolean}) => {
    const name = org.name

    return (
        <React.Fragment>
            <Dropdown.Item onSelect={onSelectOrg} eventKey={org.id}> 
                {selected? <b>{name}</b> : <span>{name}</span> }
            <Link className="" to={`/user/organizations/${org.id}`}>edit</Link></Dropdown.Item>
        </React.Fragment>
    )
}

export default React.memo(OrganizationItem)