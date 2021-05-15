import React, { useEffect, useState } from "react";
import { loader } from 'graphql.macro';
import { useParams } from "react-router-dom";
import * as _ from 'lodash'
import { CREATE_MUTATION, FIELDS as GEN_FIELDS, InvoiceEditType, ONE_QUERY, UPDATE_MUTATION } from "../../../gen/Invoice/Edit";
import BaseEdit from "../../../components/Editor/Edit";
import { TField } from "../../../components/Editor/Control";
import Selector from "./Selector";

export const CUSTOMER_QUERY = loader('./graphql/customer-selector.gql')


export const InvoiceEdit:(obj:InvoiceEditType)=>any = ({name, createMutation, updateMutation, oneQuery }) => {
  let params = useParams() as any;
  const [fields, setFields] = useState<TField[]>([])

  const id = params.id !== 'create' &&  params.id

  useEffect(()=>{
    const variables = {
      "filter": {
        "user_every": {
          "id": "6087df94d814d86f80ae9f84"
        }
      }
    }

    setFields([
      {name: 'customerId', control: Selector({QUERY:CUSTOMER_QUERY, variables}), required: true}, 
      ...GEN_FIELDS
    ])
  }, [])

  return (<div className={`base-edit-Invoice base-edit`}>
      <BaseEdit 
        id={id} 
        name={name || 'Invoices'}
        fields={fields}
        query={{
            CREATE_MUTATION: createMutation || CREATE_MUTATION,
            UPDATE_MUTATION: updateMutation || UPDATE_MUTATION,
            QUERY: oneQuery || ONE_QUERY
        }}
      />
      </div>
  );
};

export default InvoiceEdit