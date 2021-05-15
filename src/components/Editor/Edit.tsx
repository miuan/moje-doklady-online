import React, { useState, useEffect, useCallback } from "react";

import { BaseForm, TBaseForm } from "./Form";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import * as _ from 'lodash'
import { Alert, Button } from 'react-bootstrap'
import Unauthorized from '../common/Unauthorized'
import Loading from '../common/Loading'
import { TField, TControlField } from "./Control";
import EditTabs from "./Tabs";

export const getDataFromRaw = (rawData: any) => {
  const rawName = Object.keys(rawData)[0]
  return rawData[rawName]
}

export type TBaseEditUpdateCacheFn = (cache: any, data: any) => void
export type TBaseEdiRenameErrorFn = (error: string) => string
export type TBaseEdiOnCompletedFn = (data: any) => void

export type TTabFields = {[key:string]: TBaseForm['fields']}

export type TBaseEdit = {
  id: string
  name: string
  query: any
  fields: TBaseForm['fields'] | TTabFields
  onUpdated? : (data:any) => void
  updateCache?: TBaseEditUpdateCacheFn
  renameError?: TBaseEdiRenameErrorFn
  onCompleted?: TBaseEdiOnCompletedFn
}

export const BaseEdit:React.FC<TBaseEdit> = ({id: externId, query, name, fields, onUpdated, updateCache, renameError}) => {
  const [localId, setLocalId] = useState(externId);
  const [unauthorized, setUnauthorized] = useState(false);
  const [errors, setErrors] = useState<string[]|null>([])

  // if the fields is not ust simle array
  // we consider is it a object defined tabs 
  const haveTabs = Object.keys(fields).some((k)=>isNaN(+k))

  const [model, setModel] = useState({});

  const handleError = (incommingError:{message: string}) => {
    let incomingErrors = incommingError.message.split('\n')
    if(renameError) {
      incomingErrors = incomingErrors.map(error=>renameError(error))
    }
    setErrors(incomingErrors)
  }

  const updateDataFromLoaded = (loadedDataRaw: any) => {
    if(!loadedDataRaw){
      return
    }
    
    const loadedData = getDataFromRaw(loadedDataRaw)

    if(loadedData){
      setModel({...loadedData})
    } else {
      setUnauthorized(true)
    }
  }

  const onCompleted = (raw: any) => {
    const data = getDataFromRaw(raw)
    setLocalId(data.id);
    setErrors(null)
    if(onUpdated) onUpdated(raw)
  }

  const skipLoading = !externId
  const { loading, error } = useQuery(query.QUERY, {
    variables: {id: externId},
    skip: skipLoading,
    onCompleted: (loadedDataRaw: any) =>{
      updateDataFromLoaded(loadedDataRaw)
    }, 
    onError: (e) => {
      if(e.message == 'GraphQL error: Unauhorized'){
        setUnauthorized(true)
      }
      setModel({name:'', models: ''})
    }
  });

  const [createProjectMutation] = useMutation(query.CREATE_MUTATION, {
    errorPolicy: "none",
    onCompleted: onCompleted,
    update: updateCache,
    onError: handleError
  });

  const [updateProjectMutation] = useMutation(
    query.UPDATE_MUTATION,
    {
      errorPolicy: "none",
      onCompleted: onCompleted,
      update: updateCache,
      onError: handleError
    }
  );

  const onUpdate = useCallback((data) => {
    console.log('onUpdate >>> ', localId, data)
    if(localId){
        updateProjectMutation({
            variables: {
              id:localId,
              ...data
            }
          });
    } else {
        createProjectMutation({
            variables: {
              userId: localStorage.getItem("user.id"),
              ...data
            }
          });
    }
    
  }, [localId, model]);

  if(unauthorized) {
    return (<Unauthorized where={`${name} edit`} />)
  }

  if(loading) {
    return (<Loading what={name}/>)
  }

  return (
    <div className="base-edit">
      {externId ? <h3>{name} Edit ({externId}) </h3> : <h3>{name} create </h3>}
      <hr />
      {error && <Alert variant={'danger'}>`${error.message}`</Alert>}
      {errors && errors.length > 0 && errors.map((e)=>(<Alert variant={'danger'}>{e}</Alert>))}
      {haveTabs ? <EditTabs fields={fields as TTabFields} model={model} doUpdate={onUpdate} edit={Boolean(localId)} /> : <BaseForm model={model} doUpdate={onUpdate} edit={Boolean(localId)} fields={fields as TField[]} />}
    </div>
  );
};

export default BaseEdit

