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
import { useForm } from 'react-hook-form'
import FormControl from '../../../components/Editor/FormControl'

export const CREATE_MUTATION = loader('../../../gen/Invoice/graphql/create.gql')
export const UPDATE_MUTATION = loader('../../../gen/Invoice/graphql/update.gql')
export const ONE_QUERY = loader('../../../gen/Invoice/graphql/one.gql')

export const FIELDS = [{ name: 'name', label: 'Name', required: true }]

export const InvoiceEditForm: (obj: any) => any = ({ data, onSubmit }) => {
  const organization = useSelector(organizationsSelected)
  const [stateData, setStateData] = React.useState<any>({})
  // const onSubmit = (data: any) => console.log(data)
  const reactForm = useForm()
  const { register, handleSubmit, formState, setValue, getValues, watch } = reactForm
  const { errors } = formState

  useEffect(() => {
    //if (data && stateData?.organization?.id !== organization?.id) {
    setValue('organizationId', data?.organization?.id || organization?.id)
    //}
  }, [setValue, organization, data])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <div className={`base-edit-Invoice base-edit`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl name={'name'} label={'Name'} required={true} storedData={data} {...reactForm} />
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
                <CustomerView onCustomerSelect={(customerId) => setValue('customerId', customerId)} selectedCustomerId={data?.customer?.id} />
              </td>
              <td>
                <EntityCart entity={organization} />
              </td>
            </tr>
          </tbody>
        </table>
        <Button type="submit">save</Button>
      </form>
    </div>
  )
}

export default InvoiceEditForm
