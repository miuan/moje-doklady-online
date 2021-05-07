import { createSlice } from '@reduxjs/toolkit'

export const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
      selected: null
  },
  reducers: {
    select: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selected = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { select } = organizationSlice.actions

export default organizationSlice.reducer