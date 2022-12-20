import React from 'react'
import TextInput from '../TextInput'

const FullNameField: React.FC<{
  firstName: string
  setFirstName: Function
  lastName: string
  setLastName: Function
  id?: string
  required?: boolean
}> = ({ firstName, setFirstName, required, lastName, setLastName, id }) => {
  return (
    <div id={id} className=" flex w-full items-center justify-center">
      <TextInput
        placeHolder="First Name"
        value={firstName}
        widthPercentage="w-1/2"
        onChange={(text: any) => {
          setFirstName(text.target.value)
        }}
        required={required}
      />

      <TextInput
        placeHolder="Last Name"
        widthPercentage="w-1/2"
        value={lastName}
        onChange={(text: any) => {
          setLastName(text.target.value)
        }}
        required={required}
      />
    </div>
  )
}
export default FullNameField
