import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Header from '../../components/navigation/Header'
import { useRouter } from 'next/router'
import MainButton from '../../components/Buttons/MainButton'
import TextInput from '../../components/userInput/TextInput'
import DateInput from '../../components/userInput/DateInput'
import CustomCheckBoxFeild from '../../components/formComponents/CustomCheckBoxField'
import { CircularButton } from '../../components/Buttons/CircularButtonIcon'
import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { RoundAddButton } from '../../components/Buttons/RoundAddButton'
import { addAMAInternalMedicineMIS } from '../../firebase'

const InternalMedicine: NextPage<{}> = () => {
  const [selectedProvider, setSelectedProvider] = useState<Array<string>>([])
  const [submittedProvider, setSubmittedProvider] = useState<Array<any>>([])
  const [numberOfPatients, setNumberOfPatients] = useState('')
  const [numberOfNewPatients, setNumberOfNewPatients] = useState('')
  const [numberOfTeleVisits, setNumberOfTeleVisits] = useState('')
  const [hoursScheduled, setHoursScheduled] = useState('')
  const [patientReferredBy, setPatientReferredBy] = useState('')
  const [numberOfIMInjections, setNumberOfIMInjections] = useState('')
  const [hoursScheduledOperations, setHoursScheduledOperations] = useState('')
  const [patientReferredByOperations, setPatientReferredByOperations] =
    useState('')
  const [numberOfIMInjectionsOperations, setNumberOfIMInjectionsOperations] =
    useState('')
  const [
    numberOfTriggerAndJointInjectionsOperations,
    setNumberOfTriggerAndJointInjectionsOperations,
  ] = useState('')
  const [numberOfCCMsignedUpOperations, setNumberOfCCMsignedUpOperations] =
    useState('')
  const [numberOfCCMContactedOperations, setNumberOfCCMContactedOperations] =
    useState('')

  console.log(submittedProvider)

  const Added = submittedProvider.map((provider) => {
    console.log(provider.selectedProvider)

    return (
      <div className=" my-10 flex w-[80%] flex-col items-center justify-center rounded-[25px] bg-white p-5 shadow-2xl">
        <div className=" w-full ">
          <CircularButton
            deletion={true}
            icon={<XMarkIcon className=" h-6 w-6 text-white" />}
            onClick={() => {
              setSubmittedProvider(
                submittedProvider.filter(
                  (item) =>
                    item[0].selectedProvider !== provider[0].selectedProvider
                )
              )
            }}
          />
        </div>
        <p>Provider: {provider.selectedProvider}</p>
        <p>Number of Patients: {provider.numberOfPatients}</p>
        <p>Number of New Patients: {provider.numberOfNewPatients}</p>
        <p>Number of Tele Visits: {provider.numberOfTeleVisits}</p>
        <p>Hours Scheduled: {provider.hoursScheduled}</p>
        <p>Patients Referred By: {provider.patientReferredBy}</p>
        <p>Number Of IM Injections: {provider.numberOfIMInjections}</p>
      </div>
    )
  })

  return (
    <div>
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <main className="flex flex-col items-center justify-center p-10">
        <h1 className=" mb-10 text-3xl">Internal Medicine MIS</h1>
        {submittedProvider.length > 0 && (
          <div className=" mt-10 flex h-[300px] w-full flex-col items-center   ">
            <div className=" flex w-[90%] flex-col items-center overflow-y-scroll rounded-[25px] bg-[#E9E9E9C6]">
              {Added}
            </div>
          </div>
        )}
        {submittedProvider.length > 0 && (
          <div className="my-5">
            <CircularButton
              isSelection={true}
              icon={
                <PaperAirplaneIcon className='className=" h-6 w-6 text-white' />
              }
              onClick={() => {
                addAMAInternalMedicineMIS({
                  mis: submittedProvider,
                }).then(() => {
                  setSubmittedProvider([])
                })
              }}
            />
          </div>
        )}

        {selectedProvider.length > 0 && (
          <div className=" flex  w-[80%]">
            <CircularButton
              deletion={true}
              icon={<XMarkIcon className=" h-6 w-6 text-white" />}
              onClick={() => {
                setSelectedProvider([])
              }}
            />
          </div>
        )}
        {selectedProvider.length <= 0 ? (
          <CustomCheckBoxFeild
            title="Select Provider"
            checkBoxValues={selectedProvider}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['Khan', 'Keesee', 'Bailey', 'Emily', 'Leonard']}
            setCheckBoxValues={setSelectedProvider}
          />
        ) : (
          <div className="flex w-full flex-col items-center justify-center">
            <p className=" px-10 text-2xl font-bold text-[#4A85F9] underline">
              {selectedProvider.length > 0 ? selectedProvider : 'none'}
            </p>

            <p>Chandler</p>
            <div className=" flex w-[80%] flex-col items-center justify-center">
              <div className=" flex w-full flex-col items-center md:flex-row">
                <div className=" w-1/3  p-2">
                  <TextInput
                    onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                      setNumberOfPatients(text.target.value)
                    }}
                    placeHolder="Number of Patients"
                    type="number"
                    widthPercentage="w-full"
                  />
                </div>
                <div className="w-1/3 p-2">
                  <TextInput
                    onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                      setNumberOfNewPatients(text.target.value)
                    }}
                    placeHolder="Number of New Patients"
                    type="number"
                    widthPercentage="w-full"
                  />
                </div>
                <div className=" w-1/3 p-2">
                  <TextInput
                    onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                      setNumberOfTeleVisits(text.target.value)
                    }}
                    placeHolder="Number of Tele-Visits"
                    type="number"
                    widthPercentage="w-full"
                  />
                </div>
              </div>
              <p>Maricopa</p>
              <div className=" flex w-full items-center justify-center">
                <div className=" flex w-full flex-col items-center md:flex-row">
                  <div className=" w-1/3  p-2">
                    <TextInput
                      onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                        setHoursScheduled(text.target.value)
                      }}
                      placeHolder="Number of Patients"
                      type="number"
                      widthPercentage="w-full"
                    />
                  </div>
                  <div className="w-1/3  p-2">
                    <TextInput
                      onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                        setPatientReferredBy(text.target.value)
                      }}
                      placeHolder="Number of New Patients"
                      type="number"
                      widthPercentage="w-full"
                    />
                  </div>
                  <div className="w-1/3  p-2">
                    <TextInput
                      onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                        setNumberOfIMInjections(text.target.value)
                      }}
                      placeHolder="Number of Tele-Visits"
                      type="number"
                      widthPercentage="w-full"
                    />
                  </div>
                </div>
              </div>
              <p>Operations</p>
              <div className=" flex w-full items-center justify-center">
                <div className=" flex w-full flex-col items-center md:flex-row">
                  <div className="w-1/2   p-2">
                    <TextInput
                      onChange={(
                        text: React.ChangeEvent<HTMLInputElement>
                      ) => {}}
                      placeHolder="Hours Scheduled"
                      type="number"
                      widthPercentage="w-full"
                    />
                  </div>
                  <div className="w-1/2  p-2">
                    <TextInput
                      onChange={(
                        text: React.ChangeEvent<HTMLInputElement>
                      ) => {}}
                      placeHolder="Patient Referred By (New Patients Only)"
                      type="number"
                      widthPercentage="w-full"
                    />
                  </div>
                </div>
              </div>
              <p>Injections</p>
              <div className=" flex w-full items-center justify-center">
                <div className=" flex w-full flex-col items-center md:flex-row">
                  <div className="w-1/2   p-2">
                    <TextInput
                      onChange={(
                        text: React.ChangeEvent<HTMLInputElement>
                      ) => {}}
                      placeHolder="Number of IM Injections"
                      type="number"
                      widthPercentage="w-full"
                    />
                  </div>
                  <div className="w-1/2  p-2">
                    <TextInput
                      onChange={(
                        text: React.ChangeEvent<HTMLInputElement>
                      ) => {}}
                      placeHolder="Number of Trigger/Joint Injections"
                      type="number"
                      widthPercentage="w-full"
                    />
                  </div>
                </div>
              </div>
              <p>CCM Calls</p>
              <div className=" flex w-full items-center justify-center">
                <div className=" flex w-full flex-col items-center md:flex-row">
                  <div className=" w-1/2  p-2">
                    <TextInput
                      onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                        setNumberOfCCMsignedUpOperations(text.target.value)
                      }}
                      placeHolder="Number of New Sign Up"
                      type="number"
                      widthPercentage="w-full"
                    />
                  </div>
                  <div className="w-1/2  p-2">
                    <TextInput
                      onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                        setNumberOfCCMContactedOperations(text.target.value)
                      }}
                      placeHolder="Number of Patients Contacted"
                      type="number"
                      widthPercentage="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <RoundAddButton
              onClick={() => {
                setSubmittedProvider([
                  ...submittedProvider,

                  {
                    selectedProvider: selectedProvider,
                    numberOfPatients: numberOfPatients,
                    numberOfNewPatients: numberOfNewPatients,
                    numberOfTeleVisits: numberOfTeleVisits,
                    hoursScheduled: hoursScheduled,
                    patientReferredBy: patientReferredBy,
                    numberOfIMInjections: numberOfIMInjections,

                    patientReferredByOperations: patientReferredByOperations,
                    numberOfIMInjectionsOperations:
                      numberOfIMInjectionsOperations,
                    numberOfTriggerAndJointInjectionsOperations:
                      numberOfTriggerAndJointInjectionsOperations,
                    numberOfCCMsignedUpOperations:
                      numberOfCCMsignedUpOperations,
                    numberOfCCMContactedOperations:
                      numberOfCCMContactedOperations,
                  },
                ])
                setSelectedProvider([])
                setNumberOfPatients('')
                setNumberOfNewPatients('')
                setNumberOfTeleVisits('')
                setHoursScheduled('')
                setPatientReferredBy('')
                setNumberOfIMInjections('')
              }}
              PlusOrMinus="plus"
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default InternalMedicine
