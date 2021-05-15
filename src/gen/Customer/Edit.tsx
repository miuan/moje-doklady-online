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
	{name: 'name', label:'Name', placeholder: 'Jejich Firma s.r.o', required: true},
	{name: 'street', label:'Street', placeholder: 'Willsonova', required: true},
	{name: 'zip', label:'Zip', placeholder: '12345', regexp: '[0-9](5)', required: true},
	{name: 'city', label:'City', placeholder: 'Praha 2', required: true},
	{name: 'country', label:'Country', required: true},
	{name: 'ico', label:'Ico', regexp: '[0-9](8)', required: true},
	{name: 'dic', label:'Dic', regexp: 'CZ[0-9](8)'},
	{name: 'phone', label:'Phone'},
	{name: 'www', label:'Www'}
]

export type CustomerEditType = {
    name?: string, 
    fields?: any
    createMutation?: any,
    updateMutation?: any,
    oneQuery?: any
  }

export const CustomerEdit:(obj:CustomerEditType)=>any = ({name, fields, createMutation, updateMutation, oneQuery }) => {
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
        updateCache={updateCache}
      />
      </div>
  );
};

export default CustomerEdit