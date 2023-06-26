import React from 'react'

const CheckBox: React.FC<{
  disabled?: boolean
  isChecked: boolean
  checkedState: any
}> = ({ isChecked, checkedState, disabled }) => {
  return (
    <div className=" px-5">
      <input
        checked={isChecked}
        disabled={disabled}
        onChange={() => {
          checkedState(!isChecked)
        }}
        className=" h-5 w-5 checked:border-transparent checked:bg-[#0008ff]"
        type={'checkbox'}
      ></input>
    </div>
  )
}
export default CheckBox
