import React from 'react'
import DateInput from '../userInput/DateInput'
import TextInput from '../userInput/TextInput'
import CustomCheckBox from './CustomCheckBox'

const Signature: React.FC<{
  WhatTheyAreSigningFor?: string
  signatureValue: string
  signatureState: Function
  agreeThatTheirSignatureIsValid: boolean
  agreeThatTheirSignatureIsValidState: Function
  date: string
  dateState: Function
  id?: string
  requiredCheckBox?: boolean
  requiredSignature?: boolean
  requiredDate?: boolean
  signatureOnClick?: Function
}> = ({
  WhatTheyAreSigningFor,
  signatureValue,
  signatureState,
  agreeThatTheirSignatureIsValidState,
  agreeThatTheirSignatureIsValid,
  date,
  dateState,
  id,
  requiredCheckBox,
  requiredSignature,
  requiredDate,
  signatureOnClick,
}) => {
  return (
    <div id={id} className="flex  flex-col items-center justify-center">
      <label className="my-5  text-center text-[red] md:text-2xl">
        {WhatTheyAreSigningFor}
      </label>
      <CustomCheckBox
        isChecked={agreeThatTheirSignatureIsValid}
        checkedState={agreeThatTheirSignatureIsValidState}
        text={`I agree that my typed signature represents my legal signature and is valid for all purposes.`}
        required={requiredCheckBox}
      />
      <TextInput
        placeHolder="Signature"
        onClick={signatureOnClick}
        value={signatureValue}
        onChange={(e: any) => signatureState(e.target.value)}
        widthPercentage="w-full"
        required={requiredSignature}
      />
      <DateInput
        placeHolder="Date Signed (MM/DD/YYYY)"
        widthPercentage="w-full"
        value={date}
        onChange={(e: any) => dateState(e.target.value)}
        required={requiredDate}
      />
    </div>
  )
}
export default Signature
