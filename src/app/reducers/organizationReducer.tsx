import { createSlice } from '@reduxjs/toolkit'

export const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
      selected: null,
      all:[]
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
})

// Action creators are generated for each case reducer function
export const { select, setAll } = organizationSlice.actions

export default organizationSlice.reducer