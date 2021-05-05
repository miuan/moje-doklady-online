import React, { useState, useEffect } from "react";
import FilteredList from "../../../components/List/filtered-list";
import gql from 'graphql-tag';
import { useUserState } from "../../../app/userContext";

const USER_LIST_QUERY = gql`
  query allOrganizations($filter: OrganizationFilter){ 
    allOrganizations(filter: $filter) {
      id
      name,
      tel,
      www
    }}
`;

const ADMIN_LIST_QUERY = gql`
  query allUserRoles($filter: UserRoleFilter) {
  allUserRoles(filter: $filter) {
      id,
      name
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteUserRole($id: ID!) {
    deleteUserRole(id: $id) {
      id
    }
  }
`;


export const OrganizationList: React.FC<{userId?: string, adminMode?: boolean}> = ({userId, adminMode=false}) => {
  const user = useUserState()
  
    return (
        <div>
            <FilteredList 
                name={'Organizations'}
                fields={['name', 'tel', 'www']}
                userId={user.id} 
                adminMode={adminMode}
                queries={{USER_LIST_QUERY, ADMIN_LIST_QUERY, DELETE_MUTATION}} />
        </div>
    )
}

export default OrganizationList