import React, { useState, useEffect } from 'react'
import DateInput from '../DateInput'
import PhoneNumberInput from '../PhoneNumberInput'
import TextInput from '../TextInput'
import CustomYesOrNo from './CustomYesOrNo'
import SectionWithTitle from './SectionWithTitle'
import Signature from './Signature'

const AdvancedDirectivesLivingWill: React.FC<{
  id?: string
  AdvancedDirectivesLivingWillState: any
  required?: boolean
}> = ({ AdvancedDirectivesLivingWillState, id, required }) => {
  const [healthCarePowerOfAttorney, setHealthCarePowerOfAttorney] = useState('')
  const [healthCarePowerOfAttorneyName, setHealthCarePowerOfAttorneyName] =
    useState('')
  const [doYouHaveALivingWill, setDoYouHaveALivingWill] = useState('')
  const [preHospitalMedicalDirectives, setPreHospitalMedicalDirectives] =
    useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [date, setDate] = useState('')
  const [signature, setSignature] = useState('')
  const [agreeThatTheirSignatureIsValid, setAgreeThatTheirSignatureIsValid] =
    useState(false)
  const [requiredCheckBoxSignature, setRequiredCheckBoxSignature] =
    useState(false)
  const [requiredSignature, setRequiredSignature] = useState(false)
  const [requiredDate, setRequiredDate] = useState(false)
  useEffect(() => {
    if (required) {
      if (signature === '' || date === '' || !agreeThatTheirSignatureIsValid) {
        setRequiredCheckBoxSignature(true)
        setRequiredSignature(true)
        setRequiredDate(true)
      }
    }
  }, [required, signature, date, agreeThatTheirSignatureIsValid])

  useEffect(() => {
    AdvancedDirectivesLivingWillState({
      healthCarePowerOfAttorney: healthCarePowerOfAttorney,
      healthCarePowerOfAttorneyName: healthCarePowerOfAttorneyName,
      doYouHaveALivingWill: doYouHaveALivingWill,
      preHospitalMedicalDirectives: preHospitalMedicalDirectives,
      phoneNumber: phoneNumber,
      date: date,
      signature: signature,
      agreeThatTheirSignatureIsValid: agreeThatTheirSignatureIsValid,
      requiredCheckBoxSignature: requiredCheckBoxSignature,
      requiredSignature: requiredSignature,
      requiredDate: requiredDate,
    })
  }, [
    healthCarePowerOfAttorneyName,
    healthCarePowerOfAttorney,
    preHospitalMedicalDirectives,
    doYouHaveALivingWill,
    phoneNumber,
    signature,
    date,
    agreeThatTheirSignatureIsValid,
    requiredCheckBoxSignature,
    requiredSignature,
    requiredDate,
  ])

  return (
    <div>
      <SectionWithTitle
        title="Advanced Directives (Living Will)"
        subTitle="If you Have advanced directive (living will) please fill out the following."
        children={[
          <CustomYesOrNo
            text="Do you have a Health Care Power of Attorney?"
            CheckState={setHealthCarePowerOfAttorney}
          />,
          <TextInput
            placeHolder="Name of Health Care Power of Attorney"
            value={healthCarePowerOfAttorneyName}
            widthPercentage="w-full"
            onChange={(text: any) => {
              setHealthCarePowerOfAttorneyName(text.target.value)
            }}
          />,
          <CustomYesOrNo
            text="living will"
            CheckState={setDoYouHaveALivingWill}
          />,
          <CustomYesOrNo
            text="Pre-Hospital Medical Directives"
            CheckState={setPreHospitalMedicalDirectives}
          />,
          <PhoneNumberInput
            placeHolder="Phone Number"
            value={phoneNumber}
            widthPercentage="w-full"
            onChange={(text: any) => {
              setPhoneNumber(text.target.value)
            }}
          />,

          <Signature
            requiredCheckBox={requiredCheckBoxSignature}
            requiredSignature={requiredSignature}
            requiredDate={requiredDate}
            WhatTheyAreSigningFor="Signature"
            signatureValue={signature}
            signatureState={setSignature}
            agreeThatTheirSignatureIsValid={agreeThatTheirSignatureIsValid}
            agreeThatTheirSignatureIsValidState={
              setAgreeThatTheirSignatureIsValid
            }
            date={date}
            dateState={setDate}
            id={id}
          />,
        ]}
      />
    </div>
  )
}
export default AdvancedDirectivesLivingWill
