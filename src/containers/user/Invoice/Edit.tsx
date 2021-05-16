import React, { Children, useCallback, useEffect, useState } from "react";
import { loader } from 'graphql.macro';
import { useParams } from "react-router-dom";
import * as _ from 'lodash'
import { CREATE_MUTATION, FIELDS as GEN_FIELDS, InvoiceEditType, ONE_QUERY, UPDATE_MUTATION } from "../../../gen/Invoice/Edit";
import { getDataFromRaw } from "../../../components/Editor/Edit";
import { TField } from "../../../components/Editor/Control";
import Selector from "./Selector";
import { Button, Form, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { createDefaultFilter } from "../../../components/List/FilteredList";
import { useMutation, useQuery } from "@apollo/client";
import Unauthorized from "../../../components/common/Unauthorized";
import Loading from "../../../components/common/Loading";
import StoreItem from "./StoreItem";
import { selectSelected, selectSelectedId } from "../../../app/reducers/organizationSlice";
import { setConstantValue } from "typescript";
import BaseEditor from "./BaseEditor";

export const CUSTOMER_QUERY = loader('./graphql/customer-selector.gql')

export const Control = ({name, storedData, label, required, register, placeholder, formState, setValue}:any) => {
  const {errors, touchedFields} = formState
  const error = (errors && errors[name])
  const touched = touchedFields && touchedFields[name]
  
  useEffect(()=>{
    if(storedData && storedData[name]) setValue(name, storedData[name])
  },[storedData])

  return (
    <React.Fragment >
      <Form.Group controlId={`form-${name}`}>
          <Form.Label>{label} {required && '*'}</Form.Label>
          <Form.Control
              type="text"
              placeholder={placeholder}
              {...register(name as any, {required})}
              
              isInvalid={error}
              isValid={touched && !error}
            />
          
          <FormControl.Feedback type="valid">
            Perfect!
          </FormControl.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid {label}.
          </Form.Control.Feedback>
        </Form.Group>
      </React.Fragment>
  )
}

const mapCustomer = (customer:any) => `${customer.name}, ${customer.city}, ${customer.street}`


export const InvoiceForm = ({onSubmit, storedData, graphQlError}:any) => {
  const userId = localStorage.getItem('user.id')
  const reactForm = useForm()
  const { register, handleSubmit, formState, setValue } = reactForm;

  const filter = createDefaultFilter(userId)
  
  return (<Form onSubmit={handleSubmit(onSubmit)}>
      <Control name={'name'} label={'name'} required={true} storedData={storedData} {...reactForm} />
      <Selector storedData={storedData} name={'customerId'} label={'customer'} QUERY={CUSTOMER_QUERY} filter={filter} map={mapCustomer} required={true}  {...reactForm} />
      <StoreItem name={'organizationId'} storeSelector={selectSelectedId} {...reactForm} storedData={storedData} />
      <Button type="submit">Save</Button>
  </Form>)
}




export const InvoiceEdit:(obj:InvoiceEditType)=>any = ({name, createMutation, updateMutation, oneQuery }) => {
  let params = useParams() as any;
  const [fields, setFields] = useState<TField[]>([])

  const id = params.id !== 'create' &&  params.id

  return (
  <div className={`base-edit-Invoice base-edit`}>
      <BaseEditor 
          externId={id} 
          name={name || 'Invoices'}
          query={{
              CREATE_MUTATION: createMutation || CREATE_MUTATION,
              UPDATE_MUTATION: updateMutation || UPDATE_MUTATION,
              QUERY: oneQuery || ONE_QUERY
          }}
        >{(storedData:any, onSubmit:any, errors:any) => (
          <InvoiceForm storedData={storedData} onSubmit={onSubmit} graphQlError={errors} />
        )}
        </BaseEditor>
      </div>
  );
};

export default InvoiceEdit