import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type TOrganization = {
  id: string
  name: string
}

export interface OrganizationState {
  selected?: TOrganization;
  all: TOrganization[];
  state: 'init' | 'loading' | 'loaded' 
}

const initialSelected = localStorage.getItem('organization.selected')

const initialState: OrganizationState = {
  all: [],
  state: 'init',
  selected: initialSelected && JSON.parse(initialSelected)
};


export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<OrganizationState['state']>) => {
      state.state = action.payload
    },
    select: (state, action: PayloadAction<string>) => {
      const selected = state.all.find((org=>org.id==action.payload))
      if(selected){
        state.selected = selected
        localStorage.setItem('organization.selected', JSON.stringify(state.selected))
      } else if(state.selected) {
        // if you log out and log with another user
        // clean data from local storage othervise 
        // will show not existitng org
        delete state.selected
        localStorage.removeItem('organization.selected')
      }

    },
    setAll: (state, action: PayloadAction<TOrganization[]>) => {
      state.all = action.payload
    },
    add: (state, action: PayloadAction<TOrganization>) => {
      state.all = [...state.all, action.payload]
    },
    update: (state, action: PayloadAction<TOrganization>) => {
      state.all = state.all.map((org)=>{
        if(org.id === action.payload.id) return action.payload
        else return org
      }) as TOrganization[]
      
      // if update affected selected update also selected
      if(state.selected && state.selected.id === action.payload.id){
          state.selected = action.payload
      }
    },

  },
})

export const selectSelected = (state: RootState) => state.organization.selected;
// Action creators are generated for each case reducer function
export const { select, setAll, add, update, changeState } = organizationSlice.actions

export default organizationSlice.reducer