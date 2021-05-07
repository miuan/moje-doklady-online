import React from "react";
import { loader } from 'graphql.macro';
import { useParams } from "react-router-dom";
import * as _ from 'lodash'

import BaseEdit from "../../components/Editor/Edit"

export const CREATE_MUTATION = loader('./graphql/create.gql')
export const UPDATE_MUTATION = loader('./graphql/update.gql')
export const ONE_QUERY = loader('./graphql/one.gql');

export const FIELDS = [
	{name: 'name', label:'Name', required: true}
]

export type InvoiceEditType = {
    name?: string, 
    fields?: any
    createMutation?: any,
    updateMutation?: any,
    oneQuery?: any
  }

export const InvoiceEdit:(obj:InvoiceEditType)=>any = ({name, fields, createMutation, updateMutation, oneQuery }) => {
  let params = useParams() as any;
  
  const id = params.id !== 'create' &&  params.id

  return (<div className={`base-edit-Invoice base-edit`}>
      <BaseEdit 
        id={id} 
        name={name || 'Invoices'}
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

export default InvoiceEdit