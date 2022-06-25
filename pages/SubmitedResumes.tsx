import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Head from 'next/head'
import { getResumes, archiveItem } from '../firebase'
import ListItem from '../components/ListItem'
import { ReactDOM } from 'react'
import classnames from 'classnames'
import ApplicationItem from '../components/ApplicationItem'
import Image from 'next/image'
import MainButton from '../components/MainButton'
import { useRouter } from 'next/router'
import ItemPicker from '../components/ItemPicker'
import LineDivider from '../components/lineDiveider'

const SubmitedResumes: React.FC<{}> = () => {
  const [application, setApplication] = useState(Array)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [applicationDetails, setApplicationDetails] = useState<any>(null)
  const router = useRouter()
  const [numPages, setNumPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)
  const [showArchived, setShowArchived] = useState(false)

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
    if (item.archive == showArchived) {
      return (
        <div
          key={item.phoneNumber}
          onClick={() => {
            setApplicationDetails({ item })
            console.log(applicationDetails?.item?.selectedDateStart1)
          }}
          className=" w-30% m-5 cursor-pointer rounded-[30px] bg-[#ebebebc6] p-4 text-center shadow-xl duration-500 hover:scale-[110%]"
        >
          <h1 className=" text-lg text-[#707070]">{item.email}</h1>
        </div>
      )
    }
  })
  const isPDf = () => {
    if (applicationDetails?.item?.resumeFileType == 'pdf') {
      return (
        <div className=" mx-10 my-10 flex w-full flex-col items-center justify-center text-center">
          <h3 className="  m-10 text-xl text-[#363636f4]"> Resume:</h3>

          <a
            target={'_blank'}
            className=" h-40px cursor-pointer rounded-[30px] bg-[#0008ff] p-3 py-2 shadow-xl duration-500 hover:scale-110"
            href={applicationDetails?.item?.resume}
          >
            <h4 className=" text-white">Pdf Resume</h4>
          </a>
        </div>
      )
    } else {
      return (
        <div className=" mx-12 flex w-full flex-col items-center justify-center text-center">
          <h3 className="  m-10 text-xl text-[#363636f4]"> Resume:</h3>
          <a
            target={'_blank'}
            className=" h-40px cursor-pointer rounded-[30px]  shadow-xl duration-500 hover:scale-105"
            href={applicationDetails?.item?.resume}
          >
            <img
              className=" w-[480px]"
              src={applicationDetails?.item?.resume}
            />
          </a>
        </div>
      )
    }
  }
  const archiveButton = () => {
    if (applicationDetails?.item?.archive == true) {
      return (
        <MainButton
          buttonText=" unArchive"
          buttonWidth="w-[10]"
          onClick={() => {
            archiveItem({
              collections: 'applications',
              docs: applicationDetails?.item?.email,
              archiveBool: false,
            })
            setApplicationDetails(null)
          }}
        />
      )
    } else {
      return (
        <MainButton
          buttonText="Archive"
          buttonWidth="w-[10]"
          onClick={() => {
            archiveItem({
              collections: 'applications',
              docs: applicationDetails?.item?.email,
              archiveBool: true,
            })
            setApplicationDetails(null)
          }}
        />
      )
    }
  }
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
        <div className="  h-[80vh] w-full  overflow-auto rounded-[20px] bg-[#ebebebc6] p-[40px] text-center shadow-xl">
          <div className=" flex flex-col items-center  justify-center">
            <MainButton
              buttonText=" See The Application "
              buttonWidth="w-[3 0%]"
              onClick={() => {
                router.push('/JobApplicationPage')
              }}
            />
            {archiveButton()}
          </div>
          <h2 className=" m-5 text-2xl text-[#1c91de] "> Application</h2>
          <div className=" flex w-full grid-cols-2 ">
            <div className=" flex w-[50%] flex-col items-center justify-center">
              <ApplicationItem
                name="Full Name:"
                Item={applicationDetails?.item?.fullName}
              />
              <ApplicationItem
                name="Email:"
                Item={applicationDetails?.item?.email}
              />
              <ApplicationItem
                name="Position Applying For:"
                Item={applicationDetails?.item?.positionApplyingFor}
              />
              <ApplicationItem
                name="Previously been employed:"
                Item={applicationDetails?.item?.previously_been_employed}
              />
              {applicationDetails?.item?.previously_been_employed == 'Yes' && (
                <ApplicationItem
                  name="Dates of employment, location, and reason for separation:"
                  Item={applicationDetails?.item?.previouslyEmployedBox}
                />
              )}

              <ApplicationItem
                name="Phone Number:"
                Item={applicationDetails?.item?.phoneNumber}
              />
              {/* <ApplicationItem
                name="Gender:"
                Item={applicationDetails?.item?.gender}
              /> */}
              {/* <ApplicationItem
                name="Race:"
                Item={applicationDetails?.item?.race}
              /> */}
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
              {isPDf()}
              <ApplicationItem
                name="Ever been convected of a crime?"
                Item={
                  applicationDetails?.item
                    ?.Have_you_ever_been_convicted_of_a_crime
                }
              />
              {applicationDetails?.item
                ?.Have_you_ever_been_convicted_of_a_crime == 'Yes' && (
                <ApplicationItem
                  name="Convicted Of A Crime Details"
                  Item={applicationDetails?.item?.convictedOfACrimeBox}
                />
              )}
              <ApplicationItem
                name="Ever been terminated from a job?"
                Item={
                  applicationDetails?.item
                    ?.Have_you_ever_been_terminated_from_a_job
                }
              />
              <ApplicationItem
                name="Choice to resign rather than be terminated?"
                Item={
                  applicationDetails?.item
                    ?.radio_Choice_to_resign_rather_than_be_terminated
                }
              />
              <ApplicationItem
                name="Ever been terminated from a job?"
                Item={
                  applicationDetails?.item
                    ?.radio_Terminated_upon_mutual_agreement
                }
              />
              {applicationDetails?.item?.WhyTerminatedTextBox != 'null' && (
                <ApplicationItem
                  name="Why Terminated"
                  Item={applicationDetails?.item?.WhyTerminatedTextBox}
                />
              )}
              <ApplicationItem
                name="Authorize job application"
                Item={applicationDetails?.item?.authorize_job_application}
              />
              <ApplicationItem
                name="Have Previously Applied"
                Item={applicationDetails?.item?.havePreviouslyApplied}
              />
              {applicationDetails?.item?.havePreviouslyApplied == 'Yes' && (
                <ApplicationItem
                  name=" When And Where Did They Apply"
                  Item={applicationDetails?.item?.WhenAndWhereDidYouApply}
                />
              )}
              <ApplicationItem
                name="Under the age of 18"
                Item={applicationDetails?.item?.under_the_age_of_18}
              />
              {applicationDetails?.item?.ReferenceNameValue != '' &&
                applicationDetails?.item?.ReferenceNameValue != null && (
                  <div className="mt-9  flex w-full items-center justify-end  pr-[45px] ">
                    <div className=" flex w-[70%] flex-col items-center justify-center justify-self-end rounded-[20px]  border-2 border-[#1c91de] outline-2">
                      <h5 className=" text-xl font-bold">
                        Professorial Reference 1
                      </h5>
                      <ApplicationItem
                        name="Name"
                        Item={applicationDetails?.item?.ReferenceNameValue}
                      />
                      <ApplicationItem
                        name="Position"
                        Item={applicationDetails?.item?.ReferencePositionValue}
                      />
                      <ApplicationItem
                        name="Company"
                        Item={applicationDetails?.item?.ReferenceCompanyValue}
                      />
                      <ApplicationItem
                        name="Work Relationship?"
                        Item={
                          applicationDetails?.item
                            ?.ReferenceWorkRelationshipValue
                        }
                      />
                      <ApplicationItem
                        name="Phone Number"
                        Item={
                          applicationDetails?.item?.ReferencePhoneNumberValue
                        }
                      />
                    </div>
                  </div>
                )}
              {applicationDetails?.item?.ReferenceNameValue2 != '' &&
                applicationDetails?.item?.ReferenceNameValue2 != null && (
                  <div className="mt-9  flex w-full items-center justify-end  pr-[45px] ">
                    <div className=" flex w-[70%] flex-col items-center justify-center justify-self-end rounded-[20px]  border-2 border-[#1c91de] outline-2">
                      <h5 className=" text-xl font-bold">
                        Professorial Reference 2
                      </h5>
                      <ApplicationItem
                        name="Name"
                        Item={applicationDetails?.item?.ReferenceNameValue2}
                      />
                      <ApplicationItem
                        name="Position"
                        Item={applicationDetails?.item?.ReferencePositionValue2}
                      />
                      <ApplicationItem
                        name="Company"
                        Item={applicationDetails?.item?.ReferenceCompanyValue2}
                      />
                      <ApplicationItem
                        name="Work Relationship?"
                        Item={
                          applicationDetails?.item
                            ?.ReferenceWorkRelationshipValue2
                        }
                      />
                      <ApplicationItem
                        name="Phone Number"
                        Item={
                          applicationDetails?.item?.ReferencePhoneNumberValue2
                        }
                      />
                    </div>
                  </div>
                )}
              {applicationDetails?.item?.ReferenceNameValue3 != '' &&
                applicationDetails?.item?.ReferenceNameValue3 != null && (
                  <div className="mt-9  flex w-full items-center justify-end  pr-[45px] ">
                    <div className=" flex w-[70%] flex-col items-center justify-center justify-self-end rounded-[20px]  border-2 border-[#1c91de] outline-2">
                      <h5 className=" text-xl font-bold">
                        Personal Reference 1
                      </h5>
                      <ApplicationItem
                        name="Name"
                        Item={applicationDetails?.item?.ReferenceNameValue3}
                      />
                      <ApplicationItem
                        name="Position"
                        Item={applicationDetails?.item?.ReferencePositionValue3}
                      />
                      <ApplicationItem
                        name="Company"
                        Item={applicationDetails?.item?.ReferenceCompanyValue3}
                      />
                      <ApplicationItem
                        name="Work Relationship?"
                        Item={
                          applicationDetails?.item
                            ?.ReferenceWorkRelationshipValue3
                        }
                      />
                      <ApplicationItem
                        name="Phone Number"
                        Item={
                          applicationDetails?.item?.ReferencePhoneNumberValue3
                        }
                      />
                    </div>
                  </div>
                )}
              {applicationDetails?.item?.ReferenceNameValue4 != '' &&
                applicationDetails?.item?.ReferenceNameValue4 != null && (
                  <div className="mt-9  flex w-full items-center justify-end  pr-[45px] ">
                    <div className=" flex w-[70%] flex-col items-center justify-center justify-self-end rounded-[20px]  border-2 border-[#1c91de] outline-2">
                      <h5 className=" text-xl font-bold">
                        Personal Reference 2
                      </h5>
                      <ApplicationItem
                        name="Name"
                        Item={applicationDetails?.item?.ReferenceNameValue4}
                      />
                      <ApplicationItem
                        name="Position"
                        Item={applicationDetails?.item?.ReferencePositionValue4}
                      />
                      <ApplicationItem
                        name="Company"
                        Item={applicationDetails?.item?.ReferenceCompanyValue4}
                      />
                      <ApplicationItem
                        name="Work Relationship?"
                        Item={
                          applicationDetails?.item
                            ?.ReferenceWorkRelationshipValue4
                        }
                      />
                      <ApplicationItem
                        name="Phone Number"
                        Item={
                          applicationDetails?.item?.ReferencePhoneNumberValue4
                        }
                      />
                    </div>
                  </div>
                )}
            </div>
            <div className="flex w-[50%] flex-col">
              {/* <ApplicationItem
                name="Disability Status:"
                Item={applicationDetails?.item?.DisabilityStatus}
              /> */}
              <ApplicationItem
                name="Authorize to Receive Texts About Job:"
                Item={
                  applicationDetails?.item
                    ?.consent_to_receiving_text_messages_throughout_your_application_process
                }
              />

              <ApplicationItem
                name="Current extern or Contractor:"
                Item={
                  applicationDetails?.item
                    ?.former_or_current_extern_or_contractor
                }
              />
              {applicationDetails?.item
                ?.former_or_current_extern_or_contractor == 'Yes' && (
                <ApplicationItem
                  name="Extern dates and Location"
                  Item={
                    applicationDetails?.item
                      ?.former_or_current_extern_or_contractor
                  }
                />
              )}

              <ApplicationItem
                name="Require immigration Sponsorship:"
                Item={applicationDetails?.item?.require_immigration_sponsorShip}
              />
              <ApplicationItem
                name="Statement of Availability:"
                Item={applicationDetails?.item?.statmentOfAvailbilty}
              />
              {/* <ApplicationItem
                name="Veteran Status"
                Item={applicationDetails?.item?.veteranStatus}
              /> */}
              {applicationDetails?.item?.highSchool != '' &&
                applicationDetails?.item?.highSchool != null && (
                  <div className="mt-9  flex w-full items-center justify-end  pr-[45px] ">
                    <div className=" flex w-[70%] flex-col items-center justify-center justify-self-end rounded-[20px]  border-2 border-[#1c91de] outline-2">
                      <h5 className=" text-xl font-bold">HighSchool</h5>
                      <ApplicationItem
                        name="Name"
                        Item={applicationDetails?.item?.highSchool}
                      />
                      <ApplicationItem
                        name="Course of Study"
                        Item={applicationDetails?.item?.highSchoolCourseOfStudy}
                      />
                      <ApplicationItem
                        name="Graduated?"
                        Item={applicationDetails?.item?.highSchoolGraduate}
                      />
                      <ApplicationItem
                        name="Honors Received"
                        Item={
                          applicationDetails?.item?.highSchoolHonorsReceived
                        }
                      />
                      <ApplicationItem
                        name="Number of years completed"
                        Item={
                          applicationDetails?.item
                            ?.highSchoolNumberOfYearsCompleted
                        }
                      />
                    </div>
                  </div>
                )}
              {applicationDetails?.item?.college != '' &&
                applicationDetails?.item?.college != null && (
                  <div className="mt-9  flex w-full items-center justify-end  pr-[45px] ">
                    <div className=" flex w-[70%] flex-col items-center justify-center justify-self-end rounded-[20px]  border-2 border-[#1c91de] outline-2">
                      <h5 className=" text-xl font-bold">College</h5>
                      <ApplicationItem
                        name="Name"
                        Item={applicationDetails?.item?.college}
                      />
                      <ApplicationItem
                        name="Course of Study"
                        Item={applicationDetails?.item?.collegeCourseOfStudy}
                      />
                      <ApplicationItem
                        name="Graduated?"
                        Item={applicationDetails?.item?.collegeGraduate}
                      />
                      <ApplicationItem
                        name="Honors Received"
                        Item={applicationDetails?.item?.collegeHonorsReceived}
                      />
                      <ApplicationItem
                        name="Number of years completed"
                        Item={
                          applicationDetails?.item
                            ?.collegeNumberOfYearsCompleted
                        }
                      />
                    </div>
                  </div>
                )}
              {applicationDetails?.item?.Grad != '' &&
                applicationDetails?.item?.Grad != null && (
                  <div className="mt-9  flex w-full items-center justify-end  pr-[45px] ">
                    <div className=" flex w-[70%] flex-col items-center justify-center justify-self-end rounded-[20px]  border-2 border-[#1c91de] outline-2">
                      <h5 className=" text-xl font-bold">GradSchool</h5>
                      <ApplicationItem
                        name="Name"
                        Item={applicationDetails?.item?.Grad}
                      />
                      <ApplicationItem
                        name="Course of Study"
                        Item={applicationDetails?.item?.GradCourseOfStudy}
                      />
                      <ApplicationItem
                        name="Graduated?"
                        Item={applicationDetails?.item?.GradGraduate}
                      />
                      <ApplicationItem
                        name="Honors Received"
                        Item={applicationDetails?.item?.GradHonorsReceived}
                      />
                      <ApplicationItem
                        name="Number of years completed"
                        Item={
                          applicationDetails?.item?.GradNumberOfYearsCompleted
                        }
                      />
                    </div>
                  </div>
                )}
              {applicationDetails?.item?.trade != '' &&
                applicationDetails?.item?.trade != null && (
                  <div className="mt-9  flex w-full items-center justify-end  pr-[45px] ">
                    <div className=" flex w-[70%] flex-col items-center justify-center justify-self-end rounded-[20px]  border-2 border-[#1c91de] outline-2">
                      <h5 className=" text-xl font-bold">Trade School</h5>
                      <ApplicationItem
                        name="Name"
                        Item={applicationDetails?.item?.trade}
                      />
                      <ApplicationItem
                        name="Course of Study"
                        Item={applicationDetails?.item?.tradeCourseOfStudy}
                      />
                      <ApplicationItem
                        name="Graduated?"
                        Item={applicationDetails?.item?.tradeGraduate}
                      />
                      <ApplicationItem
                        name="Honors Received"
                        Item={applicationDetails?.item?.tradeHonorsReceived}
                      />
                      <ApplicationItem
                        name="Number of years completed"
                        Item={
                          applicationDetails?.item?.tradeNumberOfYearsCompleted
                        }
                      />
                    </div>
                  </div>
                )}
            </div>
          </div>
          {applicationDetails?.item?.workNameValue1 != '' &&
            applicationDetails?.item?.workNameValue1 != null && (
              <div className="mt-9  flex w-full items-center justify-end   ">
                <div className=" flex w-full flex-col items-center justify-center justify-self-end rounded-[20px]  border-2 border-[#1c91de] outline-2">
                  <h5 className=" text-xl font-bold">Work History 1</h5>
                  <ApplicationItem
                    name="Name"
                    Item={applicationDetails?.item?.workNameValue1}
                  />
                  <ApplicationItem
                    name="Job Title"
                    Item={applicationDetails?.item?.jobTitleValue1}
                  />
                  <div className=" flex justify-center">
                    <ApplicationItem
                      name="Start Date"
                      Item={[
                        applicationDetails?.item?.selectedDateStart1
                          .toDate()
                          .toString(),
                      ]}
                    />
                    <ApplicationItem
                      name="End Date"
                      Item={applicationDetails?.item?.selectedDateEnd1
                        .toDate()
                        .toString()}
                    />
                  </div>
                  <div className=" flex justify-center">
                    <ApplicationItem
                      name="Work Address"
                      Item={applicationDetails?.item?.workAddressValue1}
                    />
                    <ApplicationItem
                      name="Type of business"
                      Item={applicationDetails?.item?.typeOfBusiness1}
                    />
                  </div>
                  <ApplicationItem
                    name="Reason For Leaving"
                    Item={applicationDetails?.item?.reasonForLeaving1}
                  />
                  <ApplicationItem
                    name="Duties"
                    Item={applicationDetails?.item?.dutiesValue1}
                  />
                  <ApplicationItem
                    name="May we contact"
                    Item={applicationDetails?.item?.mayWeContactValue1}
                  />
                  <ApplicationItem
                    name="Supervisors Name"
                    Item={applicationDetails?.item?.supervisorsNameValue1}
                  />
                  <ApplicationItem
                    name="Phone Number"
                    Item={applicationDetails?.item?.workPhoneNumberValue1}
                  />
                </div>
              </div>
            )}
          {applicationDetails?.item?.workNameValue2 != '' &&
            applicationDetails?.item?.workNameValue2 != null && (
              <div className="mt-9  flex w-full items-center justify-end   ">
                <div className=" flex w-full flex-col items-center justify-center justify-self-end rounded-[20px]  border-2 border-[#1c91de] outline-2">
                  <h5 className=" text-xl font-bold">Work History 2</h5>
                  <ApplicationItem
                    name="Name"
                    Item={applicationDetails?.item?.workNameValue2}
                  />
                  <ApplicationItem
                    name="Job Title"
                    Item={applicationDetails?.item?.jobTitleValue2}
                  />
                  <div className=" flex justify-center">
                    <ApplicationItem
                      name="Start Date"
                      Item={[
                        applicationDetails?.item?.selectedDateStart2
                          .toDate()
                          .toString(),
                      ]}
                    />
                    <ApplicationItem
                      name="End Date"
                      Item={applicationDetails?.item?.selectedDateEnd2
                        .toDate()
                        .toString()}
                    />
                  </div>
                  <div className=" flex justify-center">
                    <ApplicationItem
                      name="Work Address"
                      Item={applicationDetails?.item?.workAddressValue2}
                    />
                    <ApplicationItem
                      name="Type of business"
                      Item={applicationDetails?.item?.typeOfBusiness2}
                    />
                  </div>
                  <ApplicationItem
                    name="Reason For Leaving"
                    Item={applicationDetails?.item?.reasonForLeaving2}
                  />
                  <ApplicationItem
                    name="Duties"
                    Item={applicationDetails?.item?.dutiesValue2}
                  />
                  <ApplicationItem
                    name="May we contact"
                    Item={applicationDetails?.item?.mayWeContactValue2}
                  />
                  <ApplicationItem
                    name="Supervisors Name"
                    Item={applicationDetails?.item?.supervisorsNameValue2}
                  />
                  <ApplicationItem
                    name="Phone Number"
                    Item={applicationDetails?.item?.workPhoneNumberValue2}
                  />
                </div>
              </div>
            )}
          {applicationDetails?.item?.workNameValue3 != '' &&
            applicationDetails?.item?.workNameValue3 != null && (
              <div className="mt-9  flex w-full items-center justify-end   ">
                <div className=" flex w-full flex-col items-center justify-center justify-self-end rounded-[20px]  border-2 border-[#1c91de] outline-2">
                  <h5 className=" text-xl font-bold">Work History 3</h5>
                  <ApplicationItem
                    name="Name"
                    Item={applicationDetails?.item?.workNameValue3}
                  />
                  <ApplicationItem
                    name="Job Title"
                    Item={applicationDetails?.item?.jobTitleValue3}
                  />
                  <div className=" flex justify-center">
                    <ApplicationItem
                      name="Start Date"
                      Item={[
                        applicationDetails?.item?.selectedDateStart3
                          .toDate()
                          .toString(),
                      ]}
                    />
                    <ApplicationItem
                      name="End Date"
                      Item={applicationDetails?.item?.selectedDateEnd3
                        .toDate()
                        .toString()}
                    />
                  </div>
                  <div className=" flex justify-center">
                    <ApplicationItem
                      name="Work Address"
                      Item={applicationDetails?.item?.workAddressValue3}
                    />
                    <ApplicationItem
                      name="Type of business"
                      Item={applicationDetails?.item?.typeOfBusiness3}
                    />
                  </div>
                  <ApplicationItem
                    name="Reason For Leaving"
                    Item={applicationDetails?.item?.reasonForLeaving3}
                  />
                  <ApplicationItem
                    name="Duties"
                    Item={applicationDetails?.item?.dutiesValue3}
                  />
                  <ApplicationItem
                    name="May we contact"
                    Item={applicationDetails?.item?.mayWeContactValue3}
                  />
                  <ApplicationItem
                    name="Supervisors Name"
                    Item={applicationDetails?.item?.supervisorsNameValue3}
                  />
                  <ApplicationItem
                    name="Phone Number"
                    Item={applicationDetails?.item?.workPhoneNumberValue3}
                  />
                </div>
              </div>
            )}
          <div className=" flex items-center justify-center justify-self-center">
            <ApplicationItem
              name="Signature"
              Item={applicationDetails?.item?.fullName}
            />
          </div>
        </div>
      )
    }
  }
  const showArchiveList = () => {
    if (showArchived == true) {
      return (
        <MainButton
          buttonText=" Hide Archived"
          onClick={() => {
            setShowArchived(!showArchived)
            setApplicationDetails(null)
          }}
        />
      )
    } else {
      return (
        <MainButton
          buttonText=" Show Archived"
          onClick={() => {
            setShowArchived(!showArchived)
            setApplicationDetails(null)
          }}
        />
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
        <div className=" flex h-[80vh] w-[25%] flex-col">
          <div className=" flex flex-col items-center justify-center">
            {showArchiveList()}
            <LineDivider
              lineHight="h-[10px]"
              lineWidth="w-[50px]"
              lineColor="#737272f"
            />
          </div>
          <div
            className={classnames(
              `flex h-[80vh] w-[full] flex-col  overflow-y-auto `
            )}
          >
            {list}
          </div>
        </div>
        <div className="flex w-[75%] flex-col justify-center  p-[20px]">
          {details()}
        </div>
      </main>
    </div>
  )
}
export default SubmitedResumes
