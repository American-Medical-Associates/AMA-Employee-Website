import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'

import { GetSurveys } from '../firebase/firebase'
import { Timestamp } from 'firebase/firestore'
import MainButton from '../components/Buttons/MainButton'
import Router, { useRouter } from 'next/router'
import { auth } from '../firebase/firebase'

const SurveySubmissions: NextPage<{}> = () => {
  interface Survey {
    name: string
    interest: string
    focusArea: Array<string>
    id: string
    timestamp: Timestamp
  }

  const router = useRouter()
  const [mentalHealthSurvey, setMentalHealthSurvey] = useState<Array<Survey>>(
    [],
  )
  const [collapsed, setCollapsed] = useState(true)
  const [collapsedArray, setCollapsedArray] = useState<Array<Survey>>([])

  // This useEffect is to make sure that the user is logged in before they can access this page.
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  useEffect(() => {
    GetSurveys({ setSurveys: setMentalHealthSurvey })
  }, [])

  const MentalHealthSurvey = mentalHealthSurvey.map((survey) => {
    if (!collapsedArray.includes(survey)) {
      return (
        <div
          className="mb-6 flex w-[60%] flex-col items-center justify-center rounded-3xl bg-[#d8d7d77b]"
          onClick={() => {
            setCollapsedArray([...collapsedArray, survey])
          }}
        >
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">Submission</h3>
            <p className=" text-center">{survey.name}</p>
            <p className=" text-center">{survey.id}</p>
            <p>{survey.timestamp.toDate().toDateString()}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div
          className="mb-6 flex w-[60%] flex-col items-center justify-center rounded-3xl bg-[#d8d7d77b]"
          onClick={() => {
            setCollapsedArray(collapsedArray.filter((item) => item !== survey))
          }}
        >
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">Name:</h3>
            <p className=" text-center">{survey.name}</p>
          </div>
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">Interest:</h3>
            <p className=" text-center">{survey.interest}</p>
          </div>
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">
              Focus Area:
            </h3>
            <p className=" flex flex-col text-center">
              {survey.focusArea.map((focus) => {
                return (
                  <div className=" flex items-center justify-center">
                    <p className=" text-center">{focus}</p>
                  </div>
                )
              })}
            </p>
          </div>
        </div>
      )
    }
  })

  return (
    <div className=" flex flex-col items-center justify-center">
      <MainButton
        buttonText={'Survey Graph'}
        onClick={() => {
          router.push('/SurveyGraph')
        }}
      />

      <main className=" m-10 flex w-full flex-col items-center justify-center ">
        {MentalHealthSurvey}
      </main>
    </div>
  )
}

export default SurveySubmissions
