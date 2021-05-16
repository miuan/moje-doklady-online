import React, {useState, useEffect, useCallback} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Table, {ITableQueries} from './Table'
import FilterItem from './FilteredItem'
import {Navbar, Button} from 'react-bootstrap'
import './FilteredList.css'
import { IFilteredField } from './RowItem'
import { TBaseEditUpdateCacheFn } from '../Editor/Edit'



export interface IProjectFilterList {
    name: string,
    userId?: string 
    adminMode?: boolean
    queries: ITableQueries
    fields: IFilteredField[]
    showDelete?: boolean,
    updateCache?:TBaseEditUpdateCacheFn
}

const createFilter = () => {
    let obj:any = []
    obj.name = 'AND'
    return {AND: obj}
}

const addAnd = (node:any, filter:any) => {

    let obj:any = filter

    if(node.name != 'AND'){
        obj = [obj]
        obj.name = 'AND'
    }

    node.push(obj)
}

const filterDestructNode = (node: any) => {
    let filter = ''

    for(const n of node) {
        if(n.name && n.length > 0) {
            filter += `,${filterDestructNode(n)}` 
        } else {
            filter += `,{${n.filter}}`
        }
    }

    return `{${node.name}:[${filter.substr(1)}]}`
}

const filterDestruct = (filter: any) => {
    let fo = {
        filter: '',
        params: '',
    }

    fo.filter = filter.AND.length > 0 ? `(filter: ${filterDestructNode(filter.AND)})` : ''
    fo.params = fo.params.length> 2 ? `(${fo.params.substr(1)})` : ''

    return fo
}


export const createDefaultFilter = (userId?: string | null) => {
    const defaultFilter = createFilter()
    
    if(userId){
        addAnd(defaultFilter.AND, {user_every:{id:userId}})
    }
    
    return defaultFilter
}

export const FilteredList:React.FC<IProjectFilterList> = ({name, userId, adminMode=false, queries, fields, showDelete, updateCache}) => {

    const [filter, setFilter] = useState(adminMode ? createFilter() : null)
    const history = useHistory()

    // console.log(filter, listFilter)


    const processFilter = (filter: any) => {
        const filterDestructed = filterDestruct(filter)
        
        console.log('processFilter', {filter, filterDestructed})

        setFilter(filter)
    }

    useEffect(()=>{
        const defaultFilter = createDefaultFilter(userId)
        processFilter(defaultFilter)
        
    }, [userId])


    const onFilterChange = useCallback((f: string | null) => {
        const defaultFilter = createDefaultFilter(userId)
        
        if(f) {
            addAnd(defaultFilter.AND,f)
        }
        
        processFilter(defaultFilter)

    }, [userId])

    const onCreateNew = () => {
        history.push('/user/' + name.toLowerCase() + '/create' )
    }

    // if is not adminMode, 
    // the useEffect will update filter with user after render
    // but in render is already called the query
    // but the query will call without properly setuped filter and return unauthorized
    if(!adminMode && !filter){
        return null
    }

    return (
        <>
        <section>
        <h1>{name}</h1>
            <div className="row-head">
                
                <FilterItem fields={fields} onChange={onFilterChange} />
                <div>
                
                </div>
                
            </div>
            <div className="row-table">
           
            <Table name={name} filter={filter} queries={queries} adminMode={adminMode} fields={fields} showDelete={showDelete} updateCache={updateCache} />
            <Button onClick={onCreateNew}>Create New</Button>
            </div>
            
        </section>
        </>
    )
}

export default FilteredList