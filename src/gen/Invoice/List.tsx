import React from 'react'
import { loader } from 'graphql.macro'

import FilteredList from '../../components/List/FilteredList'
import { useUserState } from '../../features/userContext'
import { useSelector } from 'react-redux'
import { activeUserId } from '../../features/user/userSlice'

export const USER_LIST_QUERY = loader('./graphql/all.gql')
export const DELETE_MUTATION = loader('./graphql/delete.gql')
export const ADMIN_LIST_QUERY = USER_LIST_QUERY

export const FIELDS = [{ name: 'name', title: 'Name' }]

export type InvoiceListType = {
  adminMode?: boolean
  name?: string
  fields?: any
  allQuery?: any
  adminQuery?: any
  deleteMutation?: any
}

export const InvoiceList: React.FC<InvoiceListType> = ({ adminMode = false, name, fields, allQuery, adminQuery, deleteMutation }) => {
  const userId = useSelector(activeUserId)
  return (
    <div className={`filtered-list-Invoice filtered-list`}>
      {userId && (
        <FilteredList
          name={name || 'Invoices'}
          fields={fields || FIELDS}
          userId={userId}
          adminMode={adminMode}
          queries={{
            USER_LIST_QUERY: allQuery || USER_LIST_QUERY,
            ADMIN_LIST_QUERY: adminQuery || ADMIN_LIST_QUERY,
            DELETE_MUTATION: deleteMutation || DELETE_MUTATION,
          }}
        />
      )}
    </div>
  )
}

export default InvoiceList
