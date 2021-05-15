import React from "react";
import { loader } from "graphql.macro";

import FilteredList from "../../components/List/FilteredList";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/reducers/userSlice";



export const USER_LIST_QUERY = loader('./graphql/all.gql')
export const DELETE_MUTATION = loader('./graphql/delete.gql')
export const ADMIN_LIST_QUERY = USER_LIST_QUERY

export const FIELDS = [{name: 'name', title:'Name'},
{name: 'street', title:'Street'},
{name: 'zip', title:'Zip'},
{name: 'city', title:'City'},
{name: 'country', title:'Country'},
{name: 'ico', title:'Ico'},
{name: 'dic', title:'Dic'},
{name: 'phone', title:'Phone'},
{name: 'www', title:'Www'}]


export type CustomerListType = {
  adminMode?: boolean, 
  name?: string, 
  fields?: any
  allQuery?: any,
  adminQuery?: any,
  deleteMutation?: any
}

export const CustomerList: React.FC<CustomerListType> = ({adminMode=false, name, fields, allQuery, adminQuery, deleteMutation}) => {
  const user = useSelector(selectUser);
  return (
    <div className={`filtered-list-Customer filtered-list`}>
      <FilteredList 
              name={name || 'Customers'}
              fields={fields || FIELDS}
              userId={user?.id} 
              adminMode={adminMode}
              queries={{
                USER_LIST_QUERY:allQuery || USER_LIST_QUERY, 
                ADMIN_LIST_QUERY:adminQuery || ADMIN_LIST_QUERY, 
                DELETE_MUTATION: deleteMutation || DELETE_MUTATION}} />
    </div>
  )
}

export default CustomerList