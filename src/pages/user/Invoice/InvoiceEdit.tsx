import React from 'react'
import { loader } from 'graphql.macro'
import { useParams } from 'react-router-dom'
import * as _ from 'lodash'
import { CustomerView } from './CustomerView'
import EntityCart from './EntityCard'
import { useSelector } from 'react-redux'
import { organizationsSelected } from '../../../features/organization/organizationReducer'

export const CREATE_MUTATION = loader('../../../gen/Invoice/graphql/create.gql')
export const UPDATE_MUTATION = loader('../../../gen/Invoice/graphql/update.gql')
export const ONE_QUERY = loader('../../../gen/Invoice/graphql/one.gql')

export const FIELDS = [{ name: 'name', label: 'Name', required: true }]

export type InvoiceEditType = {
  name?: string
  fields?: any
  createMutation?: any
  updateMutation?: any
  oneQuery?: any
}

export const InvoiceEdit: (obj: InvoiceEditType) => any = ({ name, fields, createMutation, updateMutation, oneQuery }) => {
  let params = useParams() as any
  const organization = useSelector(organizationsSelected)

  const id = params.id !== 'create' && params.id

  return (
    <div className={`base-edit-Invoice base-edit`}>
      <table>
        <thead>
          <tr>
            <td>
              <h5>Odberatel</h5>
            </td>
            <td>
              <h5>Dodavatel</h5>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <CustomerView onCustomerSelect={() => {}} />
            </td>
            <td>
              <EntityCart entity={organization} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InvoiceEdit
