import { useQuery } from '@apollo/client'
import { Form } from 'react-bootstrap'

import { useUserState } from '../../../app/userContext'
import { USER_LIST_QUERY } from '../../../gen/Customer/List'

export type CustomerViewType = {
  onCustomerSelect: (id: number) => void
}

export const CustomerView: (obj: CustomerViewType) => any = ({ onCustomerSelect }) => {
  const user = useUserState()

  const { loading, refetch, data } = useQuery(USER_LIST_QUERY, { variables: { filter: { AND: [{ user_every: { id: user.id } }] } } })

  return (
    <div className={`base-view-Customer base-view`}>
      <Form inline>
        <Form.Control as="select">
          <option disabled>Open this select menu</option>
          {data?.allCustomer &&
            data.allCustomer.map((d: any) => (
              <option value={d.id}>
                {d.name}, {d.street}, {d.city}, {d.ico}{' '}
              </option>
            ))}
        </Form.Control>
      </Form>
    </div>
  )
}
