import { useMutation, useQuery } from '@apollo/client';
import React, { useCallback, useState } from 'react'
import Loading from '../../../components/common/Loading';
import Unauthorized from '../../../components/common/Unauthorized';
import { getDataFromRaw } from '../../../components/Editor/Edit';

export const BaseEditor = ({name, form, externId, renameError, onUpdated, updateCache, query, children}:any) => {

    const [localId, setLocalId] = useState(externId);
    const [unauthorized, setUnauthorized] = useState(false);
    const [errors, setErrors] = useState<string[]|null>([])
  
    const [storedData, setStoredData] = useState({});
  
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
        setStoredData({...loadedData})
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
  
    // const onSubmit = (data:any) => {
    //   console.log(data)
    // }
  
    const onSubmit = useCallback((data) => {
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
      
    }, [localId, storedData]);
  
    if(unauthorized) {
      return (<Unauthorized where={`${name} edit`} />)
    }
  
    if(loading) {
      return (<Loading what={name}/>)
    }
  
    return (<div>{children(storedData, onSubmit, errors)}</div>)
  }

export default BaseEditor