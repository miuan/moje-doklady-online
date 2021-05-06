import React from "react";
import gql from 'graphql-tag';
import FilteredList from "../../../components/List/FilteredList";
import ConnectBase from "../../../components/List/ConnectBase";

const USER_LIST_QUERY = gql`
  query allUsers($filter: UserFilter){ allUsers(filter: $filter) {
      id
      name,
      models
    }}
`;

const ADMIN_LIST_QUERY = gql`
  query allUsers($filter: UserFilter){ allUsers(filter: $filter) {
      id
      email,
      password,
      roles {
        id
        name
      }
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const USER_ROLE_QUERY = gql`
  query allUserRoles{ allUserRoles {
      id
      name
    }}
`;

const ADD_MUTATION = gql`
  mutation addToRoleOnUser($id1: ID!, $id2: ID!) { addTo_RoleOnUser(rolesUserRoleId:$id1, usersUserId:$id2) {
    rolesUserRole {
      id
    } usersUser {
      id
    }
  }}
`;

const REMOVE_MUTATION = gql`
  mutation removeFromRoleOnUser($id1: ID!, $id2: ID!) { removeFrom_RoleOnUser(rolesUserRoleId:$id1, usersUserId:$id2) {
    rolesUserRole {
      id
    } usersUser {
      id
    }
  }}
`;


const ConnectRole: React.FC<{value:any, names?:any, item:any}> = ({value,names, item}) => {
 

  const gql = {
    QUERY: USER_ROLE_QUERY,
    ADD: ADD_MUTATION,
    REMOVE: REMOVE_MUTATION
  }

  return <ConnectBase value={value} names={names} gql={gql} item={item}/>
}

export const UsersList: React.FC<{userId?: string, adminMode?: boolean}> = ({userId, adminMode=false}) => {
    return (
        <div>
            <FilteredList 
                name={'Users'}
                fields={['email','password', {name: 'roles.name', component: ConnectRole}, 'roles.id']}
                userId={userId} 
                adminMode={adminMode}
                queries={{USER_LIST_QUERY, ADMIN_LIST_QUERY, DELETE_MUTATION}} />
        </div>
    )
}

export default UsersList