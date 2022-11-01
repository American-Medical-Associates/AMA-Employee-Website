import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const companySlice = createSlice({
  name: 'global',
  initialState: {
    company: null,
    date: null,
    isAuthUser: false,
    taskID: null,
    supportTicketNumber: null,
    ChannelID: null,
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
    setSupportTicketNumber: (state, action) => {
      state.supportTicketNumber = action.payload
    },
    setChannelID: (state, action) => {
      state.ChannelID = action.payload
    },
  },
})

export const {
  setCompany,
  setDate,
  setIsAuthUser,
  setTaskID,
  setSupportTicketNumber,
  setChannelID,
} = companySlice.actions
export const selectCompany = (state) => state.global.company
export const selectDate = (state) => state.global.date
export const selectIsAuthUser = (state) => state.global.isAuthUser
export const selectTaskID = (state) => state.global.taskID
export const selectSupportTicketNumber = (state) =>
  state.global.supportTicketNumber
export const selectChannelID = (state) => state.global.ChannelID
export default companySlice.reducer
