import React, { useEffect } from 'react'
import Header from '../components/navigation/Header'
import { MenuItem } from '../components/navigation/MenuItem'
import router, { useRouter } from 'next/router'
import {
  ChartBarIcon,
  ClipboardIcon,
  ClipboardDocumentListIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import { auth } from '../firebase'

const Resources: NextPage<{}> = () => {
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  const router = useRouter()
  return (
    <div className=" flex flex-col bg-gray-100 items-center justify-center">
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div className=" mt-5 flex h-full  w-full flex-col ">
        <h1 className=" text-center text-2xl ">Resources</h1>
        <div className=" flex h-[80vh] w-full grid-flow-col items-center justify-center">
          <div className=" h-[80vh] w-[25%] p-5 ">
            <div className="mb-5">
              <MenuItem
                icon={
                  <ClipboardIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="New Patient Packet"
                onClick={() => {
                  router.push('/NewPatientPacket')
                }}
              />
              <div className="mt-5">
                <MenuItem
                  icon={
                    <ClipboardDocumentListIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text="Submissions"
                  onClick={() => {
                    router.push('/NewPatientPacketSubmissions')
                  }}
                />
              </div>
            </div>
            <div className="mb-5">
              <MenuItem
                icon={
                  <ChartBarIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text=" New Patient Packet Analytics"
                onClick={() => {
                  router.push('/NewPatientPacketAnalytics')
                }}
              />
            </div>

            <div className="mb-5 mt-5">
              <MenuItem
                icon={
                  <ClipboardIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Vitalize Book Appointment"
                onClick={() => {
                  router.push('/VitalizeNation/VitalizeBookAnAppointment')
                }}
              />
            </div>
            <MenuItem
              icon={
                <ClipboardDocumentListIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
              }
              text="Booked Appointments"
              onClick={() => {
                router.push('/BookedAppointments')
              }}
            />
          </div>
          <div className="justify-content flex h-[80vh] w-full grid-flow-col items-center">
            <div className="h-[80vh] p-5">
            <div className="mb-5">
              <MenuItem
                icon={
                  <ClipboardIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="PDF Signatures"
                onClick={() => {
                  router.push('/PdfSignatures')
                }}
              />
            </div>
              <div>
                <MenuItem
                  icon={
                    <ClipboardIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text="Mental Health Survey"
                  onClick={() => {
                    router.push('/MentalHealthQuestionnaire')
                  }}
                />
              </div>
              <div className="mt-5">
                <MenuItem
                  icon={
                    <ClipboardDocumentListIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text="MHD Survey Submissions"
                  onClick={() => {
                    router.push('/SurveySubmissions')
                  }}
                />
              </div>
              <div className="mt-5">
                <MenuItem
                  icon={
                    <ClipboardIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text="Weight Loss Survey"
                  onClick={() => {
                    router.push('/WeightLossSurvey')
                  }}
                />
              </div>
              <div className='mt-5 mb-5'>
                <MenuItem icon={
                  <ClipboardIcon className='h-10 w-7 cursor-pointer text-black duration-[500s] ease-in' />
                }
                text="MADRS"
                onClick={() => {
                  router.push('/MADRS')
                }} />
              </div>
              {/* <div className="mt-5">
                <MenuItem
                  icon={
                    <ClipboardDocumentListIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text="Weight Loss Survey Submissions"
                  onClick={() => {
                    router.push('/WeightLossSubmissions')
                  }}
                />
              </div> */}
              {/* <div className="mt-5">
                <MenuItem
                  icon={
                    <ClipboardDocumentListIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text="All Misc. Surveys & Docs"
                  onClick={() => {
                    router.push('/WeightLossSurvey')
                  }}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Resources
