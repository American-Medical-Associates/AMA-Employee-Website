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
          setSelectedPacket([submission])
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

  const fullPacket = selectedPacket.map((submission: any) => {
    //map through each submission object and add it to the pdf

    return Object.keys(submission).map((key: string) => {
      var keyWithSpaces = key.replace(/([A-Z])/g, ' $1').trim()
      console.log('keyWithSpaces', submission[key])
      if (
        typeof submission[key] == 'object' &&
        typeof submission[key] != 'undefined' &&
        key != 'dateAdded'
      ) {
        return Object.keys(submission[key]).map((key1: string) => {
          var keyWithSpaces1 = key1.replace(/([A-Z])/g, ' $1').trim()
          if (
            submission[key][key1] != undefined &&
            submission[key][key1] != null
          ) {
            return (
              <div className=" flex flex-col items-center justify-center">
                <h1 className=" text-lg text-[#753bc0]">{keyWithSpaces1}</h1>
                <h1 className=" text-lg text-[#52ceff]">
                  {submission[key][key1]}
                </h1>
              </div>
            )
          }
        })
      } else {
        return (
          <div className=" my-4 flex flex-col items-center justify-center">
            <h1 className=" font-bold">{keyWithSpaces}:</h1>
            <p className=" text-[blue]">{submission[key].toString()}</p>
          </div>
        )
      }
    })
  })

  const pdfExport = () => {
    var x = 10
    var y = 10
    var page = 1

    submissionSearchResults.forEach((submission: any) => {
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
      <main className=" my-5 flex grid-cols-2 justify-center overflow-y-clip">
        <div className=" flex h-[90vh] w-[25%] flex-col overflow-y-auto">
          <div className=" flex flex-col items-center justify-center">
            {/* {showArchiveList()} */}
            <MainButton
              buttonText="Export PDF"
              onClick={() => {
                pdfExport()
              }}
            />

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
        <div className="flex h-[80vh]  w-[75%] flex-col justify-center overflow-y-auto  p-[20px]">
          {fullPacket}
        </div>
      </main>
    </div>
  )
}
export default FormSubmissions
