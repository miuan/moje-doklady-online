import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { Button, Col, Dropdown, Form, FormControl } from 'react-bootstrap'


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }: any, ref) => (
    <Button
        variant={'light'}
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
                return !value || child.props.children.toLowerCase().startsWith(value)
            }
          )}
          </ul>
        </div>
      );
    },
  );

export const SelectorGenerator = ({QUERY, variables}:{QUERY:any, variables: any}) => (inputs: any) => {
  const {field} = inputs

  // const { data, loading, error } = useQuery(QUERY, {
  //   variables,
  //   onError: (e) => {}
  // });

  return(
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
        Custom toggle
      </Dropdown.Toggle>
  
      <Dropdown.Menu as={CustomMenu} >
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3" >
          Orange
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
} 

export default SelectorGenerator