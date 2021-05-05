import React, { useState, useEffect, useCallback } from "react";
import * as _ from 'lodash'
import gql from "graphql-tag";

import BaseEdit from "../../../components/Editor/Edit"


const CREATE_MUTATION = gql`
  mutation createOrganization(
    $userId: ID!,
    $name: String!,
    $street: String!,
    $psc: String!,
    $city: String!,
    $country: String!,
    $ico: String!,
    $dic: String,
    $tel: String,
    $www: String,
    $type: String) {
    createOrganization(
      userId: $userId
      name: $name,
      street: $street,
      psc: $psc,
      city: $city,
      country: $country,
      ico: $ico,
      dic: $dic,
      tel: $tel,
      www: $www,
      type: $type
      ) {
      id
      name,
      street,
      psc,
      city,
      country,
      ico,
      dic
      tel,
      www,
      type
      
    }
  }
`;

const UPDATE_MUTATION = gql`
  mutation updateUserRole($id:ID!, $role: String!) {
    updateUserRole(id: $id, role: $role) {
      id
      role
    }
  }
`;

const QUERY = gql`
  query userRole($id:ID){ UserRole(id:$id) {
      id,
      role,
    }}
`;

export const UserRoleEdit = (data:any) => {
  const id = _.get(data, 'match.params.id')
  

  return (
    <>
      <BaseEdit 
        id={id} 
        name={'Organization'}
        fields={['name','street','psc','city', 'country', 'ico','dic','tel','www']}
        query={{
            CREATE_MUTATION,
            UPDATE_MUTATION,
            QUERY
        }}
      />
    </>
  );
};

export default UserRoleEdit