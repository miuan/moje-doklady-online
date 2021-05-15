import React, { useState, useEffect } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export type TControl = {
  placeholder? : string
  onChange: (env: any) => void
  value: string
}

export type TControlField = {
  name: string
  label?: string
  placeholder?: string
  control?: React.FC<TControl>
  valid?: string
  required?: boolean
}

export type TField = string | TControlField

export interface IBaseControl {
  model: any
  edit?: boolean
  field: TField
}

export const BaseControl: React.FC<IBaseControl> = ({ model, field}) => {
  const { register, formState: {errors, touchedFields} } = useFormContext()

  const name = (field as TControlField).name ? (field as TControlField).name : field as string
  const label = (field as TControlField).label ? (field as TControlField).label : name
  const control = (field as TControlField).control ? (field as TControlField).control : null
  const placeholder = (field as TControlField).placeholder ? (field as TControlField).placeholder : ''
  const required = (field as TControlField).required ? true : false
  const error = (errors && errors[name])
  const touched = touchedFields && touchedFields[name]
  
  if(control){
    return (<React.Fragment>{control && control({field} as any)} </React.Fragment>)
  }
  
  return (
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
  );
};

export default BaseControl