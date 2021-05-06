import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { TTabFields } from './Edit'
import { BaseForm, TBaseForm } from './Form'

type TEditTabs = Pick<TBaseForm, 'model' | 'doUpdate' | 'edit'> & {
    fields:TTabFields
}

export const EditTabs:React.FC<TEditTabs> = ({model, doUpdate, fields, edit}) => {
    const tabs = Object.keys(fields)
    const [key, setKey] = useState(tabs[0]);
    
    return (
        <div>
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k || '')}
            >
            {tabs.map((tab,idx)=>(<Tab eventKey={tab} title={tab}  style={{marginTop:'15px'}}>
                <BaseForm key={`tab-${tabs.join()}-${idx}`} model={model} doUpdate={doUpdate} edit={edit} fields={fields[tab]} />
            </Tab>))}
            
            </Tabs>
        </div>
    )
}

export default EditTabs