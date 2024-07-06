import React, { useState, useEffect, useRef } from 'react'
import { NextPage } from 'next'

import Head from 'next/head'
import LineDivider from '../components/formComponents/lineDiveider'
import SearchComponent from '../components/userInput/searchComponent'
import {
  AddNPToArchive,
  GetNewPatientPacketSubmissions,
} from '../firebase/firebase'
import { useSelector } from 'react-redux'
import { selectCompany } from '../redux/slices/companySlice'
import { jsPDF } from 'jspdf'
import MainButton from '../components/Buttons/MainButton'
import { Page } from 'react-pdf'
import TextInput from '../components/userInput/TextInput'
import { auth, functions } from '../firebase/firebase'
import { httpsCallable, getFunctions } from 'firebase/functions'
import { Firestore } from 'firebase/firestore'
import router from 'next/router'

// useEffect(() => {
//   if (!auth.currentUser?.email) {
//     router.push('/PatientLogin')
//   }
// }, [])

const FormSubmissions: NextPage<{}> = () => {
  const [submissions, setSubmissions] = useState<Array<any>>([])
  const [SearchInputForNewPatientPacket, setSearchInputForNewPatientPacket] =
    useState<string>('')
  const pdfRef = useRef(null)

  const [submissionSearchResults, setSubmissionSearchResults] = useState<
    Array<any>
  >([])
  const [selectedPacket, setSelectedPacket] = useState<Array<any>>([])

  const company = useSelector(selectCompany)
  const pdf = new jsPDF()
  const [searchFormAnswers, setSearchFormAnswers] = useState('')
  const [searchFormAnswersResults, setSearchFormAnswersResults] = useState<
    Array<any>
  >([])
  const [showArchived, setShowArchived] = useState(false)
  const addPatientToEclinicalPuppeteer = httpsCallable(
    functions,
    'addPatientToEclinicalPuppeteer',
  )
  //search form submissions
  useEffect(() => {
    if (searchFormAnswers.length > 0) {
      //remove all spaces in the searchFormAnswers
      const searchFormAnswersWithoutSpaces = searchFormAnswers.replace(
        /\s/g,
        '',
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
      archived: true,
      setLoading: () => { },
      start: new Date('2021-01-01'),
      end: new Date('2022-01-01'),
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
          submission.firstName.toLowerCase(),
        ) as string
        const lastName: string = JSON.stringify(
          submission.lastName.toLowerCase(),
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
            className=" m-4  cursor-pointer overflow-x-hidden rounded-[30px] bg-[#ebebebc6]  p-4   text-center shadow-xl duration-500 hover:scale-[110%]"
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
            className=" m-4  cursor-pointer overflow-x-hidden rounded-[30px] bg-[#ebebebc6]  p-4   text-center shadow-xl duration-500 hover:scale-[110%]"
          >
            <h1 className=" text-center text-lg text-[#707070]">
              {submission.firstName} {submission.lastName}
            </h1>
          </div>
        )
      }
    }
  })
  const packetsSearched = Object.keys(searchFormAnswersResults).map(
    (item: any) => {
      //make the first letter of the key uppercase
      const capitalLetters = item.charAt(0).toUpperCase() + item.slice(1)
      var keyWithSpaces = capitalLetters.replace(/([A-Z])/g, ' $1').trim()

      if (
        typeof searchFormAnswersResults[item] == 'object' ||
        Array.isArray(typeof searchFormAnswersResults[item]) //   keyWithSpaces == 'list Of All Current Medications'
      ) {
        return (
          <div className="my-10  rounded-[30px] bg-[#e7e7e779]  p-5">
            <p className="  text-center text-2xl font-bold text-[#525252] underline">
              {keyWithSpaces.toString()}:
            </p>
            {Object.keys(searchFormAnswersResults[item]).map((item2: any) => {
              const capitalLetters2 =
                item2.charAt(0).toUpperCase() + item2.slice(1)
              const keyWithSpaces2 = capitalLetters2
                .replace(/([A-Z])/g, ' $1')
                .trim()
              if (
                typeof searchFormAnswersResults[item][item2] == 'object' ||
                Array.isArray(searchFormAnswersResults[item][item2])
              ) {
                return (
                  <div className=" my-10 rounded-[30px] bg-[#d0d0d0a7]">
                    {Object.keys(searchFormAnswersResults[item][item2]).map(
                      (item3: any, index: number) => {
                        if (
                          Array.isArray(searchFormAnswersResults[item][item2])
                        ) {
                          return (
                            <div className="flex flex-col">
                              {/* <p className="text-center text-lg font-bold text-[#525252]">
                              {item3}
                            </p> */}
                              <p className="text-center text-lg font-bold text-[#d9ff32]">
                                {searchFormAnswersResults[item][item2][item3]}
                              </p>
                            </div>
                          )
                        } else {
                          return (
                            <div>
                              {Object.keys(
                                searchFormAnswersResults[item][item2][item3],
                              ).map((item4: any, index: number) => {
                                return (
                                  <div className="  flex flex-col items-center justify-center">
                                    <h1 className=" "> {[item4]}:</h1>

                                    <p className=" text-[#5b46ff]">
                                      {searchFormAnswersResults[item][item2][
                                        item3
                                      ][item4].toString()}
                                    </p>
                                  </div>
                                )
                              })}
                            </div>
                          )
                        }
                      },
                    )}
                  </div>
                )
              }
              if (keyWithSpaces == 'Hippa') {
                return (
                  <div className=" my-3 flex flex-col items-center justify-center ">
                    <h1 className=" "> {keyWithSpaces2}:</h1>

                    <p className=" text-[#5b46ff]">
                      {searchFormAnswersResults[item][item2].toString()}
                    </p>
                  </div>
                )
              }
              if (keyWithSpaces == 'Advanced Directives') {
                return (
                  <div className="flex flex-col items-center justify-center">
                    <h1 className=" "> {keyWithSpaces2}:</h1>

                    <p className=" text-[#5b46ff]">
                      {searchFormAnswersResults[item][item2].toString()}
                    </p>
                  </div>
                )
              }
              return (
                <div className="  flex flex-col items-center justify-center">
                  <p className=" text-[#444af5]">
                    {searchFormAnswersResults[item][item2].toString()}
                  </p>
                </div>
              )
            })}
          </div>
        )
      }
      if (
        keyWithSpaces.includes('Picture') ||
        keyWithSpaces.includes('picture')
      ) {
        return (
          <div className="flex flex-col items-center justify-center">
            <h1 className="mt-10 text-center text-2xl font-bold text-[#525252] underline ">
              {keyWithSpaces}:
            </h1>
            <MainButton
              buttonText={keyWithSpaces}
              onClick={() => {
                //open the image in a new tab
                window.open(searchFormAnswersResults[item])
              }}
            />
          </div>
        )
      }

      return (
        <div className=" my-4 flex flex-col items-center justify-center">
          {/* <h1 className=" font-bold">{keyWithSpaces}:</h1> */}
          <p className=" mt-10 text-center text-2xl font-bold text-[#525252] underline">
            {keyWithSpaces.toString()}:
          </p>
          <p className=" text-2xl text-[#444af5]">
            {searchFormAnswersResults[item].toString()}
          </p>
        </div>
      )
    },
  )
  const packets = Object.keys(selectedPacket).map((item: any) => {
    //make the first letter of the key uppercase
    const capitalLetters = item.charAt(0).toUpperCase() + item.slice(1)
    var keyWithSpaces = capitalLetters.replace(/([A-Z])/g, ' $1').trim()

    if (
      typeof selectedPacket[item] == 'object' ||
      Array.isArray(typeof selectedPacket[item]) //   keyWithSpaces == 'list Of All Current Medications'
    ) {
      return (
        <div className="my-10  rounded-[30px] bg-[#e7e7e779]  p-5">
          <p className="  text-center text-2xl font-bold text-[#525252] underline">
            {keyWithSpaces.toString()}:
          </p>
          {Object.keys(selectedPacket[item]).map((item2: any) => {
            const capitalLetters2 =
              item2.charAt(0).toUpperCase() + item2.slice(1)
            const keyWithSpaces2 = capitalLetters2
              .replace(/([A-Z])/g, ' $1')
              .trim()
            if (
              typeof selectedPacket[item][item2] == 'object' ||
              Array.isArray(selectedPacket[item][item2])
            ) {
              return (
                <div className=" my-10 rounded-[30px] bg-[#d0d0d0a7]">
                  {Object.keys(selectedPacket[item][item2]).map(
                    (item3: any, index: number) => {
                      if (Array.isArray(selectedPacket[item][item2])) {
                        return (
                          <div className="flex flex-col">
                            {/* <p className="text-center text-lg font-bold text-[#525252]">
                              {item3}
                            </p> */}
                            <p className="text-center text-lg font-bold text-[#d9ff32]">
                              {selectedPacket[item][item2][item3]}
                            </p>
                          </div>
                        )
                      } else {
                        return (
                          <div>
                            {Object.keys(
                              selectedPacket[item][item2][item3],
                            ).map((item4: any, index: number) => {
                              return (
                                <div className="  flex flex-col items-center justify-center">
                                  <h1 className=" "> {[item4]}:</h1>

                                  <p className=" text-[#5b46ff]">
                                    {selectedPacket[item][item2][item3][
                                      item4
                                    ].toString()}
                                  </p>
                                </div>
                              )
                            })}
                          </div>
                        )
                      }
                    },
                  )}
                </div>
              )
            }
            if (keyWithSpaces == 'Hippa') {
              return (
                <div className=" my-3 flex flex-col items-center justify-center ">
                  <h1 className=" "> {keyWithSpaces2}:</h1>

                  <p className=" text-[#5b46ff]">
                    {selectedPacket[item][item2].toString()}
                  </p>
                </div>
              )
            }
            if (keyWithSpaces == 'Advanced Directives') {
              return (
                <div className="flex flex-col items-center justify-center">
                  <h1 className=" "> {keyWithSpaces2}:</h1>

                  <p className=" text-[#5b46ff]">
                    {selectedPacket[item][item2].toString()}
                  </p>
                </div>
              )
            }
            return (
              <div className="  flex flex-col items-center justify-center">
                <p className=" text-[#444af5]">
                  {selectedPacket[item][item2].toString()}
                </p>
              </div>
            )
          })}
        </div>
      )
    }
    if (keyWithSpaces.includes('Picture')) {
      return (
        <div className="flex flex-col items-center justify-center">
          <h1 className="mt-10 text-center text-2xl font-bold text-[#525252] underline ">
            {keyWithSpaces}:
          </h1>
          <MainButton
            buttonText={keyWithSpaces}
            onClick={() => {
              //open the image in a new tab
              window.open(selectedPacket[item])
            }}
          />
        </div>
      )
    }

    return (
      <div className=" my-4 flex flex-col items-center justify-center">
        {/* <h1 className=" font-bold">{keyWithSpaces}:</h1> */}
        <p className=" mt-10 text-center text-2xl font-bold text-[#525252] underline">
          {keyWithSpaces.toString()}:
        </p>
        <p className=" text-2xl text-[#444af5]">
          {selectedPacket[item].toString()}
        </p>
      </div>
    )
  })

  const pdfExport = () => {
    var x = 10
    var y = 10
    var page = 1

    //map through the submission object and add it to the pdf

    Object.keys(selectedPacket).map((item: any) => {
      //search the Key for capital letters and add a space before them unless two capital letters are next to each other
      Object.keys(selectedPacket[item]).map((item2: any) => {
        var keyWithSpaces = item.replace(/([A-Z])/g, ' $1').trim()

        pdf.text(`${keyWithSpaces}: `, x, y)
        y += 10
        pdf.text(`${selectedPacket[item][item2]}`, x, y)

        y += 20
        page += 1
        if (page == 20) {
          pdf.addPage()
          page = 1
          y = 10
        }
      })
    })
    pdf.save('a4.pdf')
  }

  //     submission.map((answer: any) => {
  //       x = 10 + x
  //       y = 10 + y
  //       pdf.text(answer, x, y)
  //       alert('h')
  //     })
  // })
  // pdf.save('a4.pdf')

  return (
    <div>
      <Head>
        <title>AMA</title>
        <link rel="icon" href="/American Medical Associates.png" />
      </Head>

      <main className=" my-5 flex grid-cols-2 justify-center ">
        <div className=" flex h-[90vh] w-[25%] flex-col overflow-y-auto">
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
            <div className=" flex flex-row items-center justify-center rounded-[30px] bg-[#e6e6e697] p-3">
              {/* <TextInput
                placeHolder="Search For Submissions"
                value={searchFormAnswers}
                onChange={(text: any) => {
                  setSearchFormAnswers(text.target.value)
                }}
              /> */}
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
              <div className=" ml-3">
                <MainButton
                  buttonText="Export PDF"
                  onClick={async () => {
                    var doc = 1
                    if (Array.isArray(selectedPacket) == false) {
                      Object.keys(selectedPacket).map(async (item: any) => {
                        selectedPacket[item]
                        doc += 1
                        const content: any = pdfRef.current
                        var y = 15
                        const pageHeight = pdf.internal.pageSize.height
                        if (doc == 2) {
                          await pdf.html(content, {
                            callback: function (doc) {
                              doc.save(`${item.emailValue}.pdf`)
                            },
                            width: 210, // <- here
                            windowWidth: 1000,
                            margin: 0,

                            // <- here
                          })
                        }
                      })
                    }
                  }}
                  buttonWidth="w-[200px]"
                />
              </div>
            </div>
          )}
          <p className=" text-red-500">
            Please Only Click once and give it about 5 min to add to Eclinical
          </p>
          <p>
            To Search: Press (CONTROL + F), then type what you are looking for.
          </p>
          <div ref={pdfRef}>
            {searchFormAnswers == '' && <div>{packets}</div>}
            {searchFormAnswers != '' && (
              <div className="flex flex-col items-center justify-center">
                {packetsSearched}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
export default FormSubmissions
