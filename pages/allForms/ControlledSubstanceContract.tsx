import React, { useState } from 'react'
import TextInput from '../../components/TextInput'
import DateInput from '../../components/DateInput'
import CustomCheckBoxField from '../../components/formComponents/CustomCheckBoxFeild'
import Signature from '../../components/formComponents/Signature'
import MainButton from '../../components/MainButton'
import Header from '../../components/Header'
import { savePatentForms } from '../../firebase'
import { useRouter } from 'next/router'
import { CircularButton } from '../../components/CircularButtonIcon'
import { ArrowDownLeftIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { selectPatientDetails } from '../../redux/slices/companySlice'
import Head from 'next/head'

const ControlledSubstanceContract = () => {
  const [name, setName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [controlledSubstances, setControlledSubstances] = useState(
    Array(6).fill('')
  )
  const [pharmacyName, setPharmacyName] = useState('')
  const [crossStreets, setCrossStreets] = useState('')
  const [phone, setPhone] = useState('')
  const [checkboxes, setCheckboxes] = useState([])
  const [patientSignature, setPatientSignature] = useState('')
  const [patientSignatureDate, setPatientSignatureDate] = useState('')
  const [agreeThatTheirSignatureIsValid, setAgreeThatTheirSignatureIsValid] =
    useState(false)

  const [requirePatientSignature, setRequirePatientSignature] = useState(false)
  const [requirePatientSignatureDate, setRequirePatientSignatureDate] =
    useState(false)
  const [requireSignatureCheckBox, setRequireSignatureCheckBox] =
    useState(false)
  useState(false)
  const [requireCheckBoxes, setRequireCheckBoxes] = useState(false)
  const [requireName, setRequireName] = useState(false)
  const [requireDOB, setRequireDOB] = useState(false)
  const [requireControlledSubstance, setRequireControlledSubstance] =
    useState(false)
  const [requirePharmacyName, setRequirePharmacyName] = useState(false)
  const [requireCrossStreets, setRequireCrossStreets] = useState(false)
  const [requirePhone, setRequirePhone] = useState(false)

  const router = useRouter()
  const patientDetails = useSelector(selectPatientDetails)

  const isFormValid = () => {
    if (
      name &&
      dateOfBirth &&
      controlledSubstances.length > 0 &&
      pharmacyName &&
      crossStreets &&
      phone &&
      checkboxes.length == checkBoxesList.length &&
      patientSignature &&
      patientSignatureDate &&
      agreeThatTheirSignatureIsValid
    ) {
      return true
    } else {
      setRequireCheckBoxes(true)
      setRequirePatientSignature(true)
      setRequirePatientSignatureDate(true)
      setRequireSignatureCheckBox(true)
      setRequireName(true)
      setRequireDOB(true)
      setRequireControlledSubstance(true)
      setRequirePharmacyName(true)
      setRequireCrossStreets(true)
      setRequirePhone(true)

      return false
    }
  }

  const checkBoxesList = [
    'Received, read, signed, and understand the content in the Informed Consent for Controlled Substance use',
    'Acknowledged receiving the following Controlled Substance(s)',
    'Agree to fill prescriptions at only 1 pharmacy and immediately advise AMA of any changes',
    'Agree to be seen ONLY at American Medical Associates for refills and follow-up on the controlled meds',
    'Understand that the goal of treatment is to taper and/or discontinue the medication',
    'Agree to obtain prescription for controlled substances exclusively through American Medical Associates',
    'Agree to take medications exactly at the dose and frequency prescribed',
    'Understand that lost or stolen medications WILL NOT be replaced',
    'Agree to random urine drug screens at Providers discretion',
  ]

  return (
    <div>
      <Head>
        <title>AMA</title>
        <link rel="icon" href="/American Medical Associates.png" />
      </Head>
      {/* <Header selectCompany={'AMA'} routePatientsHome={false} /> */}
      <main className="m-5">
        <CircularButton
          icon={
            <ArrowLeftIcon className="  h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
          }
          onClick={() => router.back()}
        />
        <h1 className="text-center text-3xl">Controlled Substance Contract</h1>
        <div className=" flex flex-col items-center justify-center">
          <TextInput
            id="name"
            placeHolder="Name"
            widthPercentage="w-[60%]"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
              setName(text.target.value)
            }
            value={name}
            required={requireName}
          />
          <DateInput
            id="dateOfBirth"
            placeHolder="Date of Birth"
            widthPercentage="w-[60%]"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
              setDateOfBirth(text.target.value)
            }
            value={dateOfBirth}
            required={requireDOB}
          />
          {/* // Add text and checkboxes here */}
          {controlledSubstances.map((substance, index) => {
            if (index === 0) {
              return (
                <TextInput
                  key={index}
                  id={`controlledSubstance${index + 1}`}
                  placeHolder={`Controlled Substance ${index + 1}`}
                  widthPercentage="w-[40%]"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    const newControlledSubstances = [...controlledSubstances]
                    newControlledSubstances[index] = text.target.value
                    setControlledSubstances(newControlledSubstances)
                  }}
                  value={substance}
                  required={requireControlledSubstance}
                />
              )
            } else {
              return (
                <TextInput
                  key={index}
                  id={`controlledSubstance${index + 1}`}
                  placeHolder={`Controlled Substance ${index + 1}`}
                  widthPercentage="w-[40%]"
                  onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
                    const newControlledSubstances = [...controlledSubstances]
                    newControlledSubstances[index] = text.target.value
                    setControlledSubstances(newControlledSubstances)
                  }}
                  value={substance}
                />
              )
            }
          })}
          <TextInput
            id="pharmacyName"
            placeHolder="Pharmacy Name"
            widthPercentage="w-[60%]"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
              setPharmacyName(text.target.value)
            }
            value={pharmacyName}
            required={requirePharmacyName}
          />
          <TextInput
            id="crossStreets"
            placeHolder="Cross Streets"
            widthPercentage="w-[60%]"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
              setCrossStreets(text.target.value)
            }
            value={crossStreets}
            required={requireCrossStreets}
          />
          <TextInput
            id="phone"
            placeHolder="Phone"
            widthPercentage="w-[60%]"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
              setPhone(text.target.value)
            }
            value={phone}
            required={requirePhone}
          />

          <CustomCheckBoxField
            checkBoxValues={checkboxes}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={checkBoxesList}
            setCheckBoxValues={setCheckboxes}
            required={requireCheckBoxes}
          />

          <Signature
            requiredSignature={requirePatientSignature}
            signatureValue={patientSignature}
            signatureState={setPatientSignature}
            requiredDate={requirePatientSignatureDate}
            date={patientSignatureDate}
            dateState={setPatientSignatureDate}
            requiredCheckBox={requireSignatureCheckBox}
            agreeThatTheirSignatureIsValid={agreeThatTheirSignatureIsValid}
            agreeThatTheirSignatureIsValidState={
              setAgreeThatTheirSignatureIsValid
            }
          />

          <MainButton
            buttonWidth="w-1/2"
            buttonText="Submit"
            onClick={() => {
              if (isFormValid()) {
                savePatentForms({
                  formName: 'Controlled Substance Contract',
                  email: patientDetails?.email,
                  name,
                  dateOfBirth,
                  controlledSubstances,
                  pharmacyName,
                  crossStreets,
                  phone,
                  checkboxes,
                  patientSignature,
                  patientSignatureDate,
                  agreeThatTheirSignatureIsValid,
                })
                  .then(() => {
                    alert('Form Submitted')
                  })
                  .then(() => {
                    router.push('/PatientDetailsPage')
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

export default ControlledSubstanceContract
