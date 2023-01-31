import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../components/Header'
import { GetSurveys } from '../firebase'
import { Timestamp } from 'firebase/firestore'
import MainButton from '../components/MainButton'
import Router, { useRouter } from 'next/router'

const SurveySubmissions: NextPage<{}> = () => {
  interface Survey {
    gender: string
    age: string
    currentClient: string
    medication: string
    OneonOne: string
    interest: string
    insuranceCoverage: string
    focusArea: Array<string>
    joinTherapy: Array<string>
    time: Array<string>
    sessionLength: Array<string>
    id: string
    timestamp: Timestamp
  }

  const router = useRouter()
  const [mentalHealthSurvey, setMentalHealthSurvey] = useState<Array<Survey>>(
    []
  )
  const [collapsed, setCollapsed] = useState(true)
  const [collapsedArray, setCollapsedArray] = useState<Array<Survey>>([])

  useEffect(() => {
    GetSurveys({ setSurveys: setMentalHealthSurvey })
    console.log(mentalHealthSurvey)
  }, [])
  useEffect(() => {
    console.log(mentalHealthSurvey)
  }, [mentalHealthSurvey])

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
            <h3 className=" text-center text-2xl text-[#457aff]">Gender:</h3>
            <p className=" text-center">{survey.gender}</p>
          </div>
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">Age: </h3>
            <p className=" text-center">{survey.age}</p>
          </div>
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">
              Current Client:
            </h3>
            <p className=" text-center">{survey.currentClient}</p>
          </div>
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">
              Medication:
            </h3>
            <p className=" text-center">{survey.medication}</p>
          </div>
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">
              One on One:
            </h3>
            <p className=" text-center">{survey.OneonOne}</p>
          </div>
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">Interest:</h3>
            <p className=" text-center">{survey.interest}</p>
          </div>
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">
              Insurance Coverage:
            </h3>
            <p className=" text-center">{survey.insuranceCoverage}</p>
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
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">
              Join Therapy:
            </h3>
            <p className=" text-center">
              {survey.joinTherapy.map((join) => {
                return (
                  <div className=" flex items-center justify-center">
                    <p className=" text-center">{join}</p>
                  </div>
                )
              })}
            </p>
          </div>
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">Time:</h3>
            <p className=" text-center">
              {survey.time.map((time) => {
                return (
                  <div className=" flex items-center justify-center">
                    <p className=" text-center">{time}</p>
                  </div>
                )
              })}
            </p>
          </div>
          <div className=" my-5">
            <h3 className=" text-center text-2xl text-[#457aff]">
              Session Length:
            </h3>
            <p className=" text-center">
              {survey.sessionLength.map((length) => {
                return (
                  <div className=" flex items-center justify-center">
                    <p className=" text-center">{length}</p>
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
      <Header selectCompany={'AMA'} />

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
