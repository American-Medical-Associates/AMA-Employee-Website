import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import MainButton from '../components/MainButton'
import {
  GetPatientAutoSaveInfo,
  GetPatientInfo,
  HasSubmittedPacket,
} from '../firebase'
import { auth } from '../firebase'
import { useDispatch } from 'react-redux'
import NewPatientPacketFullSubmission from '../components/formComponents/NewPatientPacketFullSubmission'
import { PacketInfo } from './types/NewPatientPacketTypes'

const PatientPage: NextPage = () => {
  const router = useRouter()
  const [patientInfo, setPatientInfo] = useState<Info>()
  const [patientName, setPatientName] = useState('')
  const [patientAutoSaveInfo, setPatientAutoSaveInfo] = useState([])
  const [submittedPacket, setSubmittedPacket] = useState<any>([])
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [noFoundPacket, setNoFoundPacket] = useState(false)
  // const [collapsedArray, setCollapsedArray] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.currentUser?.email) {
      HasSubmittedPacket({
        email: auth.currentUser?.email,
        setSubmittedPacket: setSubmittedPacket,
      })
        .then(() => {
          if (submittedPacket.emailValue) {
            setHasSubmitted(true)
            setNoFoundPacket(false)
          }
        })
        .then(() => {
          if (submittedPacket.length === 0) {
            GetPatientAutoSaveInfo({
              email: auth.currentUser?.email,
              setPatientAutoSaveInfo: setPatientAutoSaveInfo,
              dispatch: dispatch,
            })
          }
        })
    }
  }, [auth.currentUser?.email])

  useEffect(() => {
    if (patientAutoSaveInfo) {
      setNoFoundPacket(false)
      setHasSubmitted(false)
    } else {
      setNoFoundPacket(true)
    }
  }, [submittedPacket, patientAutoSaveInfo])

  interface Info {
    email: string
  }

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  useEffect(() => {
    if (auth.currentUser?.email != null) {
      GetPatientInfo({
        setPatientInfo: setPatientInfo,
        email: auth.currentUser?.email,
      })
    }
  }, [auth.currentUser?.email])
  console.log('submittedPacket', submittedPacket)
  console.log('hasSubmitted', hasSubmitted)
  console.log('noFoundPacket', noFoundPacket)
  console.log('patientAutoSaveInfo', patientAutoSaveInfo)

  // This is the useEffect that will check if the patient has submitted the packet and if they have then it will change
  // from "False" to "True" and then the button will change from "Resume New Patient Packet" to "View New Patient Packet"
  // useEffect(() => {
  //   if (auth.currentUser?.email) {
  //
  //     HasSubmittedPacket({
  //       email: auth.currentUser?.email,
  //       setSubmittedPacket: setSubmittedPacket,
  //     }).then(() => {
  //       setHasSubmitted(true)
  //     })
  //   }
  // }, [auth.currentUser?.email])

  // const handlePacketSubmission = () => {
  //   setHasSubmittedPacket(true)
  // }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Header selectCompany={'AMA'} routePatientsHome={false} />
      <div className="m-10 w-[50%] rounded-[30px] shadow-2xl">
        <h1 className="m-2 text-center text-4xl font-bold text-[#377adf] opacity-100">
          Patient Page
        </h1>
        {patientInfo && (
          <div className="flex items-center justify-center">
            Welcome {patientInfo.email}!
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          <MainButton
            buttonText={
              submittedPacket.emailValue
                ? hasSubmitted
                  ? 'Hide New Patient Packet'
                  : 'View New Patient Packet'
                : noFoundPacket
                ? 'Fill out New Patient Packet'
                : 'Resume New Patient Packet'
            }
            onClick={() => {
              if (submittedPacket.emailValue) {
                setHasSubmitted(!hasSubmitted)
              } else {
                router.push('/NewPatientPacket')
              }
            }}
          />

          {hasSubmitted && (
            <NewPatientPacketFullSubmission selectedPacket={submittedPacket} />
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientPage
