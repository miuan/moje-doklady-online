import React from 'react'
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch } from '../../../app/hooks';
import { add, select, update } from '../../../app/reducers/organizationSlice';
import BaseEdit from '../../../components/Editor/Edit';
import { CREATE_MUTATION, FIELDS, ONE_QUERY, OrganizationEditType, UPDATE_MUTATION } from '../../../gen/Organization/Edit';

export const OrganizationEdit:(obj:OrganizationEditType & {primary?: boolean})=>any = ({primary, name, fields, createMutation, updateMutation, oneQuery }) => {
    let params = useParams() as any;
    const history = useHistory()
    const query = new URLSearchParams(history.location.search)
    const path = query.get('path')

    const id = params.id !== 'create' && params.id
    const dispatch = useAppDispatch();
    
    const onUpdated = (data:any) => {
      
      if(data.createOrganization) {
        dispatch(add(data.createOrganization))
        dispatch(select(data.createOrganization.id))
      }
      else if(data.updateOrganization) dispatch(update(data.updateOrganization))

      if (path) history.push(path)
      else history.goBack()
    }
  
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
      onUpdated={onUpdated}
    />
    </div>
)};
  
  export default OrganizationEdit