import React, { useState, useEffect } from "react";
import FilteredList from "../../../components/List/FilteredList";
import gql from 'graphql-tag';

const USER_LIST_QUERY = gql`
  query allUsers($filter: UserFilter){ allUsers(filter: $filter) {
      id
      name,
      models
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


export const UserRoleList: React.FC<{userId?: string, adminMode?: boolean}> = ({userId, adminMode=false}) => {
    return (
        <div>
            <FilteredList 
                name={'Roles'}
                fields={['name']}
                userId={userId} 
                adminMode={adminMode}
                queries={{USER_LIST_QUERY, ADMIN_LIST_QUERY, DELETE_MUTATION}} />
        </div>
    )
}

export default UserRoleList