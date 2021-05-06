import React, { useState, useEffect } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

import BaseControl, { TField } from './Control'

export type TBaseForm = {
  model: any;
  doUpdate: (model:any) => void;
  edit?: boolean
  fields: TField[]
}

export const BaseForm: React.FC<TBaseForm> = ({ model, fields, doUpdate, edit = false }) => {
  
  const onUpdate = () => {
      doUpdate(model)
  }

  const onChange = (field:string, value:any) => {
    model[field] = value
  }

  return (
    <div>
      <Form>
        {fields.map((field:any)=>(<BaseControl model={model} field={field} onChange={onChange}/>))}
      </Form>
    </div>
  );
};
