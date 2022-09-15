import React from 'react'
import CustomCheckBox from './CustomCheckBox'
const MartialStatus: React.FC<{
  isCheckedSingle: boolean
  checkedStateSingle: Function
  isCheckedMarried: boolean
  checkedStateMarried: Function
  isCheckedDivorced: boolean
  checkedStateDivorced: Function
  isCheckedWidowed: boolean
  checkedStateWidowed: Function
  isCheckedSeparated: boolean
  checkedStateSeparated: Function
  isCheckedWithPartner: boolean
  checkedStateWithPartner: Function
}> = ({
  isCheckedSingle,
  checkedStateSingle,
  isCheckedMarried,
  checkedStateMarried,
  isCheckedDivorced,
  checkedStateDivorced,
  isCheckedWidowed,
  checkedStateWidowed,
  isCheckedSeparated,
  checkedStateSeparated,
  isCheckedWithPartner,
  checkedStateWithPartner,
}) => {
  //make sure two boxes are not checked at the same time
  if (isCheckedSingle) {
    checkedStateMarried(false)
    checkedStateDivorced(false)
    checkedStateWidowed(false)
    checkedStateSeparated(false)
    checkedStateWithPartner(false)
  }
  if (isCheckedMarried) {
    checkedStateSingle(false)

    checkedStateDivorced(false)
    checkedStateWidowed(false)
    checkedStateSeparated(false)
    checkedStateWithPartner(false)
  }

  if (isCheckedDivorced) {
    checkedStateSingle(false)
    checkedStateMarried(false)

    checkedStateWidowed(false)
    checkedStateSeparated(false)
    checkedStateWithPartner(false)
  }
  if (isCheckedWidowed) {
    checkedStateSingle(false)
    checkedStateMarried(false)
    checkedStateDivorced(false)

    checkedStateSeparated(false)
    checkedStateWithPartner(false)
  }
  if (isCheckedSeparated) {
    checkedStateSingle(false)
    checkedStateMarried(false)
    checkedStateDivorced(false)
    checkedStateWidowed(false)

    checkedStateWithPartner(false)
  }
  if (isCheckedWithPartner) {
    checkedStateSingle(false)
    checkedStateMarried(false)
    checkedStateDivorced(false)
    checkedStateWidowed(false)
    checkedStateSeparated(false)
  }

  return (
    <div className=" flex items-start justify-start pl-[25%]">
      <div className=" flex flex-col ">
        <h3 className="my-5 ml-5 text-2xl text-[#616161]">Marital Status</h3>
        <CustomCheckBox
          isChecked={isCheckedSingle}
          checkedState={checkedStateSingle}
          text="Single"
        />
        <CustomCheckBox
          isChecked={isCheckedMarried}
          checkedState={checkedStateMarried}
          text="Married"
        />
        <CustomCheckBox
          isChecked={isCheckedDivorced}
          checkedState={checkedStateDivorced}
          text="Divorced"
        />
        <CustomCheckBox
          isChecked={isCheckedWidowed}
          checkedState={checkedStateWidowed}
          text="Widowed"
        />
        <CustomCheckBox
          isChecked={isCheckedSeparated}
          checkedState={checkedStateSeparated}
          text="Separated"
        />
        <CustomCheckBox
          isChecked={isCheckedWithPartner}
          checkedState={checkedStateWithPartner}
          text="With Partner"
        />
      </div>
    </div>
  )
}

export default MartialStatus
