import { loader } from 'graphql.macro'
import * as _ from 'lodash'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router'
import BaseEditor from '../../../components/Editor/BaseEditor'
import { useParams } from 'react-router-dom'
import InvoiceEditForm from './InvoiceEditForm'

export const CREATE_MUTATION = loader('../../../gen/Invoice/graphql/create.gql')
export const UPDATE_MUTATION = loader('../../../gen/Invoice/graphql/update.gql')
export const ONE_QUERY = loader('../../../gen/Invoice/graphql/one.gql')
export const USER_LIST_QUERY = loader('../../../gen/Invoice/graphql/all.gql')

export const InvoiceEdit = (data: any) => {
  const userId = localStorage.getItem('user.id')
  const params = useParams() as any
  const id = params.id !== 'create' && params.id
  const [key, setKey] = useState<string>('home')

  const [error, setError] = useState('')
  const history = useHistory()

  const updateCache: (cache: any, data: any) => void = (cache, { data }) => {
    const createProject = data.createProject

    if (createProject) {
      const cacheRead = cache.readQuery({
        query: USER_LIST_QUERY,
        variables: {
          filter: { user_every: { id: userId } },
        },
      })

      cache.writeQuery({
        query: USER_LIST_QUERY,
        variables: {
          filter: { user_every: { id: userId } },
        },
        data: {
          allProject: [...cacheRead.allProject, createProject],
        },
      })
    }
  }

  const renameError = (error: string) => {
    const dupkeyRegEx = /index: name_1_user_1 dup key: { name: "(.*?)"/

    const dupkeyMatch = error.match(dupkeyRegEx)
    if (dupkeyMatch) {
      return `Field project name have to be unique, you want '${dupkeyMatch[1]}' what is already in your project list`
    }

    const pathNameRegEx = /validation failed: name: Path `name` is required./
    const pathNameMatch = error.match(pathNameRegEx)
    if (pathNameMatch) {
      return `Field project name can't be empty`
    }

    return error
  }

  const onCompleted = () => {
    history.push('/user/projects')
  }

  return (
    <div className={`base-edit-project base-edit`}>
      <BaseEditor
        externId={id}
        name={'Project'}
        query={{
          CREATE_MUTATION: CREATE_MUTATION,
          UPDATE_MUTATION: UPDATE_MUTATION,
          QUERY: ONE_QUERY,
        }}
        updateCache={updateCache}
      >
        {(storedData: any, onSubmit: any, errors: any, submitting: boolean, submittingDone: boolean) => (
          <InvoiceEditForm data={storedData} onSubmit={onSubmit} />
          // <ProjectEditForm
          //   storedData={storedData}
          //   onSubmit={onSubmit}
          //   graphQlError={errors}
          //   projectId={projectId}
          //   submitting={submitting}
          //   submittingDone={submittingDone}
          // />
        )}
      </BaseEditor>
    </div>
  )
}

export default InvoiceEdit
