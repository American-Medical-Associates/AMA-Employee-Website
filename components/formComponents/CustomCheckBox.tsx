import React from 'react'
import CheckBox from '../CheckBox'
import { useEffect } from 'react'

const CustomCheckBox: React.FC<{
  isChecked: boolean
  checkedState?: Function
  text: string
  doYouWantToSetCheckToBoxValue?: boolean
}> = ({ isChecked, checkedState, text, doYouWantToSetCheckToBoxValue }) => {
  return (
    <div className=" my-[1px] flex grid-cols-2 flex-row">
      <div>
        <CheckBox isChecked={isChecked} checkedState={checkedState} />
      </div>
      <div className=" ml-3 flex min-w-full flex-row items-center justify-start  text-left ">
        <p className=" text-left"> {text}</p>
      </div>
    </div>
  )
}
export default CustomCheckBox
