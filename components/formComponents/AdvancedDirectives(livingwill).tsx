import React, { useState, useEffect } from 'react'
import DateInput from '../DateInput'
import PhoneNumberInput from '../PhoneNumberInput'
import TextInput from '../TextInput'
import CustomYesOrNo from './CustomYesOrNo'
import SectionWithTitle from './SectionWithTitle'
import Signature from './Signature'

const AdvancedDirectivesLivingWill: React.FC<{
  AdvancedDirectivesLivingWillState: any
}> = ({ AdvancedDirectivesLivingWillState }) => {
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
            WhatTheyAreSigningFor="Signature"
            signatureValue={signature}
            signatureState={setSignature}
            agreeThatTheirSignatureIsValid={agreeThatTheirSignatureIsValid}
            agreeThatTheirSignatureIsValidState={
              setAgreeThatTheirSignatureIsValid
            }
            date={date}
            dateState={setDate}
          />,
        ]}
      />
    </div>
  )
}
export default AdvancedDirectivesLivingWill
