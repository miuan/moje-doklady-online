import { useQuery } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal, Table, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { activeUserId } from '../../../features/user/userSlice'

import { USER_LIST_QUERY } from '../../../gen/Customer/List'
import { CustomerSelectModal } from './CustomerSelectModal'
import EntityCard from './EntityCard'

export type CustomerViewType = {
  onCustomerSelect: (id: number) => void
  selectedCustomerId?: number
}

export const CustomerView: (obj: CustomerViewType) => any = ({ onCustomerSelect, selectedCustomerId }) => {
  const userId = useSelector(activeUserId)
  const [showSelectCustomer, setShowSelectCustomer] = useState(false)
  const [customer, selectCustomer] = useState<any>(false)

  const { loading, refetch, data } = useQuery(USER_LIST_QUERY, { variables: { filter: { AND: [{ user_every: { id: userId } }] } } })

  const onSelectCustomer = useCallback(
    (item: any) => {
      setShowSelectCustomer(false)
      onCustomerSelect(item.id)
      //selectCustomer(item)
    },
    [setShowSelectCustomer, onCustomerSelect],
  )

  useEffect(() => {
    if (data?.allCustomer?.length > 0 && selectedCustomerId) {
      const customer = data.allCustomer.find((customer: any) => customer.id === selectedCustomerId)
      selectCustomer(customer)
    }
  }, [data, selectedCustomerId, selectCustomer])

  return (
    <div className={`base-view-Customer base-view`}>
      <EntityCard entity={customer} onChange={() => setShowSelectCustomer(true)} />
      <CustomerSelectModal show={showSelectCustomer} onHide={() => setShowSelectCustomer(false)} onSelect={onSelectCustomer} data={data?.allCustomer}>
        {[
          <>
            <td>#</td>
            <td>Name</td>
            <td>Addres</td>
            <td>ICO</td>
          </>,
          (index: number, customer: any) => (
            <>
              <td>{index}</td>
              <td>{customer.name}</td>
              <td>
                {customer.city}, {customer.street}, {customer.zip}{' '}
              </td>
              <td>{customer.ico}</td>
            </>
          ),
        ]}
      </CustomerSelectModal>
    </div>
  )
}
