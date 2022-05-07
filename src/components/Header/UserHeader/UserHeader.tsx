import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import { useQuery } from '@apollo/client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../features/store'
import { useAppDispatch } from '../../../features/hooks'
import { loadAll, organizationsAll } from '../../../features/organization/organizationReducer'

const UserHeader = ({ user, onLogout }: any) => {
  const dispatch = useAppDispatch()
  const orgs = useSelector(organizationsAll)

  useEffect(() => {
    dispatch(loadAll())
  }, [dispatch])

  return (
    <div className="header-light transparent scroll-light container">
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
          <div>This Header only for anybody who is logged in</div>
        </div>
        <div className="col-md-2">
          <Dropdown>
            <Dropdown.Toggle variant="normal" id="dropdown-basic">
              Organizations
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {orgs.map((org: any) => (
                <Dropdown.Item>
                  {org.name}{' '}
                  <Link className="" to={`/user/organizations/${org.id}`}>
                    edit
                  </Link>
                </Dropdown.Item>
              ))}
              <Dropdown.Item href="/user/organizations/create">+ Organization</Dropdown.Item>
              <Dropdown.Item href="/">
                <Link className="" to="/" onClick={onLogout}>
                  Logout
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default UserHeader
