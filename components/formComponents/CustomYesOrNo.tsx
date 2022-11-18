import React, { useState, useEffect } from 'react'
import CustomCheckBox from './CustomCheckBox'
const CustomYesOrNo: React.FC<{
  CheckState: Function
  marginLeft?: string
  text: string
  id?: string
}> = ({ text, CheckState, marginLeft, id }) => {
  const [yesLocal, setYesLocal] = useState(false)
  const [noLocal, setNoLocal] = useState(false)
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
    <div id={id} className={` flex   items-start justify-start  ${marginLeft}`}>
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
