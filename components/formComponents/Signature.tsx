import React from 'react'
import DateInput from '../DateInput'
import TextInput from '../TextInput'
import CustomCheckBox from './CustomCheckBox'

const Signature: React.FC<{
  WhatTheyAreSigningFor?: string
  signatureValue: string
  signatureState: Function
  agreeThatTheirSignatureIsValid: boolean
  agreeThatTheirSignatureIsValidState: Function
  date: string
  dateState: Function
}> = ({
  WhatTheyAreSigningFor,
  signatureValue,
  signatureState,
  agreeThatTheirSignatureIsValidState,
  agreeThatTheirSignatureIsValid,
  date,
  dateState,
}) => {
  return (
    <div className=" flex flex-col items-center justify-center">
      <p className="my-5 mx-20 text-center text-2xl text-[red]">
        {WhatTheyAreSigningFor}
      </p>
      <CustomCheckBox
        isChecked={agreeThatTheirSignatureIsValid}
        checkedState={agreeThatTheirSignatureIsValidState}
        text={`I agree that my typed signature represents my legal signature and is valid for all purposes.`}
      />
      <TextInput
        placeHolder="Signature"
        value={signatureValue}
        onChange={(e: any) => signatureState(e.target.value)}
        widthPercentage="w-full"
      />
      <DateInput
        placeHolder="Date Signed (MM/DD/YYYY)"
        widthPercentage="w-full"
        value={date}
        onChange={(e: any) => dateState(e.target.value)}
      />
    </div>
  )
}
export default Signature
