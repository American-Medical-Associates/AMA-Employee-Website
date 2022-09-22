import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../components/Header'
import Head from 'next/head'
import LineDivider from '../components/lineDiveider'
import SearchComponent from '../components/searchComponent'
import { GetNewPatientPacketSubmissions } from '../firebase'
import { useSelector } from 'react-redux'
import { selectCompany } from '../redux/slices/companySlice'
import { jsPDF } from 'jspdf'
import MainButton from '../components/MainButton'
import { Page } from 'react-pdf'

const FormSubmissions: NextPage<{}> = () => {
  const [submissions, setSubmissions] = useState<Array<any>>([])
  const [SearchInputForNewPatientPacket, setSearchInputForNewPatientPacket] =
    useState<string>('')

  const [submissionSearchResults, setSubmissionSearchResults] = useState<
    Array<any>
  >([])
  const [selectedPacket, setSelectedPacket] = useState<Array<any>>([])

  const company = useSelector(selectCompany)
  const pdf = new jsPDF()

  useEffect(() => {
    GetNewPatientPacketSubmissions({
      company: company,
      NewPatientPacketsState: setSubmissions,
    })
    console.log('submissions', submissions)
  }, [])
  useEffect(() => {}, [])

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
        const emailString: string = JSON.stringify(submission.email) as string
        if (
          emailString.includes(SearchInputForNewPatientPacket.toLowerCase())
        ) {
          searchResults.push(submission)
        }
      })
      setSubmissionSearchResults(searchResults)
    }
  }, [submissions, SearchInputForNewPatientPacket])
  const listOfSubmissions = submissionSearchResults.map((submission: any) => {
    return (
      <div
        onClick={() => {
          setSelectedPacket(submission)
          console.log('selectedPacket', selectedPacket)
        }}
        className=" m-4  cursor-pointer overflow-x-hidden rounded-[30px] bg-[#ebebebc6]  p-4   text-center shadow-xl duration-500 hover:scale-[110%]"
      >
        <h1 className=" text-center text-lg text-[#707070]">
          {submission.emailValue}
        </h1>
      </div>
    )
  })

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
                              selectedPacket[item][item2][item3]
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
                    }
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

    selectedPacket.forEach((submission: any) => {
      //map through each submission object and add it to the pdf
      Object.keys(submission).forEach((key: string) => {
        //search the Key for capital letters and add a space before them unless two capital letters are next to each other

        var keyWithSpaces = key.replace(/([A-Z])/g, ' $1').trim()

        // var newKey = key.replace(/([A-Z])/g, ' $1').trim()

        pdf.text(`${keyWithSpaces}: `, x, y)
        y += 10
        pdf.text(`${submission[key].toString()}`, x, y)

        y += 20
        page += 1
        if (page == 20) {
          pdf.addPage()
          page = 1
          y = 10
        }
      })
      pdf.save('a4.pdf')
    })
  }

  //     submission.map((answer: any) => {
  //       x = 10 + x
  //       y = 10 + y
  //       pdf.text(answer, x, y)
  //       console.log(answer)
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
      <Header />
      <main className=" my-5 flex grid-cols-2 justify-center ">
        <div className=" flex h-[90vh] w-[25%] flex-col overflow-y-auto">
          <div className=" flex flex-col items-center justify-center">
            {/* {showArchiveList()} */}

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
          <MainButton
            buttonText="Export PDF"
            onClick={() => {
              pdfExport()
            }}
            buttonWidth="w-[200px]"
          />
          {packets}
        </div>
      </main>
    </div>
  )
}
export default FormSubmissions
