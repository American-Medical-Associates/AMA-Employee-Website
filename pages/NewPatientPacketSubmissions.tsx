import React, { useState, useEffect, useRef } from 'react'
import { NextPage } from 'next'
import Header from '../components/Header'
import Head from 'next/head'
import LineDivider from '../components/lineDiveider'
import SearchComponent from '../components/searchComponent'
import { AddNPToArchive, GetNewPatientPacketSubmissions } from '../firebase'
import { useSelector } from 'react-redux'
import { selectCompany } from '../redux/slices/companySlice'
import { jsPDF } from 'jspdf'
import MainButton from '../components/MainButton'
import { Page } from 'react-pdf'
import TextInput from '../components/TextInput'
import { auth, functions } from '../firebase'
import { httpsCallable, getFunctions } from 'firebase/functions'
import { Firestore } from 'firebase/firestore'
import { InformationSection } from '../components/formComponents/InformationSection'
import NewPatientPacketFullSubmission from '../components/formComponents/NewPatientPacketFullSubmission'
import router from 'next/router'

export default function NewPatientPacketSubmitions() {
  const [submissions, setSubmissions] = useState<Array<any>>([])
  const [SearchInputForNewPatientPacket, setSearchInputForNewPatientPacket] =
    useState<string>('')
  const pdfRef = useRef(null)

  const [submissionSearchResults, setSubmissionSearchResults] = useState<
    Array<any>
  >([])
  const [selectedPacket, setSelectedPacket] = useState<any>([])

  const company = useSelector(selectCompany)
  const pdf = new jsPDF()
  const [searchFormAnswers, setSearchFormAnswers] = useState('')
  const [searchFormAnswersResults, setSearchFormAnswersResults] = useState<
    Array<any>
  >([])
  const [showArchived, setShowArchived] = useState(false)
  const addPatientToEclinicalPuppeteer = httpsCallable(
    functions,
    'addPatientToEclinicalPuppeteer'
  )
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (submissions.length > 0) {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [submissions])

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  //search form submissions
  useEffect(() => {
    if (searchFormAnswers.length > 0) {
      //remove all spaces in the searchFormAnswers
      const searchFormAnswersWithoutSpaces = searchFormAnswers.replace(
        /\s/g,
        ''
      )

      Object.keys(selectedPacket).map((item: any) => {
        if (
          item
            .toLowerCase()
            .includes(searchFormAnswersWithoutSpaces.toLowerCase())
        ) {
          //get the index of the item

          //add the item to the search results
          setSearchFormAnswersResults([
            ...searchFormAnswersResults,
            selectedPacket[item],
          ])
        }
      })
    } else {
      setSearchFormAnswersResults([])
    }
  }, [searchFormAnswers])

  useEffect(() => {
    GetNewPatientPacketSubmissions({
      company: company,
      NewPatientPacketsState: setSubmissions,
    })
  }, [])

  useEffect(() => {
    var searchResults: any = []
    if (
      SearchInputForNewPatientPacket == '' ||
      SearchInputForNewPatientPacket == null ||
      SearchInputForNewPatientPacket == undefined
    ) {
      setSubmissionSearchResults(submissions)
    } else {
      submissions.map((submission: any) => {
        const firstName: string = JSON.stringify(
          submission.firstName.toLowerCase()
        ) as string
        const lastName: string = JSON.stringify(
          submission.lastName.toLowerCase()
        ) as string
        if (
          firstName.includes(SearchInputForNewPatientPacket.toLowerCase()) ||
          lastName.includes(SearchInputForNewPatientPacket.toLowerCase())
        ) {
          searchResults.push(submission)
        }
      })
      setSubmissionSearchResults(searchResults)
    }
  }, [submissions, SearchInputForNewPatientPacket])
  const listOfSubmissions = submissionSearchResults.map((submission: any) => {
    if (showArchived == true) {
      if (submission.archived == true) {
        return (
          <div
            onClick={() => {
              setSelectedPacket(submission)
            }}
            className=" m-4  cursor-pointer overflow-x-hidden rounded-[30px] bg-[#ffffffe6]  p-4   text-center shadow-xl duration-500 hover:scale-[110%]"
            key={submission.email}
          >
            <h1 className=" text-center text-lg text-[#707070]">
              {submission.firstName} {submission.lastName}
            </h1>
          </div>
        )
      }
    } else if (showArchived == false) {
      if (submission.archived == false || submission.archived == undefined) {
        return (
          <div
            onClick={() => {
              setSelectedPacket(submission)
            }}
            className=" m-4  cursor-pointer overflow-x-hidden rounded-[30px] bg-[#ffffffe6]  p-4   text-center shadow-xl duration-500 hover:scale-[110%]"
          >
            <h1 className=" text-center text-lg text-[#707070]">
              {submission.firstName} {submission.lastName}
            </h1>
          </div>
        )
      }
    }
  })
  //   const NewPatientPacket = selectedPacket.map(() => {})

  return (
    <div>
      <Head>
        <title>AMA</title>
        <link rel="icon" href="/American Medical Associates.png" />
      </Head>
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <main className=" my-5 flex grid-cols-2 justify-center ">
        <div className=" m-5 flex h-[80vh] w-[25%] flex-col overflow-y-auto rounded-[30px] bg-[#d2d1d18b]">
          <div className=" flex flex-col items-center justify-center">
            {showArchived && (
              <MainButton
                buttonText="Hide Archived"
                onClick={() => {
                  setShowArchived(false)
                }}
              />
            )}
            {!showArchived && (
              <MainButton
                buttonText="Show Archived"
                onClick={() => {
                  setShowArchived(true)
                }}
              />
            )}

            <SearchComponent
              placeHolder="Search For Submissions"
              value={SearchInputForNewPatientPacket}
              onChange={(text: any) => {
                setSearchInputForNewPatientPacket(text.target.value)
              }}
            />

            <LineDivider
              lineHeight="h-[10px]"
              lineWidth="w-[50px]"
              lineColor="#0F100F2F"
            />
          </div>
          <div className={`flex w-full flex-col items-center justify-center `}>
            {listOfSubmissions}
          </div>
        </div>
        <div className="flex  w-[75%] flex-col items-center justify-center   p-[20px]">
          {/* {fullPacket} */}
          {Array.isArray(selectedPacket) == false && (
            <div className="flex w-full flex-col items-center justify-center ">
              <div className=" flex flex-row items-center justify-center rounded-[30px] bg-[#e6e6e697] p-3">
                <div className=" m-3">
                  {!showArchived && (
                    <MainButton
                      buttonText="Archive"
                      onClick={() => {
                        //add the submission to the archive

                        AddNPToArchive({
                          //@ts-ignore
                          email: selectedPacket.emailValue,
                          archiveState: true,
                        })
                      }}
                    />
                  )}
                  {showArchived && (
                    <MainButton
                      buttonText="UnArchive"
                      onClick={() => {
                        //add the submission to the archive

                        AddNPToArchive({
                          //@ts-ignore
                          email: selectedPacket.emailValue,
                          archiveState: false,
                        })
                      }}
                    />
                  )}
                </div>

                {auth.currentUser?.email ==
                  'h.fontaine@americanmedicalassociatesaz.com' ||
                  auth.currentUser?.email ==
                    'j.cervantes@americanmedicalassociatesaz.com' ||
                  (auth.currentUser?.email == 'juju@gmail.com' && (
                    <div className=" mx-3">
                      <MainButton
                        buttonText="Add to ECW"
                        onClick={() => {
                          addPatientToEclinicalPuppeteer({
                            //@ts-ignore
                            firstName: selectedPacket.firstName,
                            //@ts-ignore
                            lastName: selectedPacket.lastName,
                            //@ts-ignore
                            BirthDateValue: selectedPacket.BirthDateValue,
                            //@ts-ignore
                            preferredName: selectedPacket.preferredName,
                            //@ts-ignore
                            phoneNumberValue: selectedPacket.phoneNumberValue,
                            //@ts-ignore
                            emailValue: selectedPacket.emailValue,
                            //@ts-ignore
                            addressValue: selectedPacket.addressValue,
                            //@ts-ignore
                            addressValue2: selectedPacket.addressValue2,
                            //@ts-ignore
                            cityValue: selectedPacket.cityValue,
                            //@ts-ignore
                            USStateValue: selectedPacket.USStateValue,
                            //@ts-ignore
                            zipCodeValue: selectedPacket.zipCodeValue,
                            //@ts-ignore
                            socialValue: selectedPacket.socialValue,
                            //@ts-ignore
                            isCheckedMale: selectedPacket.isCheckedMale,
                            //@ts-ignore
                            isCheckedFemale: selectedPacket.isCheckedFemale,
                            //@ts-ignore
                            isCheckedOther: selectedPacket.isCheckedOther,
                            //@ts-ignore
                            EmergencyContactRelationShip:
                              //@ts-ignore
                              selectedPacket.EmergencyContactRelationShip,
                            //@ts-ignore
                            nameOfEmergencyContact:
                              //@ts-ignore
                              selectedPacket.nameOfEmergencyContact,
                            //@ts-ignore
                            EmergencyContactPhoneNumber:
                              //@ts-ignore
                              selectedPacket.EmergencyContactPhoneNumber,
                            //@ts-ignore
                            married: selectedPacket.married,
                            //@ts-ignore
                            single: selectedPacket.single,
                            //@ts-ignore
                            divorced: selectedPacket.divorced,
                            //@ts-ignore
                            widowed: selectedPacket.widowed,
                            //@ts-ignore

                            //@ts-ignore
                            separated: selectedPacket.separated,
                            //@ts-ignore
                            withPartner: selectedPacket.withPartner,
                            //@ts-ignore
                            Ethnicity: selectedPacket.Ethnicity,
                            //@ts-ignore
                          })
                        }}
                      />
                    </div>
                  ))}
              </div>

              <NewPatientPacketFullSubmission selectedPacket={selectedPacket} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
