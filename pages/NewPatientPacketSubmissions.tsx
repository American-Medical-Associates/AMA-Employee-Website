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
  //search form submissions
  useEffect(() => {
    if (searchFormAnswers.length > 0) {
      //remove all spaces in the searchFormAnswers
      const searchFormAnswersWithoutSpaces = searchFormAnswers.replace(
        /\s/g,
        ''
      )

      Object.keys(selectedPacket).map((item: any) => {
        console.log('sdfsdfsdf', item)

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
              console.log('selectedPacket', selectedPacket)
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
              console.log('selectedPacket', selectedPacket)
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
      <Header selectCompany={'AMA'} />
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
                        // console.log('firstname', selectedPacket.firstName)
                        // console.log('last', selectedPacket.lastName)
                        // console.log('b', selectedPacket.BirthDateValue)
                        // console.log('s', selectedPacket.socialValue)
                        // console.log(selectedPacket.addressValue)
                        // console.log(selectedPacket.cityValue)
                        // console.log(selectedPacket.USStateValue)
                        // console.log(selectedPacket.zipCodeValue)
                        // console.log(selectedPacket.phoneNumberValue)
                        // console.log(selectedPacket.emailValue)
                        // console.log(selectedPacket.isCheckedMale)
                        // console.log(selectedPacket.isCheckedFemale)
                        // console.log(selectedPacket.isCheckedOther)
                        // console.log(selectedPacket.EmergencyContactRelationShip)
                        // console.log(selectedPacket.nameOfEmergencyContact)
                        // console.log(selectedPacket.EmergencyContactPhoneNumber)
                        // console.log(selectedPacket.married)
                        // console.log(selectedPacket.single)
                        // console.log(selectedPacket.divorced)
                        // console.log(selectedPacket.widowed)

                        // console.log(selectedPacket.separated)
                        // console.log(selectedPacket.withPartner)
                        // console.log(selectedPacket.Ethnicity)

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
          {Array.isArray(selectedPacket) == false && (
            <div
              className=" flex w-full flex-col items-center justify-center"
              ref={pdfRef}
            >
              <InformationSection
                title="Patient Information"
                contentInSection={[
                  {
                    fieldTitle: 'First Name:',
                    fieldValue: selectedPacket.firstName,
                  },
                  {
                    fieldTitle: 'Last Name:',
                    fieldValue: selectedPacket.lastName,
                  },
                  {
                    fieldTitle: 'Preferred Name:',
                    fieldValue: selectedPacket.preferredName,
                  },
                  {
                    fieldTitle: 'Birth Date:',
                    fieldValue: selectedPacket.BirthDateValue,
                  },
                  {
                    fieldTitle: 'Phone Number:',
                    fieldValue: selectedPacket.phoneNumberValue,
                  },
                  {
                    fieldTitle: 'Home Phone:',
                    fieldValue: selectedPacket.homePhone,
                  },
                  {
                    fieldTitle: 'Email:',
                    fieldValue: selectedPacket.emailValue,
                  },
                  {
                    fieldTitle: 'Address:',
                    fieldValue: selectedPacket.addressValue,
                  },
                  {
                    fieldTitle: 'Address 2:',
                    fieldValue: selectedPacket.addressValue2,
                  },
                  {
                    fieldTitle: 'City:',
                    fieldValue: selectedPacket.cityValue,
                  },
                  {
                    fieldTitle: 'State:',
                    fieldValue: selectedPacket.USStateValue,
                  },
                  {
                    fieldTitle: 'Zip Code:',
                    fieldValue: selectedPacket.zipCodeValue,
                  },
                  {
                    fieldTitle: 'Social Security Number:',
                    fieldValue: selectedPacket.socialValue,
                  },
                  selectedPacket.isCheckedMale && {
                    fieldTitle: 'Gender:',
                    fieldValue: 'Male',
                    realValue: selectedPacket.isCheckedMale,
                  },
                  selectedPacket.isCheckedFemale && {
                    fieldTitle: 'Gender:',
                    fieldValue: 'Female',
                    realValue: selectedPacket.isCheckedFemale,
                  },
                  selectedPacket.isCheckedOther && {
                    fieldTitle: 'Gender:',
                    fieldValue: 'Other',
                    realValue: selectedPacket.isCheckedOther,
                  },
                  selectedPacket.single && {
                    fieldTitle: 'Marital Status:',
                    fieldValue: 'Single',
                    realValue: selectedPacket.single,
                  },
                  selectedPacket.married && {
                    fieldTitle: 'Marital Status:',
                    fieldValue: 'Married',
                    realValue: selectedPacket.married,
                  },
                  selectedPacket.divorced && {
                    fieldTitle: 'Marital Status:',
                    fieldValue: 'Divorced',
                    realValue: selectedPacket.divorced,
                  },
                  selectedPacket.widowed && {
                    fieldTitle: 'Marital Status:',
                    fieldValue: 'Widowed',
                    realValue: selectedPacket.widowed,
                  },
                  selectedPacket.separated && {
                    fieldTitle: 'Marital Status:',
                    fieldValue: 'Separated',
                    realValue: selectedPacket.separated,
                  },
                  selectedPacket.withPartner && {
                    fieldTitle: 'Marital Status:',
                    fieldValue: 'With Partner',
                    realValue: selectedPacket.withPartner,
                  },
                  {
                    fieldTitle: 'May we take your picture:',
                    fieldValue: selectedPacket.MayWeTakeYourPicture,
                  },
                  {
                    fieldTitle: 'Ethnicity',
                    fieldValue: selectedPacket.Ethnicity,
                  },
                  {
                    fieldTitle: 'How did they hear about us:',
                    fieldValue: selectedPacket.HowDidTheyHearAboutUs,
                  },
                ]}
              />
              {selectedPacket.pictureOfFrontOfDriverLicense && (
                <div className="flex flex-col items-center justify-center">
                  <label className=" text-2xl font-bold">Driver License</label>
                  <img src={selectedPacket.pictureOfFrontOfDriverLicense} />
                  {/* <MainButton
                    buttonText="Driver License"
                    onClick={() => {
                      //open the image in a new tab
                      window.open(selectedPacket.pictureOfFrontOfDriverLicense)
                    }}
                  /> */}
                </div>
              )}
              {selectedPacket.pictureOfTheirFace && (
                <div className="flex flex-col items-center justify-center">
                  <label className=" text-2xl font-bold">
                    Picture Of Their Face
                  </label>
                  <img src={selectedPacket.pictureOfTheirFace} />
                </div>
              )}
              <InformationSection
                title="Emergency Contact Information"
                contentInSection={[
                  {
                    fieldTitle: 'Name:',
                    fieldValue: selectedPacket.nameOfEmergencyContact,
                  },
                  {
                    fieldTitle: 'Relationship:',
                    fieldValue: selectedPacket.EmergencyContactRelationShip,
                  },
                  {
                    fieldTitle: 'Phone Number:',
                    fieldValue: selectedPacket.EmergencyContactPhoneNumber,
                  },
                ]}
              />
              <InformationSection
                title="Insurance Information"
                contentInSection={[
                  {
                    fieldTitle: 'How do they wish to pay:',
                    fieldValue: selectedPacket.howDoTheyWishToPay,
                  },
                  selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                    fieldTitle: 'Primary Insurance Company:',
                    fieldValue: selectedPacket.primaryInsurance,
                  },
                  selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                    fieldTitle: 'Primary Insurance Policy Number:',
                    fieldValue: selectedPacket.primaryInsuranceID,
                  },
                  selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                    fieldTitle: 'Primary Insurance Group Number:',
                    fieldValue: selectedPacket.primaryInsuranceGroup,
                  },
                  selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                    fieldTitle: 'Primary Insurance Phone Number:',
                    fieldValue: selectedPacket.primaryInsurancePhone,
                  },
                  selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                    fieldTitle: 'Primary Insurance Address:',
                    fieldValue: selectedPacket.primaryInsuranceAddress1,
                  },
                  selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                    fieldTitle: 'Primary Insurance Address 2:',
                    fieldValue: selectedPacket.primaryInsuranceAddress2,
                  },
                  selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                    fieldTitle: 'Primary Insurance City:',
                    fieldValue: selectedPacket.primaryInsuranceCity,
                  },
                  selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                    fieldTitle: 'Primary Insurance State:',
                    fieldValue: selectedPacket.primaryInsuranceState,
                  },
                  selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                    fieldTitle: 'Primary Insurance Zip Code:',
                    fieldValue: selectedPacket.primaryInsuranceZipCode,
                  },
                  selectedPacket.howDoTheyWishToPay == 'Insurance' && {
                    fieldTitle: 'Primary Insurance Subscriber Name:',
                    fieldValue: selectedPacket.primarySubscribersName,
                  },

                  selectedPacket.secondaryInsurance == '' && {
                    fieldTitle: 'Secondary Insurance Company:',
                    fieldValue: selectedPacket.secondaryInsurance,
                  },
                  selectedPacket.secondaryInsuranceID == '' && {
                    fieldTitle: 'Secondary Insurance Policy Number:',
                    fieldValue: selectedPacket.secondaryInsuranceID,
                  },
                  selectedPacket.secondaryInsuranceGroup == '' && {
                    fieldTitle: 'Secondary Insurance Group Number:',
                    fieldValue: selectedPacket.secondaryInsuranceGroup,
                  },
                  selectedPacket.secondaryInsurancePhone == '' && {
                    fieldTitle: 'Secondary Insurance Phone Number:',
                    fieldValue: selectedPacket.secondaryInsurancePhone,
                  },
                  selectedPacket.secondaryInsuranceAddress1 == '' && {
                    fieldTitle: 'Secondary Insurance Address:',
                    fieldValue: selectedPacket.secondaryInsuranceAddress1,
                  },
                  selectedPacket.secondaryInsuranceAddress2 == '' && {
                    fieldTitle: 'Secondary Insurance Address 2:',
                    fieldValue: selectedPacket.secondaryInsuranceAddress2,
                  },
                  selectedPacket.secondaryInsuranceCity == '' && {
                    fieldTitle: 'Secondary Insurance City:',
                    fieldValue: selectedPacket.secondaryInsuranceCity,
                  },
                  selectedPacket.secondaryInsuranceState == '' && {
                    fieldTitle: 'Secondary Insurance State:',
                    fieldValue: selectedPacket.secondaryInsuranceState,
                  },
                  selectedPacket.secondaryInsuranceZipCode == '' && {
                    fieldTitle: 'Secondary Insurance Zip Code:',
                    fieldValue: selectedPacket.secondaryInsuranceZipCode,
                  },
                  selectedPacket.secondarySubscribersName == '' && {
                    fieldTitle: 'Secondary Insurance Subscriber Name:',
                    fieldValue: selectedPacket.secondarySubscribersName,
                  },
                ]}
              />
              {selectedPacket.primaryPictureOfInsuranceCardFront && (
                <div className="flex flex-col items-center justify-center">
                  <label className=" text-2xl font-bold">Insurance Card</label>
                  <img
                    src={selectedPacket.primaryPictureOfInsuranceCardFront}
                  />
                  {/* <MainButton
                    buttonText="Primary Insurance Card"
                    onClick={() => {
                      //open the image in a new tab
                      window.open(
                        selectedPacket.primaryPictureOfInsuranceCardFront
                      )
                    }}
                  /> */}
                </div>
              )}
              {selectedPacket.secondaryPictureOfInsuranceCardFront && (
                <div className="flex flex-col items-center justify-center">
                  <MainButton
                    buttonText="Secondary Insurance Card"
                    onClick={() => {
                      //open the image in a new tab
                      window.open(
                        selectedPacket.secondaryPictureOfInsuranceCardFront
                      )
                    }}
                  />
                </div>
              )}
              <InformationSection
                title="Retail pharmacy information"
                contentInSection={[
                  {
                    fieldTitle: 'Name of Pharmacy:',
                    fieldValue: selectedPacket.retailPharmacyName,
                  },
                  {
                    fieldTitle: 'Pharmacy Cross Street One:',
                    fieldValue: selectedPacket.retailPharmacyCrossStreet1,
                  },
                  {
                    fieldTitle: 'Pharmacy Cross Street Two:',
                    fieldValue: selectedPacket.retailPharmacyCrossStreet2,
                  },
                  {
                    fieldTitle: 'Pharmacy Phone Number:',
                    fieldValue: selectedPacket.retailPharmacyPhoneNumber,
                  },
                  {
                    fieldTitle: 'Pharmacy Fax Number:',
                    fieldValue: selectedPacket.retailPharmacyFaxNumber,
                  },
                ]}
              />
              <InformationSection
                title="Mail order pharmacy information"
                contentInSection={[
                  {
                    fieldTitle: 'Name of Pharmacy:',
                    fieldValue: selectedPacket.mailOrderPharmacyName,
                  },
                  {
                    fieldTitle: 'Pharmacy Cross Street One:',
                    fieldValue: selectedPacket.mailOrderPharmacyAddress1,
                  },
                  {
                    fieldTitle: 'Pharmacy Cross Street Two:',
                    fieldValue: selectedPacket.mailOrderPharmacyAddress2,
                  },
                  {
                    fieldTitle: 'Pharmacy Phone Number:',
                    fieldValue: selectedPacket.mailOrderPharmacyPhoneNumber,
                  },
                ]}
              />
              <h3 className=" my-10 text-4xl font-bold text-[#1969f4] underline">
                Patient Medical Information
              </h3>
              <InformationSection
                title="Allergies"
                contentInSection={[
                  {
                    fieldTitle: 'Are you allergic to Latex:',
                    fieldValue: selectedPacket.areYouAllergicToLatex,
                  },
                  {
                    fieldTitle: 'Are you allergic to Shellfish:',
                    fieldValue: selectedPacket.areYouAllergicToSelfish,
                  },
                  {
                    fieldTitle: 'Are you allergic to Iodine:',
                    fieldValue: selectedPacket.areYouAllergicToIodine,
                  },
                  {
                    fieldTitle: 'Drug Allergies:',
                    fieldValue: selectedPacket.PatientDrugAllergies,
                  },
                ]}
              />
              <InformationSection
                title="PAP History"
                contentInSection={[
                  {
                    fieldTitle: 'Date of last PAP:',
                    fieldValue: selectedPacket.dateOfLastPAP,
                  },
                  {
                    fieldTitle: 'Was PAP Normal:',
                    fieldValue: selectedPacket.wasPapNormalOrAbnormal,
                  },
                  {
                    fieldTitle: 'Date of last Mammogram:',
                    fieldValue: selectedPacket.dateOfLastMammogram,
                  },
                  {
                    fieldTitle: 'Was Mammogram Normal:',
                    fieldValue: selectedPacket.wasMammogramNormalOrAbnormal,
                  },
                ]}
              />
              <InformationSection
                title="PSA History"
                contentInSection={[
                  {
                    fieldTitle: 'Date of last PAS:',
                    fieldValue: selectedPacket.dateOfLastPSA,
                  },
                  {
                    fieldTitle: 'Was PAS Normal:',
                    fieldValue: selectedPacket.wasPSANormalOrAbnormal,
                  },
                ]}
              />
              <InformationSection
                title="Medical History"
                contentInSection={[
                  {
                    fieldTitle: 'All Major Illnesses:',
                    fieldValue: selectedPacket.allMajorIllnesses,
                  },
                  {
                    fieldTitle: 'All Major Surgeries:',
                    fieldValue:
                      selectedPacket.allMajorSurgeriesAndHospitalizations,
                  },
                  {
                    fieldTitle: 'All History of Disease:',
                    fieldValue: selectedPacket.allMedicalHistoryOfDisease,
                  },
                  {
                    fieldTitle: 'All Medications:',
                    fieldValue: selectedPacket.listOfAllCurrentMedications,
                  },
                  {
                    fieldTitle: 'Have they had a Bone Density Screening :',
                    fieldValue: selectedPacket.boneDensityScreening,
                  },
                  selectedPacket.boneDensityScreening == 'Yes' && {
                    fieldTitle: 'Date of last Bone Density Screening:',
                    fieldValue: selectedPacket.BoneDensityScreeningDate,
                  },
                  selectedPacket.boneDensityScreening == 'Yes' && {
                    fieldTitle: 'Was Bone Density Screening Normal:',
                    fieldValue:
                      selectedPacket.wasBoneDensityScreeningNormalOrAbnormal,
                  },
                  {
                    fieldTitle: 'Have they had a Colonoscopy:',
                    fieldValue: selectedPacket.colonoscopyScreening,
                  },
                  selectedPacket.colonoscopy == 'Yes' && {
                    fieldTitle: 'Date of last Colonoscopy:',
                    fieldValue: selectedPacket.dateOfLastColonoscopyScreening,
                  },
                  selectedPacket.colonoscopy == 'Yes' && {
                    fieldTitle: 'Was Colonoscopy Normal:',
                    fieldValue:
                      selectedPacket.wasColonoscopyScreeningNormalOrAbnormal,
                  },
                  {
                    fieldTitle: 'Have they ever smoked:',
                    fieldValue: selectedPacket.haveTheyEverSmoked,
                  },
                  selectedPacket.haveTheyEverSmoked == 'Yes' && {
                    fieldTitle: 'How many packs per day:',
                    fieldValue: selectedPacket.howManyPacksPerDay,
                  },
                  {
                    fieldTitle: 'Any Other Tobacco Or E-Cigarettes:',
                    fieldValue: selectedPacket.anyOtherTobaccoOrEcigarettes,
                  },
                  selectedPacket.anyOtherTobaccoOrEcigarettes == 'Yes' && {
                    fieldTitle: 'Describe other tobacco use:',
                    fieldValue: selectedPacket.describeOtherTobaccoUse,
                  },
                  {
                    fieldTitle: 'Do they drink coffee:',
                    fieldValue: selectedPacket.doYouDrinkCoffee,
                  },
                  selectedPacket.doYouDrinkCoffee == 'Yes' && {
                    fieldTitle: 'How many cups per day:',
                    fieldValue: selectedPacket.howManyCupsPerDay,
                  },
                  {
                    fieldTitle: 'Do they drink alcohol:',
                    fieldValue: selectedPacket.doYouDrinkAlcohol,
                  },
                  selectedPacket.doYouDrinkAlcohol == 'Yes' && {
                    fieldTitle: 'How many drinks per week:',
                    fieldValue: selectedPacket.howManyDrinksPerWeek,
                  },
                  {
                    fieldTitle: 'Do they use recreational drugs:',
                    fieldValue:
                      selectedPacket.doYoCurrentlyUseRecreationalDrugs,
                  },
                  selectedPacket.doYoCurrentlyUseRecreationalDrugs == 'Yes' && {
                    fieldTitle: 'Describe recreational drug use:',
                    fieldValue: selectedPacket.describeRecreationalDrugUse,
                  },
                  {
                    fieldTitle: 'Do they use illegal street drugs:',
                    fieldValue: selectedPacket.doYouUseIllegaLStreetDrugs,
                  },
                  selectedPacket.doYouUseIllegaLStreetDrugs == 'Yes' && {
                    fieldTitle: 'Describe illegal street drug use:',
                    fieldValue: selectedPacket.describeIllegalStreetDrugUse,
                  },
                ]}
              />
              <InformationSection
                title="Mental Health"
                contentInSection={[
                  {
                    fieldTitle: 'Do you feel depressed:',
                    fieldValue: selectedPacket.doYouFeelDepressed,
                  },
                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle: 'Do you cry frequently:',
                    fieldValue: selectedPacket.doYouCryFrequently,
                  },
                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle: 'Do you have little interest in doing things:',
                    fieldValue:
                      selectedPacket.doYouHaveLittleInterestInDoingThings,
                  },
                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle: 'Do you feel hopeless:',
                    fieldValue: selectedPacket.doYouFeelHopelessDownOrDepressed,
                  },
                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle:
                      'Are you having trouble falling asleep, or are sleeping too much:',
                    fieldValue:
                      selectedPacket.doYouHaveTroubleFallingAsleepOrSleepingTooMuch,
                  },

                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle: 'Do you feel tired or have little energy:',
                    fieldValue: selectedPacket.doYouFeelTiredOrHaveLittleEnergy,
                  },
                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle: 'Do you have poor appetite or overeat:',
                    fieldValue:
                      selectedPacket.doYouHavAPoorAppetiteOrOverEating,
                  },
                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle: 'Do you feel bad about yourself:',
                    fieldValue: selectedPacket.doYouFeelBadAboutYourself,
                  },
                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle: 'Do you have trouble concentrating:',
                    fieldValue: selectedPacket.troubleConcentrating,
                  },
                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle:
                      'Do you move or speak so slowly that other people could have noticed:',
                    fieldValue: selectedPacket.doYouMoveOrSpeakSlowly,
                  },
                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle: "Do you think you'd be better dead:",
                    fieldValue: selectedPacket.thoughtsYouWouldBeBetterOffDead,
                  },
                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle: 'Is stress a major problem:',
                    fieldValue: selectedPacket.isStressAMajorProblem,
                  },
                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle: 'Do you panic when stressed:',
                    fieldValue: selectedPacket.doYouPanicWhenStressed,
                  },
                  selectedPacket.doYouFeelDepressed == 'Yes' && {
                    fieldTitle: 'Have you attempted suicide:',
                    fieldValue: selectedPacket.haveYouEverAttemptedSuicide,
                  },
                ]}
              />
              <InformationSection
                title="Family History"
                contentInSection={[
                  {
                    fieldTitle: 'Family Alcohol Disorder:',
                    fieldValue: selectedPacket.familyMedicalAlcoholismAddiction,
                  },

                  {
                    fieldTitle: 'Family Bleeding Disorder:',
                    fieldValue: selectedPacket.familyMedicalBleedingDisorders,
                  },
                  {
                    fieldTitle: 'Family Cancer:',
                    fieldValue: selectedPacket.familyMedicalCancer,
                  },
                  {
                    fieldTitle: 'Family Diabetes:',
                    fieldValue: selectedPacket.familyMedicalDiabetes,
                  },
                  {
                    fieldTitle: 'Family hHeart Attack:',
                    fieldValue: selectedPacket.familyMedicalHeartAttack,
                  },
                  {
                    fieldTitle: 'Family High Blood Pressure:',
                    fieldValue: selectedPacket.familyMedicalHighBloodPressure,
                  },
                  {
                    fieldTitle: 'Family High Cholesterol:',
                    fieldValue: selectedPacket.familyMedicalHighCholesterol,
                  },
                  {
                    fieldTitle: 'Family Kidney Disease:',
                    fieldValue: selectedPacket.familyMedicalKidneyDisease,
                  },
                  {
                    fieldTitle: 'Family Mental Illness:',
                    fieldValue: selectedPacket.familyMedicalMentalIllness,
                  },
                  {
                    fieldTitle: 'Family Stroke:',
                    fieldValue: selectedPacket.familyMedicalStroke,
                  },
                  {
                    fieldTitle: 'Family Tuberculosis:',
                    fieldValue: selectedPacket.familyMedicalTuberculosis,
                  },
                  {
                    fieldTitle: 'Father Still Living:',
                    fieldValue: selectedPacket.isYourFatherStillLiving,
                  },
                  {
                    fieldTitle: 'Mother Still Living:',
                    fieldValue: selectedPacket.isYourMotherStillLiving,
                  },
                ]}
              />
              <InformationSection
                title="Signature"
                contentInSection={[
                  {
                    fieldTitle: 'Medical Review Signature:',
                    fieldValue: selectedPacket.patientMedicalReviewSignature,
                  },
                  {
                    fieldTitle: 'Medical Review Signature Date:',
                    fieldValue:
                      selectedPacket.patientMedicalReviewSignatureDate,
                  },
                  selectedPacket.PatientMedicalReviewSignatureCheckBox && {
                    fieldTitle: 'Approval of Electronic Signature:',
                    fieldValue: 'Yes',
                  },
                  !selectedPacket.PatientMedicalReviewSignatureCheckBox && {
                    fieldTitle: 'Approval of Electronic Signature:',
                    fieldValue: 'No',
                  },
                ]}
              />
              <InformationSection
                title="Hippa"
                contentInSection={[
                  {
                    fieldTitle: 'Hippa Signature:',
                    fieldValue: selectedPacket.hippa.hippaSignature,
                  },
                  {
                    fieldTitle: 'Hippa Signature Date:',
                    fieldValue: selectedPacket.hippa.signatureDate,
                  },
                  selectedPacket.hippa.signatureCheckBoxConsent && {
                    fieldTitle: 'Approval of Electronic Signature:',
                    fieldValue: 'Yes',
                  },

                  !selectedPacket.hippa.signatureCheckBoxConsent && {
                    fieldTitle: 'Approval of Electronic Signature:',
                    fieldValue: 'No',
                  },
                  {
                    fieldTitle: 'Name 1:',
                    fieldValue: selectedPacket.hippa.name,
                  },
                  {
                    fieldTitle: 'RelationShip 1:',
                    fieldValue: selectedPacket.hippa.relationShip,
                  },
                  {
                    fieldTitle: 'Name 2:',
                    fieldValue: selectedPacket.hippa.name2,
                  },
                  {
                    fieldTitle: 'RelationShip 2:',
                    fieldValue: selectedPacket.hippa.relationShip2,
                  },
                  {
                    fieldTitle: 'Name 3:',
                    fieldValue: selectedPacket.hippa.name3,
                  },
                  {
                    fieldTitle: 'RelationShip 3:',
                    fieldValue: selectedPacket.hippa.relationShip3,
                  },
                  {
                    fieldTitle: 'Name 4:',
                    fieldValue: selectedPacket.hippa.name4,
                  },
                  {
                    fieldTitle: 'RelationShip 4:',
                    fieldValue: selectedPacket.hippa.relationShip4,
                  },
                ]}
              />
              <InformationSection
                title="Advanced Directives"
                contentInSection={[
                  {
                    fieldTitle: 'Living Will:',
                    fieldValue: selectedPacket.AdvancedDirectives.signature,
                  },
                  {
                    fieldTitle: 'Living Will Date:',
                    fieldValue: selectedPacket.AdvancedDirectives.date,
                  },
                  selectedPacket.AdvancedDirectives
                    .agreeThatTheirSignatureIsValid && {
                    fieldTitle: 'Approval of Electronic Signature:',
                    fieldValue: 'Yes',
                  },
                  !selectedPacket.AdvancedDirectives
                    .agreeThatTheirSignatureIsValid && {
                    fieldTitle: 'Approval of Electronic Signature:',
                    fieldValue: 'No',
                  },
                  {
                    fieldTitle: 'Health Care Power of Attorney:',
                    fieldValue:
                      selectedPacket.AdvancedDirectives
                        .healthCarePowerOfAttorney,
                  },
                  {
                    fieldTitle: 'Health Care Power of Attorney Name:',
                    fieldValue:
                      selectedPacket.AdvancedDirectives
                        .healthCarePowerOfAttorneyName,
                  },
                  {
                    fieldTitle: 'Phone Number:',
                    fieldValue: selectedPacket.AdvancedDirectives.phoneNumber,
                  },
                  {
                    fieldTitle: 'Pre Hospital Medical Directives:',
                    fieldValue:
                      selectedPacket.AdvancedDirectives
                        .preHospitalMedicalDirectives,
                  },
                  {
                    fieldTitle: 'Do They Have A Living Will:',
                    fieldValue:
                      selectedPacket.AdvancedDirectives.doYouHaveALivingWill,
                  },
                ]}
              />
              <InformationSection
                title="Financial policy"
                contentInSection={[
                  {
                    fieldTitle: 'Financial Policy Signature:',
                    fieldValue: selectedPacket.financialPolicySignature,
                  },
                  {
                    fieldTitle: 'Financial Policy Signature Date:',
                    fieldValue: selectedPacket.financialPolicySignatureDate,
                  },
                  selectedPacket.financialPolicySignatureCheckBox && {
                    fieldTitle: 'Approval of Electronic Signature:',
                    fieldValue: 'Yes',
                  },
                  !selectedPacket.financialPolicySignatureCheckBox && {
                    fieldTitle: 'Approval of Electronic Signature:',
                    fieldValue: 'No',
                  },
                ]}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
