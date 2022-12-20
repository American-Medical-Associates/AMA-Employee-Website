import React, { useState, useEffect } from 'react'
import CustomCheckBox from './CustomCheckBox'
const CustomYesOrNo: React.FC<{
  CheckState: Function
  marginLeft?: string
  text: string
  id?: string
  required?: boolean
  missing?: boolean
}> = ({ text, CheckState, marginLeft, id, required, missing }) => {
  const [yesLocal, setYesLocal] = useState(false)
  const [noLocal, setNoLocal] = useState(false)
  if (required) {
    if (yesLocal || noLocal) {
      missing = true
    } else {
      missing = false
    }
  }
  useEffect(() => {
    if (yesLocal) {
      setNoLocal(false)
      CheckState('Yes')
    }
    if (noLocal) {
      setYesLocal(false)
      CheckState('No')
    }
  }, [yesLocal, noLocal])

  return (
    <div
      id={id}
      className={` ${missing ? 'bg-[#ff1818]' : 'bg-[#c3969600]'} ${
        missing ? 'w-[50%]' : undefined
      }
      ${
        missing ? 'rounded-[20px]' : undefined
      } flex   items-start justify-start  ${marginLeft}`}
    >
      <div className=" flex flex-col ">
        <h3 className={`my-5 ml-5 text-[#616161] sm:text-sm md:text-2xl`}>
          {text}
        </h3>
        <CustomCheckBox
          isChecked={yesLocal}
          checkedState={setYesLocal}
          text="Yes"
        />
        <CustomCheckBox
          isChecked={noLocal}
          checkedState={setNoLocal}
          text="No"
        />
      </div>
    </div>
  )
}

export default CustomYesOrNo
