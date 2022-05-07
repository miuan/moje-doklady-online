import React, { useEffect } from 'react'
import { loader } from 'graphql.macro'
import { useParams } from 'react-router-dom'
import * as _ from 'lodash'
import { CustomerView } from './CustomerView'
import EntityCart from './EntityCard'
import { useSelector } from 'react-redux'
import { organizationsSelected } from '../../../features/organization/organizationReducer'
import { useQuery } from '@apollo/client'
import Loading from '../../../components/common/Loading'
import { Button } from 'react-bootstrap'

export const CREATE_MUTATION = loader('../../../gen/Invoice/graphql/create.gql')
export const UPDATE_MUTATION = loader('../../../gen/Invoice/graphql/update.gql')
export const ONE_QUERY = loader('../../../gen/Invoice/graphql/one.gql')

export const FIELDS = [{ name: 'name', label: 'Name', required: true }]

export const InvoiceEditForm: (obj: any) => any = ({ data, onSubmit }) => {
  const organization = useSelector(organizationsSelected)
  const [stateData, setStateData] = React.useState<any>({})

  useEffect(() => {
    //if (data && stateData?.organization?.id !== organization?.id) {
    setStateData((sd: any) => ({ ...sd, organizationId: organization?.id }))
    //}
  }, [setStateData, organization])

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
              <CustomerView
                onCustomerSelect={(customerId) => setStateData((sd: any) => ({ ...sd, customerId }))}
                selectedCustomerId={stateData?.customerId || data?.customer?.id}
              />
            </td>
            <td>
              <EntityCart entity={organization} />
            </td>
          </tr>
        </tbody>
      </table>
      <Button onClick={() => onSubmit(stateData)}>save</Button>
    </div>
  )
}

export default InvoiceEditForm
