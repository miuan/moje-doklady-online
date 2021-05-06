import React from "react";
import { loader } from 'graphql.macro';
import { useParams } from "react-router-dom";
import * as _ from 'lodash'

import BaseEdit from "../../components/Editor/Edit"

export const CREATE_MUTATION = loader('./graphql/create.gql')
export const UPDATE_MUTATION = loader('./graphql/update.gql')
export const ONE_QUERY = loader('./graphql/one.gql');

export const FIELDS = [{name: 'name', label:'Name'},
{name: 'street', label:'Street'},
{name: 'zip', label:'Zip'},
{name: 'city', label:'City'},
{name: 'country', label:'Country'},
{name: 'ico', label:'Ico'},
{name: 'dic', label:'Dic'},
{name: 'phone', label:'Phone'},
{name: 'www', label:'Www'},
{name: 'id', label:'Id'}]

export type CustomerEditType = {
    name?: string, 
    fields?: any
    createMutation?: any,
    updateMutation?: any,
    oneQuery?: any
  }

export const CustomerEdit:(obj:CustomerEditType)=>any = ({name, fields, createMutation, updateMutation, oneQuery }) => {
  let {id} = useParams() as any;
  
  return (<div className={`base-edit-Customer base-edit`}>
      <BaseEdit 
        id={id} 
        name={name || 'Customers'}
        fields={fields || FIELDS}
        query={{
            CREATE_MUTATION: createMutation || CREATE_MUTATION,
            UPDATE_MUTATION: updateMutation || UPDATE_MUTATION,
            QUERY: oneQuery || ONE_QUERY
        }}
      />
      </div>
  );
};

export default CustomerEdit