import React, { useEffect } from 'react'
import Header from '../components/navigation/Header'
import { MenuItem } from '../components/navigation/MenuItem'
import router, { useRouter } from 'next/router'
import {
  ChartBarIcon,
  ClipboardIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import { auth } from '../firebase/firebase'

const Resources: NextPage<{}> = () => {
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  const router = useRouter()

  return (
    <div className="flex flex-col bg-gray-100 items-center justify-center">
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div className="mt-5 flex h-full w-full flex-col">
        {/* Internal Medicine Row */}
        <h2 className="text-center text-2xl">Internal Medicine</h2>
        <div className="my-5">
          <div className="flex justify-center items-center mb-3">
            {/* First 4 Internal Medicine Buttons */}
            <MenuItem
              icon={
                <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text="New Patient Packet"
              onClick={() => {
                router.push('/NewPatientPacket')
              }}
            />
            <MenuItem
              icon={
                <ClipboardDocumentListIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text="Submissions"
              onClick={() => {
                router.push('/NewPatientPacketSubmissions')
              }}
            />
            <MenuItem
              icon={
                <ChartBarIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text="NPP Analytics"
              onClick={() => {
                router.push('/NewPatientPacketAnalytics')
              }}
            />
            <MenuItem
              icon={
                <ClipboardDocumentListIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text="Booked Appointments"
              onClick={() => {
                router.push('/BookedAppointments')
              }}
            />
          </div>
          <div className="flex justify-center items-center">
            <MenuItem
              icon={
                <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text="Weight Loss Survey"
              onClick={() => {
                router.push('/WeightLossSurvey')
              }}
            />
            {/* Add more buttons here if necessary */}
          </div>
        </div>

        {/* Mental Health Row */}
        <h2 className="text-center text-2xl">Mental Health</h2>
        <div className="my-5">
          <div className="flex justify-center items-center mb-3">
            {/* First 4 Mental Health Buttons */}
            <MenuItem
              icon={
                <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text="Mental Health Survey"
              onClick={() => {
                router.push('/MentalHealthQuestionnaire')
              }}
            />
            <MenuItem
              icon={
                <ClipboardDocumentListIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text="MHD Survey Submissions"
              onClick={() => {
                router.push('/SurveySubmissions')
              }}
            />
            <MenuItem
              icon={
                <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text="MADRS Form"
              onClick={() => {
                router.push('/MADRS')
              }}
            />
            <MenuItem
              icon={
                <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text="MADRS Submissions"
              onClick={() => {
                router.push('/MadrsSubmissions')
              }}
            />
          </div>
          <div className="my-5">
            <div className="flex justify-center items-center mb-3">
              <MenuItem
                icon={
                  <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
                }
                text="AIMS Form"
                onClick={() => {
                  router.push('/Aims')
                }}
              />
              <MenuItem
                icon={
                  <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
                }
                text="AIMS Submissions"
                onClick={() => {
                  router.push('/AimsSubmissions')
                }}
              />
            </div>
          </div>
          {/* Add more rows of buttons here if necessary */}
        </div>

        {/* Misc Row */}
        <h2 className="text-center text-2xl">Universal</h2>
        <div className="my-5">
          <div className="flex justify-center items-center">
            {/* Misc Buttons */}
            <MenuItem
                icon={
                  <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
                }
                text="Controlled Substance Contract"
                onClick={() => {
                  router.push('/SubstanceContract')
                }}
              />
              <MenuItem
                icon={
                  <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
                }
                text="Controlled Substance Submissions"
                onClick={() => {
                  router.push('/SubstanceContractSubmissions')
                }}
              />
            <MenuItem
              icon={
                <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text="Vitalize Book Appointment"
              onClick={() => {
                router.push('/VitalizeNation/VitalizeBookAnAppointment')
              }}
            />
            <MenuItem
              icon={
                <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text="PDF Signatures"
              onClick={() => {
                router.push('/PdfSignatures')
              }}
            />
            {/* Add more buttons here if necessary */}
          </div>
          <div className="flex justify-center items-center">            
              <MenuItem
              icon={
                <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text="Hospital Records Request Form"
              onClick={() => {
                router.push('/RecordsRequest')
              }}
            />
            <MenuItem
              icon={
                <ClipboardIcon className="h-10 w-7 cursor-pointer text-black duration-[500s] ease-in" />
              }
              text=" Hospital Records Request Submissions"
              onClick={() => {
                router.push('/RecordsRequestSubmissions')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resources
