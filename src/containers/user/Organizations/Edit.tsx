import React, { useState, useEffect, useCallback } from "react";
import * as _ from 'lodash'

import { loader } from 'graphql.macro';

import BaseEdit from "../../../components/Editor/Edit"
import { useParams } from "react-router-dom";

const CREATE_MUTATION = loader('./graphql/create.gql')
const UPDATE_MUTATION = loader('./graphql/update.gql')
const QUERY = loader('./graphql/query.gql');


export const UserRoleEdit = () => {
  let {id} = useParams() as any;
  
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