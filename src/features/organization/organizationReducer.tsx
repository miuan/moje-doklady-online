import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loader } from 'graphql.macro'
import { RootState } from '../store'
import { activeUserId } from '../user/userSlice'

export const ALL_ORGANIZATION_QUERY = loader('./graphql/allOrganizations.gql')

export const loadAll = createAsyncThunk('organizations/load-all', async (payload, { getState, extra: { apolloClient }, rejectWithValue }: any) => {
  const userId = activeUserId(getState())
  if (!userId) rejectWithValue('no user')

  const { data } = await apolloClient.query({
    query: ALL_ORGANIZATION_QUERY,
    variables: { filter: { AND: [{ user_every: { id: userId } }] } },
  })

  return data.allOrganization
}) as any

export const organizationSlice = createSlice({
  name: 'organizations',
  initialState: {
    initializing: false,
    selected: null,
    all: [],
  },
  reducers: {
    select: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selected = action.payload
    },
    setAll: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.all = action.payload
    },
  },
  extraReducers: {
    [loadAll.fulfilled]: (state: any, action: any) => {
      state.all = action.payload
    },
  },
})

export const organizations = (state: RootState) => state?.organizations
export const organizationsAll = (state: RootState) => organizations(state)?.all || []
export const organizationsInitializing = (state: RootState) => organizations(state)?.initializing
export const organizationsSelected = (state: RootState) => (organizationsAll(state)[0] as any) || ({} as any)
export const organizationsSelectedId = (state: RootState) => organizationsSelected(state)?.id

// Action creators are generated for each case reducer function
export const { select, setAll } = organizationSlice.actions

export default organizationSlice.reducer
