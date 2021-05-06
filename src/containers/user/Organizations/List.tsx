import React, { useState, useEffect } from "react";
import FilteredList from "../../../components/List/FilteredList";
import gql from 'graphql-tag';
import { useUserState } from "../../../app/userContext";
import { loader } from "graphql.macro";

const USER_LIST_QUERY = loader('./graphql/all.gql')
const DELETE_MUTATION = loader('./graphql/delete.gql')
const ADMIN_LIST_QUERY = USER_LIST_QUERY

export const FIELDS = ['name', 'ico', 'www']

export const OrganizationList: React.FC<{userId?: string, adminMode?: boolean, name?: string, fields?: any}> = ({userId, adminMode=false, name, fields}) => {
  const user = useUserState()
  return (
      <div>
          <FilteredList 
              name={name || 'Organizations'}
              fields={fields || FIELDS}
              userId={user.id} 
              adminMode={adminMode}
              queries={{USER_LIST_QUERY, ADMIN_LIST_QUERY, DELETE_MUTATION}} />
      </div>
  )
}

export default OrganizationList