import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../app/store'
import { changeState, select, setAll, TOrganization } from '../../../app/reducers/organizationSlice'
import OrganizationItem from './OrganizationItem'


export const ALL_ORGANIZATION_QUERY = loader('./graphql/allOrganizations.gql')
export const UPDATE_SELECTED_ORG_ID_MUTATION = loader('./graphql/updateSelectedOrg.gql')

const UserHeader = ({user, onLogout}:any) =>  {
  const stateOrganization = useSelector((state:RootState) => state.organization.state)
  const selectedOrganization = useSelector((state:RootState) => state.organization.selected)
  const allOrganizations: TOrganization[] = useSelector((state:RootState) => state.organization.all)
  const dispatch = useDispatch()
  
  
  const [loadAllOrganizations, { refetch: userRefetch, loading: userLoading }] = useLazyQuery(ALL_ORGANIZATION_QUERY, {
    onError: (e) => {

    }, onCompleted: (raw) => {
      const data = raw[Object.keys(raw)[0]];
      dispatch(setAll(data))
      dispatch(changeState('loaded'))
    },
    variables: {filter:{AND:[{user_every:{id:user.id}}]}}
  })

  const [updateUserSelectedOrgId, { loading, data, error }] = useMutation(UPDATE_SELECTED_ORG_ID_MUTATION);

  useEffect(()=>{
    if(stateOrganization == 'init' && (!allOrganizations || (allOrganizations as []).length < 1)) {
      dispatch(changeState('loading'))
      loadAllOrganizations()
    }
  }, [allOrganizations, stateOrganization])

  const onSelectOrg = (selectedOrgId: any, event: Object) => {
    dispatch(select(selectedOrgId))
    updateUserSelectedOrgId({ variables: { selectedOrgId, userId: user.id } })
  }

  
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
    <Dropdown.Toggle variant={selectedOrganization ? 'normal': 'danger'} id="dropdown-basic">
      {selectedOrganization ? selectedOrganization.name : 'No organization' }
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {allOrganizations.map(org=>(<OrganizationItem org={org} onSelectOrg={onSelectOrg} selected={(selectedOrganization && selectedOrganization.id == org.id)}/>))}
      <Dropdown.Item href="/user/organizations/create" >+ Organization</Dropdown.Item>
      <Dropdown.Item href="/"><Link className="" to="/" onClick={onLogout}>Logout</Link></Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  </div>
</div>
</div>)}

export default UserHeader