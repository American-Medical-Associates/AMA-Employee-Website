import { NextPage } from 'next'
import router from 'next/router'
import React, { useEffect } from 'react'
import { auth } from '../firebase'

useEffect(() => {
  if (!auth.currentUser?.email) {
    router.push('/PatientLogin')
  }
}, [])

const SparavtoTrackingInduvidualPage: NextPage<{}> = () => {
  return <div>editing coming soon</div>
}
export default SparavtoTrackingInduvidualPage
