import { NextPage } from 'next'
import router from 'next/router'
import React, { useEffect } from 'react'
import { auth } from '../firebase'

// useEffect(() => {
//   if (!auth.currentUser?.email) {
//     router.push('/PatientLogin')
//   }
// }, [])

const TeamManagementPage: NextPage<{}> = () => {
  return <div></div>
}
export default TeamManagementPage
