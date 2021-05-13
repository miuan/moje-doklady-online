import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../app/store'


export const ALL_ORGANIZATION_QUERY = loader('./graphql/allOrganizations.gql')

const UserHeader = ({user, onLogout}:any) =>  {
  const selected = useSelector((state:RootState) => state.organization.selected)
  const dispatch = useDispatch()
  
  const [orgs, setOrgs] = useState<{id:string; name:string}[]>([])
  const { refetch: userRefetch, loading: userLoading } = useQuery(ALL_ORGANIZATION_QUERY, {
    onError: (e) => {

    }, onCompleted: (raw) => {
      const data = raw[Object.keys(raw)[0]];
      setOrgs(data)
    },
    variables: {filter:{AND:[{user_every:{id:user.id}}]}}
  })

  
  return ( <div className="header-light transparent scroll-light container">
<div className="row">
  <div className="col-md-2">
  <Dropdown>
    <Dropdown.Toggle variant="normal" id="dropdown-basic">
      Menu
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="/user/customers">Customers</Dropdown.Item>
      <Dropdown.Item href="/user/invoices">Invoices</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  </div>
  <div className="header-text col-md-8">
    <div>
      This Header only for anybody who is logged in
    </div>
  </div>
  <div className="col-md-2">
  <Dropdown>
    <Dropdown.Toggle variant="normal" id="dropdown-basic">
      Organizations
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {orgs.map(org=>(<Dropdown.Item >{org.name} <Link className="" to={`/user/organizations/${org.id}`}>edit</Link></Dropdown.Item>))}
      <Dropdown.Item href="/user/organizations/create" >+ Organization</Dropdown.Item>
      <Dropdown.Item href="/"><Link className="" to="/" onClick={onLogout}>Logout</Link></Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  </div>
</div>
</div>)}

export default UserHeader