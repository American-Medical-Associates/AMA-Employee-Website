import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Head from 'next/head'
import { getResumes } from '../firebase'
import ListItem from '../components/ListItem'
import { ReactDOM } from 'react'
import classnames from 'classnames'
import ApplicationItem from '../components/ApplicationItem'
import Image from 'next/image'
import MainButton from '../components/MainButton'
import { useRouter } from 'next/router'
const SubmitedResumes: React.FC<{}> = () => {
  const [application, setApplication] = useState(Array)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [applicationDetails, setApplicationDetails] = useState<any>(null)
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
  }, [])

  useEffect(() => {
    getResumes({ applicationtState: setApplication })
  }, [])
  //   console.log(application)

  const list = application.map((item: any) => {
    // console.log('hiii ' + item.email)
    // console.log(height)
    return (
      <div
        key={item.phoneNumber}
        onClick={() => {
          setApplicationDetails({ item })
          console.log(applicationDetails?.item)
        }}
        className=" w-30% m-5 cursor-pointer rounded-[30px] bg-[#ebebebc6] p-4 text-center shadow-xl duration-500 hover:scale-[110%]"
      >
        <h1 className=" text-lg text-[#707070]">{item.email}</h1>
      </div>
    )
  })
  const details = () => {
    if (applicationDetails == null) {
      return (
        <div className=" h-[80vh]  w-full overflow-auto rounded-[20px] bg-[#ebebebc6] p-[40px] text-center shadow-xl">
          <h2>Please Select a resume</h2>
        </div>
      )
    } else {
      console.log(applicationDetails)
      return (
        <div className=" h-[80vh]  w-full overflow-auto rounded-[20px] bg-[#ebebebc6] p-[40px] text-center shadow-xl">
          <MainButton
            buttonText=" See The Application "
            buttonWidth="w-20%"
            onClick={() => {
              router.push('/JobApplicationPage')
            }}
          />
          <h2 className=" m-5 text-2xl text-[#1c91de] "> Application</h2>
          <div className=" flex w-full grid-cols-2">
            <div className=" flex w-[50%] flex-col">
              <ApplicationItem
                name="Full Name:"
                Item={applicationDetails?.item?.fullName}
              />
              <ApplicationItem
                name="Email:"
                Item={applicationDetails?.item?.email}
              />
              <ApplicationItem
                name="Phone Number:"
                Item={applicationDetails?.item?.phoneNumber}
              />
              <ApplicationItem
                name="Gender:"
                Item={applicationDetails?.item?.gender}
              />
              <ApplicationItem
                name="Race:"
                Item={applicationDetails?.item?.race}
              />
              <ApplicationItem
                name="Profile Link:"
                Item={applicationDetails?.item?.profileLink}
              />
              <ApplicationItem
                name="Link Type:"
                Item={applicationDetails?.item?.linkType}
              />
              <ApplicationItem
                name="About Them"
                Item={applicationDetails?.item?.aboutYou}
              />

              <div className=" mx-12 flex w-full flex-col items-center justify-center text-center">
                <h3 className="  m-10 text-xl text-[#363636f4]"> Resume:</h3>
                <img
                  className=" w-[480px]"
                  src={applicationDetails?.item?.resume}
                />
              </div>
            </div>
            <div className="flex w-[50%] flex-col">
              <ApplicationItem
                name="Disability Status:"
                Item={applicationDetails?.item?.DisabilityStatus}
              />

              <ApplicationItem
                name="Authorize to Receive Texts About Job:"
                Item={
                  applicationDetails?.item
                    ?.consent_to_receiving_text_messages_throughout_your_application_process
                }
              />
              <ApplicationItem
                name="Current Intern or Contractor:"
                Item={
                  applicationDetails?.item
                    ?.former_or_current_intern_or_contractor
                }
              />
              <ApplicationItem
                name="Require immigration Sponsorship:"
                Item={applicationDetails?.item?.require_immigration_sponsorShip}
              />
              <ApplicationItem
                name="Statement of Availability:"
                Item={applicationDetails?.item?.statmentOfAvailbilty}
              />
              <ApplicationItem
                name="Veteran Status"
                Item={applicationDetails?.item?.veteranStatus}
              />
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className=" flex flex-col">
      <Head>
        <title>AMA</title>
        <link rel="icon" href="/American Medical Associates.png" />
      </Head>
      <Header />

      <main className=" flex grid-cols-2 justify-center">
        <div
          className={classnames(
            `flex h-[80vh] w-[25%] flex-col  overflow-y-auto `
          )}
        >
          {list}
        </div>
        <div className="flex w-[75%] flex-col justify-center  p-[20px]">
          {details()}
        </div>
      </main>
    </div>
  )
}
export default SubmitedResumes
