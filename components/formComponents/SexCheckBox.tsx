import React from 'react'
import CustomCheckBox from './CustomCheckBox'
const SexCheckBox: React.FC<{
  isCheckedMale: boolean
  checkedStateMale: Function
  isCheckedFemale: boolean
  checkedStateFemale: Function
  isCheckedOther: boolean
  checkedStateOther: Function
  id?: string
}> = ({
  isCheckedMale,
  checkedStateMale,
  isCheckedFemale,
  checkedStateFemale,
  isCheckedOther,
  checkedStateOther,
  id,
}) => {
  if (isCheckedFemale) {
    checkedStateMale(false)
    checkedStateOther(false)
  }
  if (isCheckedOther) {
    checkedStateMale(false)
    checkedStateFemale(false)
  }
  if (isCheckedMale) {
    checkedStateFemale(false)
    checkedStateOther(false)
  }

  return (
    <div className=" flex items-start justify-start pl-[25%]">
      <div className=" flex flex-col ">
        <h3 className="my-5 ml-5 text-2xl text-[#616161]">Gender</h3>
        <CustomCheckBox
          id={id}
          isChecked={isCheckedMale}
          checkedState={checkedStateMale}
          text="Male"
        />
        <CustomCheckBox
          isChecked={isCheckedFemale}
          checkedState={checkedStateFemale}
          text="Female"
        />
        <CustomCheckBox
          isChecked={isCheckedOther}
          checkedState={checkedStateOther}
          text="Other"
        />
      </div>
    </div>
  )
}
export default SexCheckBox
