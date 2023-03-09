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
    newPatientPacket: null,
    weightLossSurvey: null,
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
    setNewPatientPacket: (state, action) => {
      state.newPatientPacket = action.payload
    },
    setWeightLossSurvey: (state, action) => {
      state.weightLossSurvey = action.payload
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
  setNewPatientPacket,
  setWeightLossSurvey,
} = companySlice.actions
export const selectCompany = (state) => state.global.company
export const selectDate = (state) => state.global.date
export const selectIsAuthUser = (state) => state.global.isAuthUser
export const selectTaskID = (state) => state.global.taskID
export const selectSupportTicketNumber = (state) =>
  state.global.supportTicketNumber
export const selectChannelID = (state) => state.global.ChannelID
export const selectNewPatientPacket = (state) => state.global.newPatientPacket
export const selectWeightLossSurvey = (state) => state.global.weightLossSurvey
export default companySlice.reducer
