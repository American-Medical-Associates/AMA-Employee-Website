import React from 'react'
import TextInput from '../TextInput'

const FullNameField: React.FC<{
  firstName: string
  setFirstName: Function
  lastName: string
  setLastName: Function
}> = ({ firstName, setFirstName, lastName, setLastName }) => {
  return (
    <div className=" flex w-full items-center justify-center">
      <TextInput
        placeHolder="First Name"
        value={firstName}
        widthPercentage="w-1/2"
        onChange={(text: any) => {
          setFirstName(text.target.value)
        }}
      />

      <TextInput
        placeHolder="Last Name"
        widthPercentage="w-1/2"
        value={lastName}
        onChange={(text: any) => {
          setLastName(text.target.value)
        }}
      />
    </div>
  )
}
export default FullNameField
