import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
//import FullPersonalInfo from '../components/formComponents/fullPersonalInfo'
import Header from '../components/Header'

const NewPatientPacket: NextPage<{}> = ({}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [addressValue, setAddressValue] = useState('')
  const [addressValue2, setAddressValue2] = useState('')
  const [cityValue, setCityValue] = useState('')
  const [USStateValue, setUSStateValue] = useState('')
  const [zipCodeValue, setZipCodeValue] = useState('')
  const [BirthDateValue, setBirthDateValue] = useState('')
  const [phoneNumberValue, setPhoneNumberValue] = useState('')
  const [emailValue, setEmailValue] = useState('')

  return (
    <div>
      <Header />
      <h1>New Patient Packet</h1>
      {/* <FullPersonalInfo
        lastName={lastName}
        setFirstName={setFirstName}
        firstName={firstName}
        setLastName={setLastName}
        addressValue={addressValue}
        addressValue2={addressValue2}
        cityValue={cityValue}
        USStateValue={USStateValue}
        zipCodeValue={zipCodeValue}
        addressState={setAddressValue}
        addressState2={setAddressValue2}
        cityState={setCityValue}
        USStateState={setUSStateValue}
        zipCodeState={setZipCodeValue}
        BirthDateState={setBirthDateValue}
        BirthDateValue={BirthDateValue}
        phoneNumberValue={phoneNumberValue}
        phoneNumberState={setPhoneNumberValue}
        emailState={setEmailValue}
        emailValue={emailValue}
      /> */}
    </div>
  )
}
export default NewPatientPacket
