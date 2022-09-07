import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const companySlice = createSlice({
  name: 'global',
  initialState: {
    company: null,
    date: null,
    isAuthUser: false,
    taskID: null,
  },
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload
    },
    setDate: (state, action) => {
      state.date = action.payload
    },
    setIsAuthUser: (state, action) => {
      state.isAuthUser = action.payload
    },
    setTaskID: (state, action) => {
      state.taskID = action.payload
    },
  },
})

export const { setCompany, setDate, setIsAuthUser, setTaskID } =
  companySlice.actions
export const selectCompany = (state) => state.global.company
export const selectDate = (state) => state.global.date
export const selectIsAuthUser = (state) => state.global.isAuthUser
export const selectTaskID = (state) => state.global.taskID
export default companySlice.reducer
