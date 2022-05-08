import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'

export const FormControl = ({ name, storedData, label, required, register, placeholder, formState, setValue }: any) => {
  const { errors, touchedFields, dirtyFields } = formState
  const error = errors && errors[name]
  const touched = touchedFields && touchedFields[name]
  const dirty = dirtyFields && dirtyFields[name]

  useEffect(() => {
    if (storedData && storedData[name]) setValue(name, storedData[name])
  }, [storedData])

  return (
    <>
      <Form.Group controlId={`form-${name}`}>
        <Form.Label>
          {label} {required && '*'}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={placeholder}
          {...register(name as any, { required })}
          isInvalid={error}
          /* isValid={dirty && !error} */
        />

        <Form.Control.Feedback type="valid">Perfect!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please provide a valid {label}.</Form.Control.Feedback>
      </Form.Group>
    </>
  )
}

export default FormControl
