import React, { useState, useEffect } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";

import BaseControl, { TField } from './Control'

export type TBaseForm = {
  model: any;
  doUpdate: (model:any) => void;
  edit?: boolean
  fields: TField[]
}

export const BaseForm: React.FC<TBaseForm> = ({ model, fields, doUpdate, edit = false }) => {
  const methods = useForm();

  useEffect(()=>{
    for(const field of fields as any){
      const name = field.name || field
      methods.setValue(name, model[name], {shouldDirty: false})
    } 
  }, [model])
  
  return (
    <FormProvider {...methods} >
      <Form onSubmit={methods.handleSubmit(doUpdate)}>
        {fields.map((field:any)=>(<BaseControl model={model} field={field} />))}
        <button className="btn btn-primary" type="submit">Save</button>
      </Form>
    </FormProvider>
  );
};
