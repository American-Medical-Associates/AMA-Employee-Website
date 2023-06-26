import React from 'react'
import TextInput from './TextInput'

const AddressInput: React.FC<{
  addressValue: String
  addressValue2: String
  addressState: any
  addressState2: any
  cityState: any
  cityValue: String
  zipCodeState: any
  zipCodeValue: String
  USStateState: any
  USStateValue: String
  id?: string
  required?: boolean
}> = ({
  addressValue,
  addressValue2,
  addressState,
  addressState2,
  cityState,
  cityValue,
  zipCodeState,
  zipCodeValue,
  USStateState,
  USStateValue,
  id,
  required,
}) => {
  return (
    <div
      id={id}
      className=" my-12 flex w-full flex-col items-center justify-center "
    >
      <TextInput
        type="Address"
        widthPercentage="w-[50%]"
        placeHolder="Address"
        onChange={(text: any) => {
          addressState(text.target.value)
        }}
        value={addressValue}
        required={required}
      />
      <TextInput
        type="Address 2"
        widthPercentage="w-[40%]"
        placeHolder="Address 2"
        onChange={(text: any) => {
          addressState2(text.target.value)
        }}
        value={addressValue2}
      />
      <div className="flex w-full flex-col items-center justify-center md:flex-row">
        <TextInput
          widthPercentage="w-[50%]"
          placeHolder="City"
          onChange={(text: any) => {
            cityState(text.target.value)
          }}
          value={cityValue}
          required={required}
        />

        <TextInput
          widthPercentage="w-[50%]"
          placeHolder="State"
          onChange={(text: any) => {
            USStateState(text.target.value)
          }}
          value={USStateValue}
          required={required}
        />
      </div>
      <TextInput
        widthPercentage="w-[50%]"
        placeHolder="Zip Code"
        onChange={(text: any) => {
          zipCodeState(text.target.value)
        }}
        value={zipCodeValue}
        required={required}
      />
    </div>
  )
}
export default AddressInput
