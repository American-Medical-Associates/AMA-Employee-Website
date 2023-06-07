import React, { useState } from 'react'
import TextInput from '../../components/userInput/TextInput'
import DateInput from '../../components/userInput/DateInput'
import MainButton from '../../components/Buttons/MainButton'
import Signature from '../../components/formComponents/Signature'
import CustomCheckBox from '../../components/formComponents/CustomCheckBox'
import Header from '../../components/navigation/Header'
import Head from 'next/head'
import CustomCheckBoxField from '../../components/formComponents/CustomCheckBoxField'
import { savePatentForms } from '../../firebase'
import { CircularButton } from '../../components/Buttons/CircularButtonIcon'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { selectPatientDetails } from '../../redux/slices/companySlice'
import { useSelector } from 'react-redux'

const PhentermineContract = () => {
  const patientDetails = useSelector(selectPatientDetails)

  const [name, setName] = useState('')
  const [dob, setDob] = useState('')

  const [checkBoxesToAgreeTo, setCheckBoxesToAgreeTo] = useState<Array<string>>(
    []
  )
  const [patientSignature, setPatientSignature] = useState('')
  const [patientSignatureDate, setPatientSignatureDate] = useState('')
  const [patientSignatureIsValid, setPatientSignatureIsValid] = useState(false)
  const [requirePatientSignature, setRequirePatientSignature] = useState(false)
  const [requirePatientSignatureDate, setRequirePatientSignatureDate] =
    useState(false)
  const [requireSignatureCheckBox, setRequireSignatureCheckBox] =
    useState(false)
  useState(false)
  const [requireCheckBoxes, setRequireCheckBoxes] = useState(false)
  const [requireName, setRequireName] = useState(false)
  const [requireDob, setRequireDob] = useState(false)

  const router = useRouter()

  const isFormValid = () => {
    if (
      name &&
      dob &&
      checkBoxesToAgreeTo.length == agreements.length &&
      patientSignature &&
      patientSignatureDate
    ) {
      return true
    } else {
      setRequireCheckBoxes(true)
      setRequirePatientSignature(true)
      setRequirePatientSignatureDate(true)
      setRequireSignatureCheckBox(true)
      setRequireName(true)
      setRequireDob(true)

      return false
    }
  }

  const agreements = [
    'I agree to a 1-week follow-up appointment in the office for a blood pressure check and evaluation followed by monthly appointment for re-eval and script.',
    'I agree to full disclosure of all my daily medications & medical history that may pertain to Phentermine use.',
    'I do NOT have Hypertension, Heart Disease, Atherosclerosis, Valvular Heart Disease, Glaucoma, Seizures, Anxiety Disorder or Overactive Thyroid.',
    'I do NOT have a history of alcohol, drug or substance dependence or abuse.',
    'I am NOT pregnant or breast feeding.',
    'I understand Phentermine is intended for short-term use only (1-3 months or as determined between my health care provider and myself)',
    'I understand Phentermine may be associated with physical and psychological dependence.',
    'I will NOT take any other diet medication (over the counter or prescribed) while on Phentermine.',
    'I agree to return to the office for evaluation of any side effects or problems associated with Phentermine use.',
    'I will not drive or operate machinery till I know how Phentermine will affect me.',
    'I understand that lost/stolen prescriptions will not be refilled early, nor will Phentermine be prior authorized if not covered by my insurance plan.',
    'I will not stop Phentermine suddenly without talking to my health care provider.',
    'I have received and reviewed PHENTERMINE FACTS sheet.',
  ]

  return (
    <div>
      {/* <Header routePatientsHome={false} selectCompany={'AMA'} /> */}

      <main className="m-5">
        <CircularButton
          icon={
            <ArrowLeftIcon className="  h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
          }
          onClick={() => router.back()}
        />
        <h1 className="text-center text-3xl">Phentermine Contract</h1>
        <div className=" flex flex-col items-center justify-center">
          <TextInput
            id="name"
            placeHolder="Name"
            widthPercentage="w-[60%]"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
              setName(text.target.value)
            }
            value={name}
          />
          <DateInput
            id="dob"
            placeHolder="Date of Birth"
            widthPercentage="w-[60%]"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
              setDob(text.target.value)
            }
            value={dob}
          />

          <div>
            <CustomCheckBoxField
              required={requireCheckBoxes}
              checkBoxValues={checkBoxesToAgreeTo}
              allowMultipleCheckBoxes={true}
              checkBoxTitles={agreements}
              setCheckBoxValues={setCheckBoxesToAgreeTo}
            />
          </div>

          <Signature
            requiredCheckBox={requireSignatureCheckBox}
            requiredSignature={requirePatientSignature}
            requiredDate={requirePatientSignatureDate}
            signatureValue={patientSignature}
            signatureState={setPatientSignature}
            agreeThatTheirSignatureIsValid={patientSignatureIsValid}
            agreeThatTheirSignatureIsValidState={setPatientSignatureIsValid}
            date={patientSignatureDate}
            dateState={setPatientSignatureDate}
          />

          <MainButton
            buttonWidth="w-1/2"
            buttonText="Submit"
            onClick={() => {
              if (isFormValid()) {
                savePatentForms({
                  formName: 'Phentermine Contract',
                  email: patientDetails.email,
                  name,
                  dob,
                  checkBoxesToAgreeTo,
                  patientSignature,
                  patientSignatureDate,
                })
                  .then(() => {
                    alert('Form Submitted')
                  })
                  .then(() => {
                    router.back()
                  })
              } else {
                alert('Please fill out all the fields')
              }
            }}
          />
        </div>
      </main>
    </div>
  )
}

export default PhentermineContract
