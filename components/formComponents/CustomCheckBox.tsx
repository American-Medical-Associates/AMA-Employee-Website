import React from 'react'
import CheckBox from '../CheckBox'
import { useEffect } from 'react'

const CustomCheckBox: React.FC<{
  isChecked: boolean
  checkedState?: Function
  text: string
  doYouWantToSetCheckToBoxValue?: boolean
  id?: string
  required?: boolean
  missing?: boolean
}> = ({
  isChecked,
  checkedState,
  text,
  doYouWantToSetCheckToBoxValue,
  id,
  required,
  missing,
}) => {
  if (required) {
    if (!isChecked) {
      missing = true
    } else {
      missing = false
    }
  }
  return (
    <div
      className={` ${missing ? 'bg-[#ff1818]' : undefined} ${
        missing ? 'rounded-[25px]' : undefined
      } ${missing ? 'p-5' : undefined} my-[1px] flex grid-cols-2 flex-row`}
    >
      <div id={id}>
        <CheckBox isChecked={isChecked} checkedState={checkedState} />
      </div>
      <div className="  flex  flex-row items-center justify-start  text-left ">
        <p className=" text-left"> {text}</p>
      </div>
    </div>
  )
}
export default CustomCheckBox
