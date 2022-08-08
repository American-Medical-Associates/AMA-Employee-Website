import { title } from 'process'
import React from 'react'
import PhoneNumberInput from './PhoneNumberInput'
import TextInput from './TextInput'

function References({
  ReferenceNameValue,
  ReferenceNameState,
  ReferencePositionValue,
  ReferencePositionState,
  ReferenceWorkRelationshipState,
  ReferenceWorkRelationshipValue,
  ReferenceCompanyValue,
  ReferenceCompanyState,
  ReferencePhoneNumberValue,
  ReferencePhoneNumberState,
  ReferenceNameValue2,
  ReferenceNameState2,
  ReferencePositionValue2,
  ReferencePositionState2,
  ReferenceWorkRelationshipState2,
  ReferenceWorkRelationshipValue2,
  ReferenceCompanyValue2,
  ReferenceCompanyState2,
  ReferencePhoneNumberValue2,
  ReferencePhoneNumberState2,
  ReferenceNameValue3,
  ReferenceNameState3,
  ReferencePositionValue3,
  ReferencePositionState3,
  ReferenceWorkRelationshipState3,
  ReferenceWorkRelationshipValue3,
  ReferenceCompanyValue3,
  ReferenceCompanyState3,
  ReferencePhoneNumberValue3,
  ReferencePhoneNumberState3,
  ReferenceNameValue4,
  ReferenceNameState4,
  ReferencePositionValue4,
  ReferencePositionState4,
  ReferenceWorkRelationshipState4,
  ReferenceWorkRelationshipValue4,
  ReferenceCompanyValue4,
  ReferenceCompanyState4,
  ReferencePhoneNumberValue4,
  ReferencePhoneNumberState4,
}) {
  return (
    <div className=" flex w-full grid-rows-4 flex-col rounded-[20px] outline outline-2 outline-[#b5b5b5]">
      <ReferenceItem
        title="Professional Reference"
        ReferenceNameValue={ReferenceNameValue}
        ReferenceNameState={ReferenceNameState}
        ReferencePositionValue={ReferencePositionValue}
        ReferencePositionState={ReferencePositionState}
        ReferenceWorkRelationshipState={ReferenceWorkRelationshipState}
        ReferenceWorkRelationshipValue={ReferenceWorkRelationshipValue}
        ReferenceCompanyValue={ReferenceCompanyValue}
        ReferenceCompanyState={ReferenceCompanyState}
        ReferencePhoneNumberValue={ReferencePhoneNumberValue}
        ReferencePhoneNumberState={ReferencePhoneNumberState}
      />
      <ReferenceItem
        title="Professional Reference"
        ReferenceNameValue={ReferenceNameValue2}
        ReferenceNameState={ReferenceNameState2}
        ReferencePositionValue={ReferencePositionValue2}
        ReferencePositionState={ReferencePositionState2}
        ReferenceWorkRelationshipState={ReferenceWorkRelationshipState2}
        ReferenceWorkRelationshipValue={ReferenceWorkRelationshipValue2}
        ReferenceCompanyValue={ReferenceCompanyValue2}
        ReferenceCompanyState={ReferenceCompanyState2}
        ReferencePhoneNumberValue={ReferencePhoneNumberValue2}
        ReferencePhoneNumberState={ReferencePhoneNumberState2}
      />
      <ReferenceItem
        title="Personal Reference"
        ReferenceNameValue={ReferenceNameValue3}
        ReferenceNameState={ReferenceNameState3}
        ReferencePositionValue={ReferencePositionValue3}
        ReferencePositionState={ReferencePositionState3}
        ReferenceWorkRelationshipState={ReferenceWorkRelationshipState3}
        ReferenceWorkRelationshipValue={ReferenceWorkRelationshipValue3}
        ReferenceCompanyValue={ReferenceCompanyValue3}
        ReferenceCompanyState={ReferenceCompanyState3}
        ReferencePhoneNumberValue={ReferencePhoneNumberValue3}
        ReferencePhoneNumberState={ReferencePhoneNumberState3}
      />
      <ReferenceItem
        title="Personal Reference"
        ReferenceNameValue={ReferenceNameValue4}
        ReferenceNameState={ReferenceNameState4}
        ReferencePositionValue={ReferencePositionValue4}
        ReferencePositionState={ReferencePositionState4}
        ReferenceWorkRelationshipState={ReferenceWorkRelationshipState4}
        ReferenceWorkRelationshipValue={ReferenceWorkRelationshipValue4}
        ReferenceCompanyValue={ReferenceCompanyValue4}
        ReferenceCompanyState={ReferenceCompanyState4}
        ReferencePhoneNumberValue={ReferencePhoneNumberValue4}
        ReferencePhoneNumberState={ReferencePhoneNumberState4}
      />
    </div>
  )
}
function ReferenceItem({
  title,
  ReferenceNameValue,
  ReferenceNameState,
  ReferencePositionValue,
  ReferencePositionState,
  ReferenceWorkRelationshipState,
  ReferenceWorkRelationshipValue,
  ReferenceCompanyValue,
  ReferenceCompanyState,
  ReferencePhoneNumberValue,
  ReferencePhoneNumberState,
}) {
  return (
    <div className=" flex grid-cols-6 flex-col  items-center justify-center px-10 text-center md:flex-row">
      <h4 className=" text-md flex font-bold"> {title}</h4>
      <div className=" mx-3 w-full">
        <TextInput
          value={ReferenceNameValue}
          widthPercentage="w-full"
          placeHolder="Name"
          onChange={(text) => {
            ReferenceNameState(text.target.value)
          }}
        />
      </div>

      <div className=" mx-3 w-full">
        <TextInput
          value={ReferencePositionValue}
          widthPercentage="w-full"
          placeHolder="Position"
          onChange={(text) => {
            ReferencePositionState(text.target.value)
          }}
        />
      </div>
      <div className=" mx-3 w-full">
        <TextInput
          widthPercentage="w-full"
          placeHolder="Company"
          onChange={(text) => {
            ReferenceCompanyState(text.target.value)
          }}
          value={ReferenceCompanyValue}
        />
      </div>
      <div className=" mx-3 w-full">
        <TextInput
          value={ReferenceWorkRelationshipValue}
          widthPercentage="w-full"
          placeHolder="Work Relationship"
          onChange={(text) => {
            ReferenceWorkRelationshipState(text.target.value)
          }}
        />
      </div>
      <div className=" mx-3 w-full">
        <PhoneNumberInput
          value={ReferencePhoneNumberValue}
          widthPercentage="w-full"
          valueState={ReferencePhoneNumberState}
          placeHolder="Phone Number"
          onChange={(text) => {
            ReferencePhoneNumberState(text.target.value)
          }}
        />
      </div>
    </div>
  )
}
export default References
