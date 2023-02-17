import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { MenuItem } from '../components/MenuItem'
import { useRouter } from 'next/router'
import {
  ChartBarIcon,
  ClipboardIcon,
  ClipboardDocumentListIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import Datepicker from '../components/Datepicker'
import Submissions from '../components/NewPatientPacketAnalytics/Submissions'
import HowTheyFoundUs from '../components/NewPatientPacketAnalytics/HowTheyFoundUs'
import { auth } from '../firebase'
const NewPatientPacketAnalytics: NextPage<{}> = () => {
  const router = useRouter()
  const [submissions, setSubmissions] = useState(false)
  const [howTheyFoundUs, setHowTheyFoundUs] = useState(false)

  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  return (
    <div>
      <Header selectCompany={'AMA'} />
      <main className=" mt-5 flex h-full  w-full flex-col ">
        <h1 className=" text-center text-2xl ">New Patient Packet</h1>
        <div className=" flex h-[80vh] w-full grid-flow-col items-center justify-center">
          <div className=" h-[80vh] w-[25%] p-5 ">
            <div className="mb-5">
              <MenuItem
                icon={
                  <ChartBarIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Submissions"
                onClick={() => {
                  setSubmissions(true)
                  setHowTheyFoundUs(false)
                }}
              />
            </div>
            <div className="mb-5">
              <MenuItem
                icon={
                  <ChartPieIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="How They Found Us"
                onClick={() => {
                  setHowTheyFoundUs(true)
                  setSubmissions(false)
                }}
              />
            </div>

            <Datepicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className="h-[80vh] w-[75%] ">
            {submissions && <Submissions selectedDate={selectedDate} />}
            {howTheyFoundUs && <HowTheyFoundUs />}
          </div>
        </div>
      </main>
    </div>
  )
}
export default NewPatientPacketAnalytics
