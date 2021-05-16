import { useQuery } from '@apollo/client';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Dropdown, Form, FormControl } from 'react-bootstrap'
import { SelectCallback } from 'react-bootstrap/esm/helpers';
import { getDataFromRaw } from '../../../components/Editor/Edit';

import * as _ from 'lodash'


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick, isInvalid, isValid }: any, ref) => (
    <Button
        variant={isInvalid ? 'outline-danger': (isValid? 'outline-success': 'light')}
        size={'lg'}
        ref={ref as any}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
      {children}
      {' '} <small>&#x25bc;</small>
    </Button>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }: any, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref as any}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child: any) => {
                return !value || child.props.children.toLowerCase().indexOf(value) !== -1
            }
          )}
          </ul>
        </div>
      );
    },
  );

export const SelectorGenerator = (inputs: any) => {
  const {name, QUERY, filter, map, required, register, placeholder, formState, setValue, storedData} = inputs

  const [selected, setSelected] = useState({} as any)
  const registredAs = register(name, {required})

  const {errors, touchedFields} = formState
  const formErrors = (errors && errors[name])
  const touched = touchedFields && touchedFields[name]

  const isRelation = name.endsWith('Id')
  const storedDataName = isRelation ? name.substr(0, name.length-2) : name

  const { data, loading, error } = useQuery(QUERY, {
    variables:{filter},
    onError: (e) => {}
  });

  const sortedData = useMemo(()=>{
    if(data) {
      const unsortedData = getDataFromRaw(data)
      const mappedData = unsortedData.map((d:any)=>(map ? {id: d.id, name: map(d)} : d))
      return mappedData.sort((r1:any,r2:any)=>(r1.name<r2.name))
    } 
  }, [data])

  useEffect(()=>{
    if(storedData && storedData[storedDataName] && sortedData){
      let storedId: string
      
      if(isRelation) storedId = _.get(storedData, [storedDataName, 'id'])
      else storedId = storedData[storedDataName]

      setValue(name, storedId)

      const obj = sortedData.find((sd:any)=>sd.id === storedId)
      setSelected({id: storedId, name:obj.name})
    } 
  },[storedData, sortedData])

  const onSelect:SelectCallback = (eventKey) => {
    const obj = sortedData.find((sd:any)=>sd.id === eventKey)
    setSelected({id: eventKey, name:obj.name})
    setValue(name, eventKey, {
      shouldValidate: true
    })
  }

  return(
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" isInvalid={formErrors} isValid={touched && !error} >
        {selected && selected.name ? selected.name : (placeholder || 'Select by click')} {required && '*'}
      </Dropdown.Toggle>
  
      <Dropdown.Menu as={CustomMenu}>
        {sortedData && sortedData.map(((rd:any)=>(<Dropdown.Item key={`dropdown/${name}/${rd.name}`} eventKey={rd.id} onSelect={onSelect} >{rd.name}</Dropdown.Item>)))}
      </Dropdown.Menu>
    </Dropdown>
  );
} 

export default SelectorGenerator