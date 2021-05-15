import React from "react";
import { loader } from 'graphql.macro';
import { useParams } from "react-router-dom";
import * as _ from 'lodash'

import BaseEdit from "../../components/Editor/Edit"
import { createDefaultFilter } from "../../components/List/FilteredList";

export const CREATE_MUTATION = loader('./graphql/create.gql')
export const UPDATE_MUTATION = loader('./graphql/update.gql')
export const ONE_QUERY = loader('./graphql/one.gql');
export const ALL_QUERY = loader('./graphql/all.gql');

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

  const updateCache:(cache: any, data: any)=>void = (cache, {data}) => {
    const userId = localStorage.getItem('user.id')
    const mutated = data.mutated
    
    if(userId && mutated){
      const cacheRead = cache.readQuery({
        query: ALL_QUERY,
        variables: {
          filter: createDefaultFilter(userId)
        },
      });

      cache.writeQuery({
        query: ALL_QUERY,
        variables: {
          filter: createDefaultFilter(userId)
        },
        data: {
          all: [
            ...cacheRead.all, mutated
          ]
        }
      });
    }
  }
  
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
        updateCache={updateCache}
      />
      </div>
  );
};

export default InvoiceEdit