import React from 'react'
import AddressInput from '../AddressInput'
import DateInput from '../DateInput'
import PhoneNumberInput from '../PhoneNumberInput'
import TextInput from '../TextInput'
import FullNameField from '../formComponents/FullNameField'

const FullPersonalInfo: React.FC<{
  firstName: string
  setFirstName: Function
  lastName: string
  setLastName: Function
  addressValue: string
  addressValue2: string
  cityValue: string
  USStateValue: string
  zipCodeValue: string
  addressState: Function
  addressState2: Function
  cityState: Function
  USStateState: Function
  zipCodeState: Function
  BirthDateValue: string
  BirthDateState: Function
  phoneNumberValue: string
  phoneNumberState: Function
  emailState: Function
  emailValue: string
}> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  addressValue,
  addressValue2,
  cityValue,
  USStateValue,
  zipCodeValue,
  addressState,
  addressState2,
  cityState,
  USStateState,
  zipCodeState,
  BirthDateState,
  BirthDateValue,
  phoneNumberValue,
  phoneNumberState,
  emailState,
  emailValue,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <FullNameField
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />
      <AddressInput
        addressValue={addressValue}
        addressValue2={addressValue2}
        cityValue={cityValue}
        USStateValue={USStateValue}
        zipCodeValue={zipCodeValue}
        addressState={addressState}
        addressState2={addressState2}
        cityState={cityState}
        USStateState={USStateState}
        zipCodeState={zipCodeState}
      />
      <DateInput
        placeHolder="Date of Birth (MM/DD/YYYY)"
        widthPercentage="w-1/2"
        onChange={(text: any) => {
          BirthDateState(text.target.value)
        }}
        value={BirthDateValue}
      />
      <PhoneNumberInput
        placeHolder="Phone Number"
        widthPercentage="w-1/2"
        onChange={(text: any) => {
          phoneNumberState(text.target.value)
        }}
        value={phoneNumberValue}
      />
      <TextInput
        placeHolder="Email"
        widthPercentage="w-1/2"
        onChange={(text: any) => {
          emailState(text.target.value)
        }}
        value={emailValue}
        id="email"
      />
    </div>
  )
}
export default FullPersonalInfo
