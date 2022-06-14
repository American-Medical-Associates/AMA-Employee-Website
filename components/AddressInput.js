import React from 'react'
import TextInput from './TextInput'

function AddressInput({
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
}) {
  return (
    <div className=" my-12">
      <TextInput
        type="Address"
        widthPercentage="w-[80%]"
        placeHolder="Address"
        onChange={(text) => {
          addressState(text.target.value)
        }}
        value={addressValue}
      />
      <TextInput
        type="Address 2"
        widthPercentage="w-[50%]"
        placeHolder="Address 2"
        onChange={(text) => {
          addressState2(text.target.value)
        }}
        value={addressValue2}
      />
      <div className=" flex grid-cols-2">
        <TextInput
          widthPercentage="w-[50%]"
          placeHolder="City"
          onChange={(text) => {
            cityState(text.target.value)
          }}
          value={cityValue}
        />

        <TextInput
          widthPercentage="w-[60%]"
          placeHolder="State"
          onChange={(text) => {
            USStateState(text.target.value)
          }}
          value={USStateValue}
        />
      </div>
      <TextInput
        widthPercentage="w-[60%]"
        placeHolder="Zip Code"
        onChange={(text) => {
          zipCodeState(text.target.value)
        }}
        value={zipCodeValue}
      />
    </div>
  )
}
export default AddressInput
