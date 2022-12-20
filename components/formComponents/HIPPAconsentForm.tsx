import React, { useState, useEffect } from 'react'
import PhoneNumberInput from '../PhoneNumberInput'
import TextInput from '../TextInput'
import Signature from './Signature'

const HIPPAconsentForm: React.FC<{
  id?: string
  HippaConsentFormState: any
  required?: boolean
}> = ({ HippaConsentFormState, id, required }) => {
  const [name, setName] = useState('')
  const [relationShip, setRelationShip] = useState('')
  const [name2, setName2] = useState('')
  const [relationShip2, setRelationShip2] = useState('')
  const [name3, setName3] = useState('')
  const [relationShip3, setRelationShip3] = useState('')
  const [name4, setName4] = useState('')
  const [relationShip4, setRelationShip4] = useState('')
  const [hippaSignature, setHippaSignature] = useState('')
  const [signatureDate, setSignatureDate] = useState('')
  const [signatureCheckBoxConsent, setSignatureCheckBoxConsent] =
    useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneNumber2, setPhoneNumber2] = useState('')
  const [phoneNumber3, setPhoneNumber3] = useState('')
  const [phoneNumber4, setPhoneNumber4] = useState('')
  const [requiredCheckBoxConsent, setRequiredCheckBoxConsent] = useState(false)
  const [requiredSignature, setRequiredSignature] = useState(false)
  const [requiredDate, setRequiredDate] = useState(false)

  useEffect(() => {
    HippaConsentFormState({
      name: name,
      phoneNumber: phoneNumber,
      relationShip: relationShip,
      name2: name2,
      phoneNumber2: phoneNumber2,
      relationShip2: relationShip2,
      name3: name3,
      phoneNumber3: phoneNumber3,
      relationShip3: relationShip3,
      name4: name4,
      phoneNumber4: phoneNumber4,
      relationShip4: relationShip4,
      hippaSignature: hippaSignature,
      signatureDate: signatureDate,
      signatureCheckBoxConsent: signatureCheckBoxConsent,
    })
  }, [
    name,
    relationShip,
    name2,
    relationShip2,
    name3,
    relationShip3,
    name4,
    relationShip4,
    hippaSignature,
    signatureDate,
    signatureCheckBoxConsent,
  ])
  useEffect(() => {
    if (required) {
      if (
        !signatureCheckBoxConsent &&
        signatureDate == '' &&
        hippaSignature == ''
      ) {
        setRequiredCheckBoxConsent(true)
        setRequiredSignature(true)
        setRequiredDate(true)
      }
    }
  }, [required, signatureCheckBoxConsent, signatureDate, hippaSignature])

  return (
    <div className="flex w-full flex-col justify-center ">
      <p className=" text-center">
        The Health Insurance Portability and Accountability Act (HIPAA) provide
        safeguards to protect your privacy. Patient information will be kept
        confidential except as is necessary to provide services or to ensure
        that all administrative matters related to your care are handled
        appropriately. This specifically includes the sharing of information
        with other healthcare providers, laboratories, and/ or health insurance
        payers as is necessary and appropriate for your care. The patient hereby
        waives his/her confidentiality right should collection action become
        necessary. You have the right to request restrictions in the use of your
        protected health information and to request changes in certain policies
        used within this office. However, we are not obliged to alter internal
        policies to conform to your request.
      </p>
      <p className=" mt-10 text-lg">
        My protected health information may be released to the following people:
      </p>
      <p className="mb-5 mt-10">Person One</p>
      <TextInput
        placeHolder="Name"
        value={name}
        widthPercentage="w-full"
        onChange={(text: any) => {
          setName(text.target.value)
        }}
      />
      <PhoneNumberInput
        placeHolder="Phone Number"
        value={phoneNumber}
        widthPercentage="w-full"
        onChange={(text: any) => {
          setPhoneNumber(text.target.value)
        }}
      />
      <TextInput
        placeHolder="Relationship"
        value={relationShip}
        widthPercentage="w-full"
        onChange={(text: any) => {
          setRelationShip(text.target.value)
        }}
      />
      <p className="mb-5 mt-10">Person Two</p>
      <TextInput
        placeHolder="Name"
        value={name2}
        widthPercentage="w-full"
        onChange={(text: any) => {
          setName2(text.target.value)
        }}
      />
      <PhoneNumberInput
        placeHolder="Phone Number"
        value={phoneNumber2}
        widthPercentage="w-full"
        onChange={(text: any) => {
          setPhoneNumber2(text.target.value)
        }}
      />
      <TextInput
        placeHolder="Relationship"
        value={relationShip2}
        widthPercentage="w-full"
        onChange={(text: any) => {
          setRelationShip2(text.target.value)
        }}
      />
      <p className="mb-5 mt-10">Person Three</p>
      <TextInput
        placeHolder="Name"
        value={name3}
        widthPercentage="w-full"
        onChange={(text: any) => {
          setName3(text.target.value)
        }}
      />
      <PhoneNumberInput
        placeHolder="Phone Number"
        value={phoneNumber3}
        widthPercentage="w-full"
        onChange={(text: any) => {
          setPhoneNumber3(text.target.value)
        }}
      />
      <TextInput
        placeHolder="Relationship"
        value={relationShip3}
        widthPercentage="w-full"
        onChange={(text: any) => {
          setRelationShip3(text.target.value)
        }}
      />
      <p className="mb-5 mt-10">Person Four</p>
      <TextInput
        placeHolder="Name"
        value={name4}
        widthPercentage="w-full"
        onChange={(text: any) => {
          setName4(text.target.value)
        }}
      />
      <PhoneNumberInput
        placeHolder="Phone Number"
        value={phoneNumber4}
        widthPercentage="w-full"
        onChange={(text: any) => {
          setPhoneNumber4(text.target.value)
        }}
      />
      <TextInput
        placeHolder="Relationship"
        value={relationShip4}
        widthPercentage="w-full"
        onChange={(text: any) => {
          setRelationShip4(text.target.value)
        }}
      />
      <h3 className=" text-center text-xl">
        Acknowledgement of Receipt of Notice of Privacy Practices
      </h3>
      <h5 className=" text-center text-2xl">
        HIPAA - Notice of Privacy Practices:
      </h5>

      <Signature
        id={id}
        requiredCheckBox={requiredCheckBoxConsent}
        requiredSignature={requiredSignature}
        requiredDate={requiredDate}
        signatureState={setHippaSignature}
        dateState={setSignatureDate}
        agreeThatTheirSignatureIsValidState={setSignatureCheckBoxConsent}
        agreeThatTheirSignatureIsValid={signatureCheckBoxConsent}
        signatureValue={hippaSignature}
        date={signatureDate}
        WhatTheyAreSigningFor="I have been provided with a copy of American Medical Associates Privacy Practices. I understand that the Notice may be changed at any time. I may request a new copy of American Medical Associates Privacy Practices in person or by writing to the Practice Manager, American Medical Associates, 1915 E Chandler Blvd. Ste. 1, Chandler, AZ 85225 I understand that if any changes need to be made to my authorization as to whom my protected health information may be released to, must be done in person and a new form submitted."
      />
    </div>
  )
}

export default HIPPAconsentForm
