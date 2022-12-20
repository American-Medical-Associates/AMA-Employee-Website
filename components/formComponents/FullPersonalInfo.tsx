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
  firstNameRequired?: boolean
  addressRequired?: boolean
  dateOfBirthRequired?: boolean
  phoneNumberRequired?: boolean
  emailRequired?: boolean
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
  firstNameRequired,
  addressRequired,
  dateOfBirthRequired,
  phoneNumberRequired,
  emailRequired,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <FullNameField
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        id="fullName"
        required={firstNameRequired}
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
        id="fullAddress"
        required={addressRequired}
      />
      <DateInput
        placeHolder="Date of Birth (MM/DD/YYYY)"
        widthPercentage="w-3/4"
        onChange={(text: any) => {
          BirthDateState(text.target.value)
        }}
        value={BirthDateValue}
        id="birthDate"
        required={dateOfBirthRequired}
      />
      <PhoneNumberInput
        placeHolder="Phone Number"
        widthPercentage="w-3/4"
        onChange={(text: any) => {
          phoneNumberState(text.target.value)
        }}
        value={phoneNumberValue}
        id="phoneNumber"
        required={phoneNumberRequired}
      />
      <TextInput
        placeHolder="Email"
        widthPercentage="w-3/4"
        onChange={(text: any) => {
          emailState(text.target.value)
        }}
        value={emailValue}
        id="email"
        required={emailRequired}
      />
    </div>
  )
}
export default FullPersonalInfo
