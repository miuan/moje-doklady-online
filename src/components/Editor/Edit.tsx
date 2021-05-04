import React, { useState, useEffect, useCallback } from "react";

import { BaseForm, TBaseForm } from "./Form";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import * as _ from 'lodash'
import { Alert } from 'react-bootstrap'
import Unauthorized from '../common/Unauthorized'
import Loading from '../common/Loading'
import { TField, TControlField } from "./Control";

export const getDataFromRaw = (rawData: any) => {
  const rawName = Object.keys(rawData)[0]
  return rawData[rawName]
}

export type TBaseEditUpdateCacheFn = (cache: any, data: any) => void
export type TBaseEdiRenameErrorFn = (error: string) => string
export type TBaseEdiOnCompletedFn = (data: any) => void

export type TBaseEdit = Pick<TBaseForm, 'fields'> & {
  id: string
  name: string
  query: any
  onUpdated? : (data:any) => void
  updateCache?: TBaseEditUpdateCacheFn
  renameError?: TBaseEdiRenameErrorFn
  onCompleted?: TBaseEdiOnCompletedFn
}

export const BaseEdit:React.FC<TBaseEdit> = ({id: externId, query, name, fields, onUpdated, updateCache, renameError, onCompleted}) => {
  const [localId, setLocalId] = useState(externId);
  const [unauthorized, setUnauthorized] = useState(false);
  const [errors, setErrors] = useState<string[]|null>([])

  const [model, setModel] = useState({

  });

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
      const np = fields.reduce((o:any, field: TField)=> {
        const fieldName = (field as TControlField).name ? (field as TControlField).name : field as string
        o[fieldName] = loadedData[fieldName]
        return o
      }, {})

      setModel(np)
    } else {
      setUnauthorized(true)
    }

    if(onUpdated) onUpdated(loadedData)
  }

  const skipLoading = !externId
  const { loading, error } = useQuery(query.QUERY, {
    variables: {id: externId},
    skip: skipLoading,
    onCompleted: (loadedDataRaw: any) =>{
      console.log('loadedDataRaw', loadedDataRaw, skipLoading)
      updateDataFromLoaded(loadedDataRaw)
      
    }, onError: (e) => {
      console.log('onError >>> ', e.message)
      if(e.message == 'GraphQL error: Unauhorized'){
        setUnauthorized(true)
      }
      setModel({name:'', models: ''})
      
    }
  });

  const [
    createProjectMutation,
    { loading: createLoading, data: createData, error: createError }
  ] = useMutation(query.CREATE_MUTATION, {
    errorPolicy: "none",
    onCompleted: (raw: any) => {
      const data = getDataFromRaw(raw)
      console.log("CREATED", raw, data.id);
      setLocalId(data.id);

      setErrors(null)

      if(onCompleted) onCompleted(raw)
      if(onUpdated) onUpdated(raw)
      // updateDataFromLoaded(raw)
    },
    update: updateCache,
    onError: handleError
  });

  const [updateProjectMutation, { loading:updateLoading, data: updateData, error:updateError }] = useMutation(
    query.UPDATE_MUTATION,
    {
      errorPolicy: "none",
      onCompleted: (data: any) => { 
        
        const raw =  getDataFromRaw(data)
        console.log("UPDATED", data, raw);
        setLocalId(raw.id);

        setErrors(null)

        if(onCompleted) onCompleted(raw)
        if(onUpdated) onUpdated(raw)
        // updateDataFromLoaded(raw)
      },
      update: updateCache,
      onError: handleError
    }
  );

  const onUpdate = useCallback((model: any) => {
    console.log('onUpdate >>> ', localId, model)
    if(localId){
        updateProjectMutation({
            variables: {
              id:localId,
              ...model
            }
          });
    } else {
        createProjectMutation({
            variables: {
              userId: localStorage.getItem("user.id"),
              ...model
            }
          });
    }
    
  }, [localId]);

  if(unauthorized) {
    return (<Unauthorized where={`${name} edit`} />)
  }

  if(loading) {
    return (<Loading what={name}/>)
  }

  return (
    <div>
      {externId ? <h1>{name} Edit ({externId})</h1> : <h1>{name} create</h1>}
      {error && <Alert variant={'danger'}>`${error.message}`</Alert>}
      {errors && errors.length > 0 && errors.map((e)=>(<Alert variant={'danger'}>{e}</Alert>))}
      <BaseForm model={model} doUpdate={onUpdate} edit={Boolean(localId)} fields={fields} />
    </div>
  );
};

export default BaseEdit

