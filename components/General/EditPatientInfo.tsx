import React, { useState } from 'react'
import TextInput from '../userInput/TextInput'
import MainButton from '../Buttons/MainButton'
import DateInput from '../userInput/DateInput'
import { updatePatientNameAndDOB } from '../../firebase'

export const EditPatientInfo: React.FC<{}> = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')

  return (
    <div className=" flex flex-col items-center justify-center ">
      <div className=" flex w-[85%] flex-col items-center justify-center rounded-[25px] shadow-2xl">
        <p className=" p-5 text-center">
          If you would like to update your information or have not filled out
          the NPP and wish to do the weight loss Packet, please fill out the
          form below.
        </p>
        <TextInput
          value={firstName}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setFirstName(text.target.value)
          }}
          placeHolder="first name"
          widthPercentage="w-1/2"
        />
        <TextInput
          value={lastName}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setLastName(text.target.value)
          }}
          placeHolder="last name"
          widthPercentage="w-1/2"
        />

        <DateInput
          value={dob}
          onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
            setDob(text.target.value)
          }}
          placeHolder="DOB"
          widthPercentage="w-1/2"
        />

        <MainButton
          buttonText="Update"
          onClick={() => {
            // update patient info
            updatePatientNameAndDOB({
              firstName: firstName.toLocaleLowerCase().trim(),
              lastName: lastName.toLocaleLowerCase().trim(),
              dob: dob,
            }).then(() => {
              setFirstName('')
              setLastName('')
              setDob('')
            })
          }}
        />
      </div>
    </div>
  )
}
