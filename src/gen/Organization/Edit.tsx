import React from "react";
import { loader } from 'graphql.macro';
import { useParams } from "react-router-dom";
import * as _ from 'lodash'

import BaseEdit from "../../components/Editor/Edit"

export const CREATE_MUTATION = loader('./graphql/create.gql')
export const UPDATE_MUTATION = loader('./graphql/update.gql')
export const ONE_QUERY = loader('./graphql/one.gql');

export const FIELDS = [
	{name: 'name', label:'Name', required: true},
	{name: 'street', label:'Street', required: true},
	{name: 'zip', label:'Zip', required: true},
	{name: 'city', label:'City', required: true},
	{name: 'country', label:'Country', required: true},
	{name: 'ico', label:'Ico', required: true},
	{name: 'dic', label:'Dic'},
	{name: 'phone', label:'Phone'},
	{name: 'www', label:'Www'},
	{name: 'type', label:'Type'}
]

export type OrganizationEditType = {
    name?: string, 
    fields?: any
    createMutation?: any,
    updateMutation?: any,
    oneQuery?: any
  }

export const OrganizationEdit:(obj:OrganizationEditType)=>any = ({name, fields, createMutation, updateMutation, oneQuery }) => {
  let params = useParams() as any;
  
  const id = params.id !== 'create' &&  params.id

  return (<div className={`base-edit-Organization base-edit`}>
      <BaseEdit 
        id={id} 
        name={name || 'Organizations'}
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

export default OrganizationEdit