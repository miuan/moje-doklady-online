import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap'
import './Row.css'
import { ListRowItem, IFilteredField } from "./RowItem";

export interface IListRowItem {
  id: string;
  name: string;
  user: any
}

export interface IListRowParams {
  name: string;
  item: any;
  fields?: IFilteredField[]
  onDelete: (obj: any) => void
  showDelete?: boolean
}
export const ListRow: React.FC<IListRowParams> = ({ item, onDelete, name, fields=['id'] , showDelete=false}) => {
  return (
    <tr className="row1">
      
      <td className="id"><Link to={`/user/${name.toLowerCase()}/${item.id}`}>{item.id}</Link></td>
      {fields.map(field=>(field !=='id' && <td><ListRowItem item={item} field={field} /></td>))}
      {item.user && (<td>{item.user.email}</td>)}
      
      {showDelete && <td className="right">
        <Button variant="danger" size="sm" onClick={()=>{onDelete(item)}}>delete</Button>
      </td>}
    </tr>
  );
};

