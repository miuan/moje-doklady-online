import React from 'react'
import { loader } from 'graphql.macro'
import { useParams } from 'react-router-dom'
import * as _ from 'lodash'
import { CustomerView } from './CustomerView'

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

  const id = params.id !== 'create' && params.id

  return (
    <div className={`base-edit-Invoice base-edit`}>
      <CustomerView onCustomerSelect={() => {}} />
    </div>
  )
}

export default InvoiceEdit
